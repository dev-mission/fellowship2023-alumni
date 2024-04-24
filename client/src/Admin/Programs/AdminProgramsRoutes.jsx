import { Routes, Route } from 'react-router-dom';

import AdminProgram from './AdminProgram';
import AdminProgramForm from './AdminProgramForm';
import AdminProgramsList from './AdminProgramsList';

function AdminProgramsRoutes() {
  return (
    <Routes>
      <Route path=":programId/edit" element={<AdminProgramForm />} />
      <Route path=":programId" element={<AdminProgram />} />
      <Route path="new" element={<AdminProgramForm />} />
      <Route path="" element={<AdminProgramsList />} />
    </Routes>
  );
}

export default AdminProgramsRoutes;
