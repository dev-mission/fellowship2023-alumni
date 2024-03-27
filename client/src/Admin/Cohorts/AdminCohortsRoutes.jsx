import { Routes, Route } from 'react-router-dom';

import AdminCohortForm from './AdminCohortForm';
import AdminCohortsList from './AdminCohortsList';

function AdminCohortsRoutes() {
  return (
    <Routes>
      <Route path="new" element={<AdminCohortForm />} />
      <Route path="" element={<AdminCohortsList />} />
    </Routes>
  );
}

export default AdminCohortsRoutes;
