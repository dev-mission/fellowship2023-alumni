import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { DateTime } from 'luxon';

import Api from '../Api';
import { useStaticContext } from '../StaticContext';
import { useAuthContext } from '../AuthContext';

import Form from 'react-bootstrap/Form';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Badge from 'react-bootstrap/Badge';

function OpportunityList() {
  const navigate = useNavigate();
  const staticContext = useStaticContext();
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortBy, setSortBy] = useState('Recently Added');
  const { user } = useAuthContext();


  useEffect(() => {
    Api.posts.index().then((response) => setPosts(response.data));
  }, []);
  useEffect(() => {
    Api.tags.index().then((response) => setTags(response.data));
  }, []);


  const applyFilters = () => {
    return posts
      .filter(
        (post) =>
          (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (post.Organization && post.Organization.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (post.workLocation && post.workLocation.toLowerCase().includes(searchTerm.toLowerCase()))) &&
          selectedTags.every((tagId) => post.Tags.some((tag) => tag.id === tagId)),
      )
      .sort((a, b) => {
        switch (sortBy) {
          case 'Most Popular':
            return b.bookmarksCount - a.bookmarksCount;
          case 'Newest Activity':
            return DateTime.fromISO(b.updatedAt) - DateTime.fromISO(a.updatedAt);
          case 'Oldest Activity':
            return DateTime.fromISO(a.updatedAt) - DateTime.fromISO(b.updatedAt);
          case 'Recently Added':
          default:
            return DateTime.fromISO(b.createdAt) - DateTime.fromISO(a.createdAt);
        }
      });
  };

  const filteredPosts = applyFilters();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleTagSelection = (tagId) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((id) => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  const clearFilters = () => {
    setSelectedTags([]);
  };

  async function onDelete(event, postId) {
    event.stopPropagation();
    if (window.confirm(`Are you sure you wish to delete this post?`)) {
      const response = await Api.posts.delete(postId);
      if (response.status === 200) {
        const updatedPosts = posts.filter((post) => post.id !== postId);
        setPosts(updatedPosts);
        navigate('/opportunities', { state: { flash: 'Post deleted!' } });
      } else {
        window.alert('An unexpected error has occurred.');
      }
    }
  }

  const [showResponseModal, setShowResponseModal] = useState(false);
  const [surveyResponse, setSurveyResponse] = useState({
    isJob: false,
    isVolunteer: false,
    isOther: false,
    otherText: '',
  });
  const [error, setError] = useState(null);

  const handleResponseModalClose = () => {
    setShowResponseModal(false);
  };

  const handleResponseModalShow = () => {
    setShowResponseModal(true);
  };

  const handleResponseChange = (event) => {
    const { name, value, checked } = event.target;
    setSurveyResponse(prevState => ({
      ...prevState,
      [name]: name === 'isJob' || name === 'isVolunteer' || name === 'isOther' ? checked : value
    }));
  };

  const handleSubmitResponse = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      await Api.surveyResponses.create(surveyResponse);
      handleResponseModalClose();
    } catch (error) {
      setError(error);
    }
  };

  function onChange(event) {
    const newSurveyResponse = { ...surveyResponse };
    newSurveyResponse[event.target.name] = event.target.value;
    setSurveyResponse(newSurveyResponse);
  }


  return (
    <>
      <Helmet>
        <title>Opportunities - {staticContext?.env?.VITE_SITE_TITLE ?? ''}</title>
      </Helmet>

      

      {/* Modal for survey response */}
      <Modal show={showResponseModal} onHide={handleResponseModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Check-in</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmitResponse}>
            <div className="mb-3 form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="isJob"
                name="isJob"
                onChange={handleResponseChange}
                checked={surveyResponse.isJob}
                value={surveyResponse.isJob}
              />
              <label className="form-check-label" htmlFor="isJob">
                Looking for Job
              </label>
            </div>
            <div className="mb-3 form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="isVolunteer"
                name="isVolunteer"
                onChange={handleResponseChange}
                checked={surveyResponse.isVolunteer}
                value={surveyResponse.isVolunteer}
              />
              <label className="form-check-label" htmlFor="isVolunteer">
                Looking for Volunteering Opportunity
              </label>
            </div>
            <div className="mb-3 form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="isOther"
                name="isOther"
                onChange={handleResponseChange}
                checked={surveyResponse.isOther}
                value={surveyResponse.isOther}
              />
              <label className="form-check-label" htmlFor="isOther">
                Looking for Other Opportunities
              </label>
            </div>
            {surveyResponse.isOther && <><div className="mb-3">
              <label className="form-label" htmlFor="otherText">
                More information
              </label>
              <input
                type="text"
                className="form-control"
                id="otherText"
                name="otherText"
                onChange={onChange}
                value={surveyResponse.otherText}
              />
            </div></>}
            
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleResponseModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitResponse}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <Container>
        <Row className="mb-3">
          <Col>
            <h1>Opportunities</h1>
          </Col>
          <Col className="d-flex justify-content-end">
            {user.isAdmin && <Link to="new">
              <Button variant="outline-primary">New Opp</Button>
            </Link>}
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className="mb-3">
          <Col>
            <select className="form-select" onChange={handleSortChange} value={sortBy}>
              <option value="Recently Added">Recently Added</option>
              <option value="Most Popular">Most Popular</option>
              <option value="Newest Activity">Newest Activity</option>
              <option value="Oldest Activity">Oldest Activity</option>
            </select>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
          {/* Filter Modal Button */}
          <Button variant="outline-primary" onClick={toggleModal}>
                Add Filter
              </Button>
            <Container>
              
              {/* Filter Modal */}
              <Modal show={showModal} onHide={toggleModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Filter by Tags</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {tags.map((tag) => (
                    <Form.Check
                      key={tag.id}
                      type="checkbox"
                      label={tag.name}
                      checked={selectedTags.includes(tag.id)}
                      onChange={() => handleTagSelection(tag.id)}
                    />
                  ))}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={toggleModal}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={toggleModal}>
                    Apply Filters
                  </Button>
                </Modal.Footer>
              </Modal>
            </Container>
          </Col>
          <Col>
            <Form>
              <Form.Control type="text" placeholder="Search" value={searchTerm} onChange={handleSearchChange} />
            </Form>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className="mb-2">
          <Col xs={8}>
            <div className="d-flex flex-nowrap overflow-auto">
              {selectedTags.map((tagId) => {
                const tag = tags.find((tag) => tag.id === tagId);
                return (
                  <Badge key={tag.id} variant="primary" className="m-2">
                    {tag.name}
                  </Badge>
                );
              })}
            </div>
          </Col>
          <Col>
            <Button variant="link" onClick={clearFilters}>
              CLEAR FILTERS
            </Button>
          </Col>
        </Row>
      </Container>

      <Container>
        {filteredPosts.map((post) => (
          <div key={post.id} onClick={() => navigate(`${post.id}`)} className="card mb-3">
            <h5 className="card-header d-flex justify-content-between">
              <div>
                {user.isAdmin && <><button className="btn p-1">
                  <Link to={post.id + '/edit'} onClick={(event) => event.stopPropagation()}>
                    <i className="bi bi-pencil-square"></i>
                  </Link>
                </button>
                <button className="btn p-1" onClick={(event) => onDelete(event, post.id)}>
                  <i className="bi bi-trash"></i>
                </button></>}
                {post.OrganizationId && post.Organization.name}
              </div>
              <div>
                {post.Tags.map((tag) => (
                  <Badge key={tag.id} pill bg="primary">
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </h5>
            <div className="card-body">
              <h5 className="card-title">{post.title}</h5>
              <p className="card-text">{post.workLocation}</p>
              <p className="card-text">{'Posted ' + new DateTime(post.createdAt).diffNow('days').toFormat('d') + ' days ago'}</p>
              {post.bookmarksCount > 0 && <p className="card-text">{'Saved by ' + post.bookmarksCount + ' people'}</p>}
            </div>
          </div>
        ))}
        {/* Add a button to trigger the response modal */}
      <Button variant="primary" onClick={handleResponseModalShow}>
        Give Leo a check-in!
      </Button>
      </Container>
      
    </>
  );
}

export default OpportunityList;
