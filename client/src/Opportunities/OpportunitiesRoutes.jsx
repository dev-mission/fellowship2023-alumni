import { Route, Routes } from 'react-router-dom';
import Opportunity from './Opportunity';
import OpportunityList from './OpportunityList';

function OpportunitiesRoutes() {
  return (
    <Routes>
      <Route path=":opportunityId" element={<Opportunity />} />
      <Route path="" element={<OpportunityList />} />
    </Routes>
  );
}

export default OpportunitiesRoutes;
