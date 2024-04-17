import { Routes, Route } from 'react-router-dom';

import AdminSurveyResponse from './AdminSurveyResponse';
import AdminSurveyResponseForm from './AdminSurveyResponseForm';
import AdminSurveyResponsesList from './AdminSurveyResponsesList';

function AdminSurveyResponsesRoutes() {
  return (
    <Routes>
      <Route path=":surveyResponseId/edit" element={<AdminSurveyResponseForm />} />
      <Route path=":surveyResponseId" element={<AdminSurveyResponse />} />
      <Route path="new" element={<AdminSurveyResponseForm />} />
      <Route path="" element={<AdminSurveyResponsesList />} />
    </Routes>
  );
}

export default AdminSurveyResponsesRoutes;
