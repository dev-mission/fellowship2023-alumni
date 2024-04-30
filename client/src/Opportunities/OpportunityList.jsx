import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { DateTime } from 'luxon';

import Api from '../Api';
import { useStaticContext } from '../StaticContext';

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

  return (
    <>
      <Helmet>
        <title>Opportunities - {staticContext?.env?.VITE_SITE_TITLE ?? ''}</title>
      </Helmet>

      <Container>
        <Row className="mb-3">
          <Col>
            <h1>Opportunities</h1>
          </Col>
          <Col className="d-flex justify-content-end">
            <Link to="new">
              <Button variant="outline-primary">New Opp</Button>
            </Link>
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
            <Container>
              {/* Filter Modal Button */}
              <Button variant="outline-primary" onClick={toggleModal}>
                Add Filter
              </Button>
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
                  <Badge key={tag.id} variant="primary" className="mr-2">
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
                <Link to={post.id + '/edit'} onClick={(event) => event.stopPropagation()}>
                  <i className="bi bi-pencil-square"></i>
                </Link>
                <button className="border-0" onClick={(event) => onDelete(event, post.id)}>
                  <i className="bi bi-trash"></i>
                </button>
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
      </Container>
    </>
  );
}

export default OpportunityList;
