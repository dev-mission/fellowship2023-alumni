import { Navigate, Routes, Route } from 'react-router-dom';

import AdminCohortsRoutes from './Cohorts/AdminCohortsRoutes';
import AdminUsersRoutes from './Users/AdminUsersRoutes';
import AdminSurveyResponsesRoutes from './SurveyResponses/AdminSurveyResponsesRoutes';
import AdminTagsRoutes from './Tags/AdminTagsRoutes';
import AdminOrganizationsRoutes from './Organizations/AdminOrganizationsRoutes';
import AdminProgramsRoutes from './Programs/AdminProgramsRoutes';

function AdminRoutes() {
  return (
    <Routes>
      <Route path="surveyResponses/*" element={<AdminSurveyResponsesRoutes />} />
      <Route path="tags/*" element={<AdminTagsRoutes />} />
      <Route path="organizations/*" element={<AdminOrganizationsRoutes />} />
      <Route path="programs/*" element={<AdminProgramsRoutes />} />
      <Route path="cohorts/*" element={<AdminCohortsRoutes />} />
      <Route path="users/*" element={<AdminUsersRoutes />} />
      <Route path="" element={<Navigate to="users" />} />
    </Routes>
  );
}

export default AdminRoutes;
