import Button from 'react-bootstrap/Button';
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

import Badge from 'react-bootstrap/Badge';

function OpportunityList() {
  const navigate = useNavigate();
  const staticContext = useStaticContext();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    Api.posts.index().then((response) => setPosts(response.data));
  }, []);

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
      <div className="posts container">
        <Container>
          <div className="row">
            <div className="col-md-6">
              <h1>Opportunities</h1>
            </div>
            <div className="col-md-6 col-md-offset-4">
              <Link to="new">
                <Button className="col-md-12" variant="outline-primary">
                  New Opp
                </Button>
              </Link>
            </div>
          </div>
        </Container>
        <Container>
          <div className="row">
            <div className="d-flex">
              <Form.Select aria-label="Default select example">
                <option>Recently Added</option>
                <option value="1">Most popular</option>
                <option value="2">Newest</option>
                <option value="3">Oldest</option>
              </Form.Select>
            </div>
          </div>
        </Container>
        <Container>
          <Row>
            <Col>
              <Button variant="outline-primary">Add Filter</Button>
            </Col>
            <Col>
              <Form.Control type="text" placeholder="Search" />
            </Col>
          </Row>
        </Container>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-3 offset-9">
              <h6>CLEAR FILTERS</h6>
            </div>
          </div>
        </div>
        <Container>
          {posts.map((post) => (
            <div key={post.id} onClick={() => navigate(`${post.id}`)} className="card mb-3">
              <h5 className="card-header d-flex justify-content-between">
                <div>
                  <Link to="edit">
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
                <p className="card-text">{post.location}</p>
                <p className="card-text">{new DateTime(post.createdAt).diffNow('days').toFormat('d') + ' days ago'}</p>
              </div>
            </div>
          ))}
        </Container>
      </div>
    </>
  );
}

export default OpportunityList;
