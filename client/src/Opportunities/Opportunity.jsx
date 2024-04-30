import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useParams } from 'react-router-dom';

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
          </>
        )}
      </main>
    </>
  );
}

export default Opportunity;
