import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { DateTime } from 'luxon';

import Api from '../../Api';
import { useStaticContext } from '../../StaticContext';

function AdminOrganizationsList() {
  const location = useLocation();
  const navigate = useNavigate();
  const staticContext = useStaticContext();
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    Api.organizations.index().then((response) => setOrganizations(response.data));
  }, []);

  return (
    <>
      <Helmet>
        <title>Manage Organizations - {staticContext?.env?.VITE_SITE_TITLE ?? ''}</title>
      </Helmet>
      <main className="users container">
        <h1>Manage Organizations</h1>
        {location.state?.flash && <div className="alert alert-success mb-3">{location.state?.flash}</div>}
        <div className="mb-3">
          <Link className="btn btn-outline-primary" to="new">
            New Organization
          </Link>
        </div>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th className="w-20">Name</th>
                <th className="w-20">Description</th>
                <th className="w-20">Location</th>
                <th className="w-20">URL</th>
                <th className="w-20">Number of Posts</th>
                <th className="w-20">Number of Programs</th>
              </tr>
            </thead>
            <tbody>
              {organizations.map((organization) => (
                <tr key={organization.id} onClick={() => navigate(`${organization.id}`)}>
                  <td>{organization.name}</td>
                  <td>{organization.description}</td>
                  <td>{organization.location}</td>
                  <td>{organization.url}</td>
                  <td>{organization.postsCount}</td>
                  <td>{organization.programsCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
export default AdminOrganizationsList;
