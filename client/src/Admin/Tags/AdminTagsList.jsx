import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Api from '../../Api';
import { useStaticContext } from '../../StaticContext';

function AdminTagsList() {
  const location = useLocation();
  const navigate = useNavigate();
  const staticContext = useStaticContext();
  const [tags, setTags] = useState([]);

  useEffect(() => {
    Api.tags.index().then((response) => setTags(response.data));
  }, []);

  return (
    <>
      <Helmet>
        <title>Manage Tags - {staticContext?.env?.VITE_SITE_TITLE ?? ''}</title>
      </Helmet>
      <main className="users container">
        <h1>Manage Tags</h1>
        {location.state?.flash && <div className="alert alert-success mb-3">{location.state?.flash}</div>}
        <div className="mb-3">
          <Link className="btn btn-outline-primary" to="new">
            New Tag
          </Link>
        </div>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th className="w-20">Name</th>
                <th className="w-20">Number of Posts</th>
              </tr>
            </thead>
            <tbody>
              {tags.map((tag) => (
                <tr key={tag.id} onClick={() => navigate(`${tag.id}`)}>
                  <td>{tag.name}</td>
                  <td>WIP</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
export default AdminTagsList;
