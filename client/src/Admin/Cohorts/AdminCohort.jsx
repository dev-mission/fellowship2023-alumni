import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { DateTime } from 'luxon';

import Api from '../../Api';
import Confirm from '../../Components/Confirm';
import { useStaticContext } from '../../StaticContext';

function AdminCohortForm() {
  const staticContext = useStaticContext();
  const navigate = useNavigate();
  const { cohortId } = useParams();

  const [cohort, setCohort] = useState();
  const [invites, setInvites] = useState();
  const [users, setUsers] = useState();

  const [selectedInvite, setSelectedInvite] = useState();
  const [showConfirmResend, setShowConfirmResend] = useState(false);
  const [showConfirmRevoke, setShowConfirmRevoke] = useState(false);

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

  function onConfirmResend(invite) {
    setSelectedInvite(invite);
    setShowConfirmResend(true);
  }

  async function onResend() {
    const response = await Api.invites.resend(selectedInvite.id);
    if (response.status === 200) {
      selectedInvite.updatedAt = response.data.updatedAt;
      setInvites([...invites]);
    }
    setShowConfirmResend(false);
  }

  function onConfirmRevoke(invite) {
    setSelectedInvite(invite);
    setShowConfirmRevoke(true);
  }

  async function onRevoke() {
    const response = await Api.invites.revoke(selectedInvite.id);
    if (response.status === 200) {
      setInvites(invites.filter((i) => i.id !== selectedInvite.id));
    }
    setShowConfirmRevoke(false);
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
                    <td>{DateTime.fromISO(i.updatedAt).toLocaleString(DateTime.DATETIME_SHORT)}</td>
                    <td>
                      <button className="btn btn-link p-0 border-0" onClick={() => onConfirmResend(i)}>
                        Resend
                      </button>{' '}
                      |{' '}
                      <button className="btn btn-link p-0 border-0" onClick={() => onConfirmRevoke(i)}>
                        Revoke
                      </button>
                    </td>
                  </tr>
                ))}
                {invites?.length === 0 && (
                  <tr>
                    <td colSpan={5}>No invites sent.</td>
                  </tr>
                )}
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
        <Confirm
          isShowing={showConfirmResend}
          title="Are you sure?"
          primaryLabel="Yes"
          cancelLabel="No"
          onConfirm={() => onResend()}
          onHide={() => setShowConfirmResend(false)}>
          Are you sure you want to resend the invitation to{' '}
          <b>
            {selectedInvite?.firstName} {selectedInvite?.lastName} &lt;{selectedInvite?.email}&gt;
          </b>
          ?
        </Confirm>
        <Confirm
          isShowing={showConfirmRevoke}
          title="Are you sure?"
          dangerLabel="Yes"
          cancelLabel="No"
          onConfirm={() => onRevoke()}
          onHide={() => setShowConfirmRevoke(false)}>
          Are you sure you want to revoke the invitation to{' '}
          <b>
            {selectedInvite?.firstName} {selectedInvite?.lastName} &lt;{selectedInvite?.email}&gt;
          </b>
          ?
        </Confirm>
      </main>
    </>
  );
}

export default AdminCohortForm;
