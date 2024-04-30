import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { StatusCodes } from 'http-status-codes';

import Api from '../../Api';
import { useStaticContext } from '../../StaticContext';

import UnexpectedError from '../../UnexpectedError';
import ValidationError from '../../ValidationError';

function AdminOrganizationForm() {
  const staticContext = useStaticContext();
  const navigate = useNavigate();
  const params = useParams();
  const organizationId = params.organizationId;

  const [organization, setOrganization] = useState({
    name: 'Dev/Mission',
    location: 'San Francisco, CA',
    description: '',
    url: 'https://devmission.org/',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (organizationId) {
      Api.organizations.get(organizationId).then((response) => {
        setOrganization(response.data);
      });
    }
  }, [organizationId]);

  function onChange(event) {
    const newOrganization = { ...organization };
    newOrganization[event.target.name] = event.target.value;
    setOrganization(newOrganization);
  }

  async function onSubmit(event) {
    event.preventDefault();
    setError(null);
    try {
      if (organizationId) {
        await Api.organizations.update(organizationId, organization);
        navigate(`/admin/organizations/${organizationId}`);
      } else {
        const response = await Api.organizations.create(organization);
        const { id } = response.data;
        navigate(`/admin/organizations/${id}`);
      }
    } catch (error) {
      if (error.response?.status === StatusCodes.UNPROCESSABLE_ENTITY) {
        setError(new ValidationError(error.response.data));
      } else {
        setError(new UnexpectedError());
      }
    }
  }

  return (
    <>
      <Helmet>
        <title>Organization - {staticContext?.env?.VITE_SITE_TITLE ?? ''}</title>
      </Helmet>
      <main className="container">
        <div className="row justify-content-center">
          <div className="col col-sm-10 col-md-8 col-lg-6 col-xl-4">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">Organization</h2>
                <form onSubmit={onSubmit}>
                  {error && error.message && <div className="alert alert-danger">{error.message}</div>}
                  <div className="mb-3">
                    <label className="form-label" htmlFor="name">
                      Name
                    </label>
                    <input
                      type="text"
                      className={classNames('form-control', { 'is-invalid': error?.errorsFor?.('name') })}
                      id="name"
                      name="name"
                      onChange={onChange}
                      value={organization.name}
                    />
                    {error?.errorMessagesHTMLFor?.('name')}
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="description">
                      Description
                    </label>
                    <input
                      type="text"
                      className={classNames('form-control', { 'is-invalid': error?.errorsFor?.('description') })}
                      id="description"
                      name="description"
                      onChange={onChange}
                      value={organization.description}
                    />
                    {error?.errorMessagesHTMLFor?.('description')}
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="location">
                      Location
                    </label>
                    <input
                      type="text"
                      className={classNames('form-control', { 'is-invalid': error?.errorsFor?.('location') })}
                      id="location"
                      name="location"
                      onChange={onChange}
                      value={organization.location}
                    />
                    {error?.errorMessagesHTMLFor?.('location')}
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="url">
                      Affiliation
                    </label>
                    <input
                      type="text"
                      className={classNames('form-control', { 'is-invalid': error?.errorsFor?.('url') })}
                      id="url"
                      name="url"
                      onChange={onChange}
                      value={organization.url}
                    />
                    {error?.errorMessagesHTMLFor?.('url')}
                  </div>
                  <div className="mb-3 d-grid">
                    <button className="btn btn-primary" type="submit">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default AdminOrganizationForm;
