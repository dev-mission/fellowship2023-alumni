import { Routes, Route } from 'react-router-dom';

import AdminTag from './AdminTag';
import AdminTagForm from './AdminTagForm';
import AdminTagsList from './AdminTagsList';

function AdminTagsRoutes() {
  return (
    <Routes>
      <Route path=":tagId/edit" element={<AdminTagForm />} />
      <Route path=":tagId" element={<AdminTag />} />
      <Route path="new" element={<AdminTagForm />} />
      <Route path="" element={<AdminTagsList />} />
    </Routes>
  );
}

export default AdminTagsRoutes;
