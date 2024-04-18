import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Api from '../../Api';
import { useStaticContext } from '../../StaticContext';

function AdminOrganization() {
  const staticContext = useStaticContext();
  const navigate = useNavigate();
  const { organizationId } = useParams();

  const [organization, setOrganization] = useState();

  useEffect(() => {
    if (organizationId) {
      Api.organizations.get(organizationId).then((response) => setOrganization(response.data));
    }
  }, [organizationId]);

  async function onDelete() {
    if (window.confirm(`Are you sure you wish to delete this organization?`)) {
      const response = await Api.organizations.delete(organizationId);
      if (response.status === 200) {
        navigate('/admin/organizations', { state: { flash: 'Organization deleted!' } });
      } else {
        window.alert('An unexpected error has occurred.');
      }
    }
  }

  return (
    <>
      <Helmet>
        <title>Organization - {staticContext?.env?.VITE_SITE_TITLE ?? ''}</title>
      </Helmet>
      <main className="container">
        {organization && (
          <>
            <h1>
              {organization.name} in {organization.location}
            </h1>
            <h2>
              {organization.description} {organization.url}
            </h2>

            <div className="mb-3">
              <Link className="btn btn-outline-primary me-2" to="edit">
                Edit Organization
              </Link>
              <button className="btn btn-outline-danger" onClick={onDelete}>
                Delete Organization
              </button>
            </div>
          </>
        )}
      </main>
    </>
  );
}

export default AdminOrganization;
