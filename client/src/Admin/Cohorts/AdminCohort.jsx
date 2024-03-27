import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { DateTime } from 'luxon';

import Api from '../../Api';
import { useStaticContext } from '../../StaticContext';

function AdminCohortForm() {
  const staticContext = useStaticContext();
  const navigate = useNavigate();
  const { cohortId } = useParams();

  const [cohort, setCohort] = useState();

  useEffect(() => {
    if (cohortId) {
      Api.cohorts.get(cohortId).then((response) => setCohort(response.data));
    }
  }, [cohortId]);

  async function onDelete() {
    if (window.confirm(`Are you sure you wish to delete this cohort?`)) {
      const response = await Api.cohorts.delete(cohortId);
      if (response.status === 200) {
        navigate('/admin/cohorts', { state: { flash: 'Cohort deleted!' } });
      } else {
        window.alert('An unexpected error has occurred.');
      }
    }
  }

  return (
    <>
      <Helmet>
        <title>Cohort - {staticContext?.env?.VITE_SITE_TITLE ?? ''}</title>
      </Helmet>
      <main className="container">
        {cohort && (
          <>
            <h1>
              {cohort.affiliation} #{cohort.cohortNumber}
            </h1>
            <h2>
              {cohort.term} {cohort.year}
            </h2>
            <h3>Graduated: {DateTime.fromISO(cohort.graduatedOn).toLocaleString(DateTime.DATETIME_FULL)}</h3>
            <div className="mb-3">
              <Link className="btn btn-outline-primary me-2" to="edit">
                Edit Cohort
              </Link>
              <button className="btn btn-outline-danger" onClick={onDelete}>
                Delete Cohort
              </button>
            </div>
          </>
        )}
      </main>
    </>
  );
}

export default AdminCohortForm;
