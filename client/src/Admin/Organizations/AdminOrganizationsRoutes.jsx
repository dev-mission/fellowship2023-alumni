import { Routes, Route } from 'react-router-dom';

import AdminOrganization from './AdminOrganization';
import AdminOrganizationForm from './AdminOrganizationForm';
import AdminOrganizationsList from './AdminOrganizationsList';

function AdminOrganizationsRoutes() {
  return (
    <Routes>
      <Route path=":organizationId/edit" element={<AdminOrganizationForm />} />
      <Route path=":organizationId" element={<AdminOrganization />} />
      <Route path="new" element={<AdminOrganizationForm />} />
      <Route path="" element={<AdminOrganizationsList />} />
    </Routes>
  );
}

export default AdminOrganizationsRoutes;
