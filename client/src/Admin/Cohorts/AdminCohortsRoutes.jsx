import { Routes, Route } from 'react-router-dom';

import AdminCohort from './AdminCohort';
import AdminCohortForm from './AdminCohortForm';
import AdminCohortsList from './AdminCohortsList';

function AdminCohortsRoutes() {
  return (
    <Routes>
      <Route path=":cohortId/edit" element={<AdminCohortForm />} />
      <Route path=":cohortId" element={<AdminCohort />} />
      <Route path="new" element={<AdminCohortForm />} />
      <Route path="" element={<AdminCohortsList />} />
    </Routes>
  );
}

export default AdminCohortsRoutes;
