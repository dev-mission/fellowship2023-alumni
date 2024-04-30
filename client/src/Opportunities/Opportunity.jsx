import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import Api from '../Api';
import { useStaticContext } from '../StaticContext';

function Opportunity() {
  const staticContext = useStaticContext();
  const navigate = useNavigate();
  const { postId } = useParams();

  const [post, setPost] = useState();

  useEffect(() => {
    if (postId) {
      Api.posts.get(postId).then((response) => setPost(response.data));
    }
  }, [postId]);

  async function onDelete() {
    if (window.confirm(`Are you sure you wish to delete this Post?`)) {
      const response = await Api.posts.delete(postId);
      if (response.status === 200) {
        navigate('/opportunities', { state: { flash: 'Post deleted!' } });
      } else {
        window.alert('An unexpected error has occurred.');
      }
    }
  }

  return (
    <>
      <Helmet>
        <title>Opportunity - {staticContext?.env?.VITE_SITE_TITLE ?? ''}</title>
      </Helmet>

      <main className="container">
        {post && (
          <>
            <h1>Heading</h1>
            <div className="mb-3">
              <Link className="btn btn-outline-primary me-2" to="edit">
                Edit Post
              </Link>
              <button className="btn btn-outline-danger" onClick={onDelete}>
                Delete Post
              </button>
            </div>
            <Container>
              <h1>Software Engineer</h1>
              <h3>Uber</h3>
              <p className="mb-0">San Francisco, CA</p>
              <p className="mb-0">Posted 6 days ago</p>
              <br></br>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-link-45deg"
                viewBox="0 0 16 16">
                <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z" />
                <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z" />
              </svg>
              <a href="url">Link to Original Posting</a>
              <br></br>
              <br></br>
              <div className="d-flex flex-row align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-bookmark"
                  viewBox="0 0 16 16">
                  <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
                </svg>
                <div className="d-flex flex-column ms-2">
                  <p className="mb-0">Save this opportunity</p>
                  <p className="mb-0">4 other people have saved this already!</p>
                </div>
              </div>
              <p className="text-body-secondary">
                By saving the opportunity, you&apos;re letting us know that you would like to see more opportunities like this.
              </p>
              <h2>Notes:</h2>
              <p>
                Previous alums Jerry and Cheryl ahve been successful landing a role like this at this comapnies. They have some of the
                following experience:
              </p>
              <h2>Job Description</h2>
              <p>
                We are looking for a passionate Software Engineer to design, develop, and install software solutions. Software Engineer
                responsibilities include gathering user requirements, defining system functionality and writing code in various languages,
                like Java, Ruby on Rails or .NET programming languages (e.g. C++ or JScript.NET.) Our ideal candidates are fmailiar with the
                software development life cycle (SDLC) from preliminary system analysis to tests and deployment. Ultimlately, the role of
                the Software Engineer is to build high quality, innovative and fully performing software that complies with coding standards
                and technical design.
              </p>
              <h2>Responsibilities</h2>
              <ul>
                <li>Execute full software development life cycle (SDLC)</li>
                <li>Develop flowcharts, layouts, and documentation to identify requirements and</li>
              </ul>
            </Container>
          </>
        )}
      </main>
    </>
  );
}

export default Opportunity;
