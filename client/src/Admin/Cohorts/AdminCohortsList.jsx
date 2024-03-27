import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Api from '../../Api';
import { useStaticContext } from '../../StaticContext';

function AdminCohortsList() {
  const staticContext = useStaticContext();
  const [cohorts, setCohorts] = useState([]);

  useEffect(() => {
    Api.cohorts.index().then((response) => setCohorts(response.data));
  }, []);

  return (
    <>
      <Helmet>
        <title>Manage Cohorts - {staticContext?.env?.VITE_SITE_TITLE ?? ''}</title>
      </Helmet>
      <main className="users container">
        <h1>Manage Cohorts</h1>
        <div className="mb-3">
          <Link className="btn btn-outline-primary" to="new">
            New Cohort
          </Link>
        </div>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th className="w-20">Number</th>
                <th className="w-20">Affiliation</th>
                <th className="w-20">Year</th>
                <th className="w-20">Term</th>
                <th className="w-20">Graduated</th>
              </tr>
            </thead>
            <tbody>
              {cohorts.map((cohort) => (
                <tr key={cohort.id}>
                  <td>{cohort.cohortNumber}</td>
                  <td>{cohort.affiliation}</td>
                  <td>{cohort.year}</td>
                  <td>{cohort.term}</td>
                  <td>{cohort.graduated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
export default AdminCohortsList;
