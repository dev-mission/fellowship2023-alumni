import { Route, Routes } from 'react-router-dom';
import Opportunity from './Opportunity';
import OpportunityList from './OpportunityList';
import AdminPostForm from './AdminPostForm';

function OpportunitiesRoutes() {
  return (
    <Routes>
      <Route path=":postId/edit" element={<AdminPostForm />} />
      <Route path=":postId" element={<Opportunity />} />
      <Route path="new" element={<AdminPostForm />} />
      <Route path="" element={<OpportunityList />} />
    </Routes>
  );
}

export default OpportunitiesRoutes;
