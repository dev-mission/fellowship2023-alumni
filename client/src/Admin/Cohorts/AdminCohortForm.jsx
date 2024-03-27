import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { StatusCodes } from 'http-status-codes';

import Api from '../../Api';
import { useStaticContext } from '../../StaticContext';

import UnexpectedError from '../../UnexpectedError';
import ValidationError from '../../ValidationError';

function AdminCohortForm() {
  const staticContext = useStaticContext();
  const navigate = useNavigate();
  const params = useParams();
  const cohortId = params.cohortId;

  const [cohort, setCohort] = useState({
    cohortNumber: '',
    year: '',
    term: 'Spring',
    affiliation: 'Dev/Mission',
    graduatedOn: '',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cohortId) {
      Api.cohorts.get(cohortId).then((response) => setCohort(response.data));
    }
  }, [cohortId]);

  function onChange(event) {
    const newCohort = { ...cohort };
    newCohort[event.target.name] = event.target.value;
    setCohort(newCohort);
  }

  async function onSubmit(event) {
    event.preventDefault();
    setError(null);
    try {
      if (cohortId) {
        await Api.cohorts.update(cohortId, cohort);
        navigate(`/admin/cohorts/${cohortId}`);
      } else {
        const response = await Api.cohorts.create(cohort);
        const json = await response.json();
        const { id } = json;
        navigate(`/admin/cohorts/${id}`);
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
        <title>Cohort - {staticContext?.env?.VITE_SITE_TITLE ?? ''}</title>
      </Helmet>
      <main className="container">
        <div className="row justify-content-center">
          <div className="col col-sm-10 col-md-8 col-lg-6 col-xl-4">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">Cohort</h2>
                <form onSubmit={onSubmit}>
                  {error && error.message && <div className="alert alert-danger">{error.message}</div>}
                  <div className="mb-3">
                    <label className="form-label" htmlFor="cohortNumber">
                      Number
                    </label>
                    <input
                      type="number"
                      className={classNames('form-control', { 'is-invalid': error?.errorsFor?.('cohortNumber') })}
                      id="cohortNumber"
                      name="cohortNumber"
                      onChange={onChange}
                      value={cohort.cohortNumber}
                    />
                    {error?.errorMessagesHTMLFor?.('cohortNumber')}
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="year">
                      Year
                    </label>
                    <input
                      type="text"
                      className={classNames('form-control', { 'is-invalid': error?.errorsFor?.('year') })}
                      id="year"
                      name="year"
                      onChange={onChange}
                      value={cohort.year}
                    />
                    {error?.errorMessagesHTMLFor?.('year')}
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="term">
                      Term
                    </label>
                    <select id="term" name="term" className="form-select" value={cohort.term} onChange={onChange}>
                      <option value="Spring">Spring</option>
                      <option value="Summer">Summer</option>
                      <option value="Winter">Winter</option>
                    </select>
                    {error?.errorMessagesHTMLFor?.('term')}
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="affiliation">
                      Affiliation
                    </label>
                    <select id="affiliation" name="affiliation" className="form-select" value={cohort.affiliation} onChange={onChange}>
                      <option value="Dev/Mission">Dev/Mission</option>
                      <option value="Goodwill">Goodwill</option>
                    </select>
                    {error?.errorMessagesHTMLFor?.('affiliation')}
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="graduatedOn">
                      Graduated
                    </label>
                    <input
                      type="datetime-local"
                      className={classNames('form-control', { 'is-invalid': error?.errorsFor?.('graduatedOn') })}
                      id="graduatedOn"
                      name="graduatedOn"
                      onChange={onChange}
                      value={cohort.graduatedOn}
                    />
                    {error?.errorMessagesHTMLFor?.('graduatedOn')}
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

export default AdminCohortForm;
