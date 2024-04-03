import { Route, Routes } from 'react-router-dom';
import HelpSurvey from './HelpSurvey';


function OpportunitiesRoutes() {
  return (
    <Routes>
      <Route path=":HelpSurveyId" element={<Opportunity />} />
    </Routes>
  );
}

export default OpportunitiesRoutes;