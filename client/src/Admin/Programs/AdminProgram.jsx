import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Api from '../../Api';
import { useStaticContext } from '../../StaticContext';

function AdminProgram() {
  const staticContext = useStaticContext();
  const navigate = useNavigate();
  const { programId } = useParams();

  const [program, setProgram] = useState();

  useEffect(() => {
    if (programId) {
      Api.programs.get(programId).then((response) => setProgram(response.data));
    }
  }, [programId]);

  async function onDelete() {
    if (window.confirm(`Are you sure you wish to delete this program?`)) {
      const response = await Api.programs.delete(programId);
      if (response.status === 200) {
        navigate('/admin/programs', { state: { flash: 'Program deleted!' } });
      } else {
        window.alert('An unexpected error has occurred.');
      }
    }
  }

  return (
    <>
      <Helmet>
        <title>Program - {staticContext?.env?.VITE_SITE_TITLE ?? ''}</title>
      </Helmet>
      <main className="container">
        {program && (
          <>
            <h1>{program.name}</h1>
            <h2>{program.description}</h2>
            <div className="mb-3">
              <Link className="btn btn-outline-primary me-2" to="edit">
                Edit Program
              </Link>
              <button className="btn btn-outline-danger" onClick={onDelete}>
                Delete Program
              </button>
            </div>
          </>
        )}
      </main>
    </>
  );
}

export default AdminProgram;
