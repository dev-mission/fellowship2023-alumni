import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Api from '../../Api';
import { useStaticContext } from '../../StaticContext';

function AdminTag() {
  const staticContext = useStaticContext();
  const navigate = useNavigate();
  const { tagId } = useParams();

  const [tag, setTag] = useState();

  useEffect(() => {
    if (tagId) {
      Api.tags.get(tagId).then((response) => setTag(response.data));
    }
  }, [tagId]);

  async function onDelete() {
    if (window.confirm(`Are you sure you wish to delete this tag?`)) {
      const response = await Api.tags.delete(tagId);
      if (response.status === 200) {
        navigate('/admin/tags', { state: { flash: 'Tag deleted!' } });
      } else {
        window.alert('An unexpected error has occurred.');
      }
    }
  }

  return (
    <>
      <Helmet>
        <title>Tag - {staticContext?.env?.VITE_SITE_TITLE ?? ''}</title>
      </Helmet>
      <main className="container">
        {tag && (
          <>
            <h1>{tag.name}</h1>
            <div className="mb-3">
              <Link className="btn btn-outline-primary me-2" to="edit">
                Edit Tag
              </Link>
              <button className="btn btn-outline-danger" onClick={onDelete}>
                Delete Tag
              </button>
            </div>
          </>
        )}
      </main>
    </>
  );
}

export default AdminTag;
