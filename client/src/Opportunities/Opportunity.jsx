import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { DateTime } from 'luxon';

import Api from '../Api';
import { useStaticContext } from '../StaticContext';
import { useAuthContext } from '../AuthContext';

function Opportunity() {
  const staticContext = useStaticContext();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: 'Job Title',
    workLocation: 'San Francisco, CA',
    description: 'Description',
    applicationUrl: 'https://devmission.org/',
    OrganizationId: 2,
    Organization: { name: 'Organization Name' },
    notes: '',
    responsibilities: '',
    tagIds: [],
    userIds: [],
    createdAt: new Date('2033-01-01T00:00:00.000Z'),
    isBookmarked: false,
  });

  const { postId } = useParams();
  const { user } = useAuthContext();

  useEffect(() => {
    if (postId) {
      Api.posts.get(postId).then(async (response) => {
        const tagIds = await Promise.all(response.data.Tags.map(async (tag) => tag.id));
        const isBookmarked = response.data.userIds?.includes(user.id);
        console.log(isBookmarked);
        setPost({ ...response.data, tagIds: tagIds, isBookmarked: isBookmarked });
      });
    }
  }, [postId, user.id]);

  async function onChangeCheckBox(event) {
    const isChecked = event.target.checked;
    console.log(isChecked);
    console.log(post);
    const response = await Api.posts.update(postId, { isBookmarked: isChecked });
    if (response.status === 200) {
      console.log(response);
      post.userIds.push(user.id);
      setPost((post) => ({ ...post, isBookmarked: isChecked }));
    } else {
      console.error('Failed to update isBookmarked status.');
    }
  }

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
            <Container>
              <h1>{post.title}</h1>
              <h3>{post.Organization.name}</h3>
              <p className="mb-0">{post.workLocation}</p>
              <p className="mb-0">{'Posted ' + new DateTime(post.createdAt).diffNow('days').toFormat('d') + ' days ago'}</p>
              <br></br>
              {user.isAdmin && (
                <>
                  <div className="mb-3">
                    <Link className="btn btn-outline-primary me-2" to="edit">
                      Edit Post
                    </Link>
                    <button className="btn btn-outline-danger" onClick={onDelete}>
                      Delete Post
                    </button>
                  </div>
                </>
              )}

              <div className="d-flex flex-row align-items-center">
                <div className="m-1">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={user.id}
                    name="isBookmarked"
                    value={user.id}
                    onChange={onChangeCheckBox}
                    checked={post.isBookmarked}
                  />
                </div>
                <i className="bi bi-bookmark" style={{ fontSize: '2rem' }}></i>
                <div className="d-flex flex-column ms-2">
                  <p className="mb-0">Save this opportunity</p>
                  <p className="mb-0">{post.usersCount > 0 && post.usersCount + ' other people have saved this already!'}</p>
                </div>
              </div>
              <p className="text-body-secondary">
                By saving the opportunity, you&apos;re letting us know that you would like to see more opportunities like this.
              </p>
              {post.description && (
                <>
                  <h2>Job Description</h2>
                  <p>{post.description}</p>
                </>
              )}
              {post.responsibilities && (
                <>
                  <h2>Responsibilities</h2>
                  <p>{post.responsibilities}</p>
                </>
              )}
              {post.notes && (
                <>
                  <h2>Notes:</h2>
                  <p>{post.notes}</p>
                </>
              )}
              <h2>Apply Here/More Info</h2>
              <a className="btn btn-primary" href={post.applicationUrl} style={{ fontSize: '1.1rem' }}>
                <i className="bi bi-link-45deg p-1" style={{ fontSize: '1.1rem' }}></i>Link to Original Posting
              </a>
            </Container>
          </>
        )}
      </main>
    </>
  );
}

export default Opportunity;
