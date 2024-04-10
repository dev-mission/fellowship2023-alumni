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
  const [invites, setInvites] = useState();
  const [users, setUsers] = useState();

  useEffect(() => {
    if (cohortId) {
      Api.cohorts.get(cohortId).then((response) => setCohort(response.data));
      Api.cohorts.getInvites(cohortId).then((response) => setInvites(response.data));
      Api.cohorts.getUsers(cohortId).then((response) => setUsers(response.data));
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
            <h2>Invites</h2>
            <div className="mb-3">
              <Link className="btn btn-outline-primary me-2" to="invite">
                Invite
              </Link>
            </div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th className="w-20">First name</th>
                  <th className="w-20">Last name</th>
                  <th className="w-20">Email</th>
                  <th className="w-20">Invited</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {invites?.map((i) => (
                  <tr key={i.id}>
                    <td>{i.firstName}</td>
                    <td>{i.lastName}</td>
                    <td>{i.email}</td>
                    <td>{DateTime.fromISO(i.createdAt).toLocaleString(DateTime.DATETIME_SHORT)}</td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h2>Users</h2>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th className="w-20">First name</th>
                  <th className="w-20">Last name</th>
                  <th className="w-20">Email</th>
                  <th className="w-20">Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((u) => (
                  <tr key={u.id}>
                    <td>{u.firstName}</td>
                    <td>{u.lastName}</td>
                    <td>{u.email}</td>
                    <td>{DateTime.fromISO(u.createdAt).toLocaleString(DateTime.DATETIME_SHORT)}</td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </main>
    </>
  );
}

export default AdminCohortForm;
