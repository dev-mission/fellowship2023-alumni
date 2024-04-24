import { Navigate, Routes, Route } from 'react-router-dom';

import AdminCohortsRoutes from './Cohorts/AdminCohortsRoutes';
import AdminUsersRoutes from './Users/AdminUsersRoutes';
import AdminProgramsRoutes from './Programs/AdminProgramsRoutes';

function AdminRoutes() {
  return (
    <Routes>
      <Route path="programs/*" element={<AdminProgramsRoutes />} />
      <Route path="cohorts/*" element={<AdminCohortsRoutes />} />
      <Route path="users/*" element={<AdminUsersRoutes />} />
      <Route path="" element={<Navigate to="users" />} />
    </Routes>
  );
}

export default AdminRoutes;
