import { Routes, Route } from 'react-router-dom';

import AdminCohortsList from './AdminCohortsList';

function AdminCohortsRoutes() {
  return (
    <Routes>
      <Route path="" element={<AdminCohortsList />} />
    </Routes>
  );
}

export default AdminCohortsRoutes;
