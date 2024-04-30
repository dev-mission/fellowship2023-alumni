import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { DateTime } from 'luxon';

import Api from '../Api';
import { useStaticContext } from '../StaticContext';

function Opportunity() {
  const staticContext = useStaticContext();
  const navigate = useNavigate();
  const { postId } = useParams();

  const [post, setPost] = useState();
  // const [users, setUsers] = useState([]);

  useEffect(() => {
    if (postId) {
      Api.posts.get(postId).then(async (response) => {
        const tagIds = await Promise.all(response.data.Tags.map(async (tag) => tag.id));
        setPost({ ...response.data, tagIds: tagIds });
      });
    }
  }, [postId]);

  // function onChangeCheckBox(event) {
  //   const userId = parseInt(event.target.value);
  //   const isChecked = event.target.checked;

  //   let updatedUserIds;

  //   if (isChecked) {
  //     // If the checkbox is checked, add the tag ID to the array
  //     updatedUserIds = [...post.userIds, userId];
  //   } else {
  //     // If the checkbox is unchecked, remove the tag ID from the array
  //     updatedUserIds = post.userIds.filter((id) => id !== userId);
  //   }

  //   // Update the post object with the updated tagIds array
  //   setPost({ ...post, userIds: updatedUserIds });
  // }

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
              <div className="mb-3">
                <Link className="btn btn-outline-primary me-2" to="edit">
                  Edit Post
                </Link>
                <button className="btn btn-outline-danger" onClick={onDelete}>
                  Delete Post
                </button>
              </div>

              <br></br>
              <br></br>
              <div className="d-flex flex-row align-items-center">
                <i className="bi bi-bookmark" style={{ fontSize: '2rem' }}></i>
                {/* <div className="mb-3 form-group form-check">
                        <input
                          type="checkbox"
                          className= "form-check-input"
                          id="bookmark"
                          name="bookmark"
                          onChange={onChangeCheckBox}
                          value={tag.id}
                          checked={post.Users?.includes(user.id)}
                        />
                        <label className="form-check-label" htmlFor="isJob">
                          {tag.name}
                        </label>
                        {error?.errorMessagesHTMLFor?.(tag.name)}
                      </div> */}
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
