import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import classNames from 'classnames';

import Api from '../../Api';
import { useStaticContext } from '../../StaticContext';
import UnexpectedError from '../../UnexpectedError';

function AdminInviteCohort() {
  const staticContext = useStaticContext();
  const navigate = useNavigate();
  const { cohortId: CohortId } = useParams();
  const [data, setData] = useState({
    recipients: '',
    message: '',
    CohortId,
  });
  const [error, setError] = useState();
  const [isLoading, setLoading] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await Api.invites.createBulk(data);
      navigate(`/admin/cohorts/${CohortId}`, { flash: `${response.data.length} invites sent!` });
    } catch (error) {
      setLoading(false);
      setError(new UnexpectedError());
    }
  }

  function onChange(event) {
    const newData = { ...data };
    newData[event.target.name] = event.target.value;
    setData(newData);
  }

  return (
    <>
      <Helmet>
        <title>Invite to Cohort - {staticContext?.env?.VITE_SITE_TITLE ?? ''}</title>
      </Helmet>
      <main className="container">
        <div className="row justify-content-center">
          <div className="col col-sm-10 col-md-10 col-lg-8 col-xl-6">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">Invite to Cohort</h2>
                <form onSubmit={onSubmit}>
                  {error && error.message && <div className="alert alert-danger">{error.message}</div>}
                  <fieldset disabled={isLoading}>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="recipients">
                        Recipients
                      </label>
                      <textarea
                        className={classNames('form-control', { 'is-invalid': error?.errorsFor?.('recipients') })}
                        id="recipients"
                        name="recipients"
                        onChange={onChange}
                        value={data.recipients ?? ''}
                      />
                      {error?.errorMessagesHTMLFor?.('recipients')}
                      <div className="form-text">One per per line, or comma separated</div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="message">
                        Message
                      </label>
                      <textarea
                        className={classNames('form-control', { 'is-invalid': error?.errorsFor?.('message') })}
                        id="message"
                        name="message"
                        onChange={onChange}
                        value={data.message ?? ''}
                      />
                      {error?.errorMessagesHTMLFor?.('message')}
                    </div>
                    <div className="mb-3 d-grid">
                      <button className="btn btn-primary" type="submit">
                        Submit
                      </button>
                    </div>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default AdminInviteCohort;
