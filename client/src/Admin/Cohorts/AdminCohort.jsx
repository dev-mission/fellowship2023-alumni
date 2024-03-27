import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';

import Api from '../../Api';
import { useStaticContext } from '../../StaticContext';
import { DateTime } from 'luxon';

function AdminCohortForm() {
  const staticContext = useStaticContext();
  const { cohortId } = useParams();

  const [cohort, setCohort] = useState();

  useEffect(() => {
    if (cohortId) {
      Api.cohorts.get(cohortId).then((response) => setCohort(response.data));
    }
  }, [cohortId]);

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
              <Link className="btn btn-outline-primary" to="edit">
                Edit Cohort
              </Link>
            </div>
          </>
        )}
      </main>
    </>
  );
}

export default AdminCohortForm;
