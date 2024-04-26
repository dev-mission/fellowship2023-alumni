import { Route, Routes } from 'react-router-dom';
import HelpSurvey from './HelpSurvey';

function OpportunitiesRoutes() {
  return (
    <Routes>
      <Route path=":HelpSurveyId" element={<HelpSurvey />} />
    </Routes>
  );
}

export default OpportunitiesRoutes;
