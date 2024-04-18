import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Api from '../../Api';
import { useStaticContext } from '../../StaticContext';

function AdminProgramsList() {
  const location = useLocation();
  const navigate = useNavigate();
  const staticContext = useStaticContext();
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    Api.programs.index().then((response) => setPrograms(response.data));
  }, []);

  return (
    <>
      <Helmet>
        <title>Manage Programs - {staticContext?.env?.VITE_SITE_TITLE ?? ''}</title>
      </Helmet>
      <main className="users container">
        <h1>Manage Programs</h1>
        {location.state?.flash && <div className="alert alert-success mb-3">{location.state?.flash}</div>}
        <div className="mb-3">
          <Link className="btn btn-outline-primary" to="new">
            New Program
          </Link>
        </div>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th className="w-20">Name</th>
                <th className="w-20">Description</th>
                <th className="w-20">Number of Posts</th>
              </tr>
            </thead>
            <tbody>
              {programs.map((program) => (
                <tr key={program.id} onClick={() => navigate(`${program.id}`)}>
                  <td>{program.name}</td>
                  <td>{program.description}</td>
                  <td>WIP</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
export default AdminProgramsList;
