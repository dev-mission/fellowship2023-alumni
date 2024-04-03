import { Helmet } from 'react-helmet-async';

import { useStaticContext } from '../../StaticContext';

function AdminInviteCohort() {
  const staticContext = useStaticContext();
  return (
    <>
      <Helmet>
        <title>Invite to Cohort - {staticContext?.env?.VITE_SITE_TITLE ?? ''}</title>
      </Helmet>
      <main className="container">
        <h1>Invite to Cohort</h1>
      </main>
      ;
    </>
  );
}

export default AdminInviteCohort;
