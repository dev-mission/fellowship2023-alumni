import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { StatusCodes } from 'http-status-codes';

import Api from '../../Api';
import { useStaticContext } from '../../StaticContext';

import UnexpectedError from '../../UnexpectedError';
import ValidationError from '../../ValidationError';

function AdminProgramForm() {
  const staticContext = useStaticContext();
  const navigate = useNavigate();
  const params = useParams();
  const programId = params.programId;

  const [program, setProgram] = useState({
    name: 'Dev/Mission Pre-Apprenticeship',
    description: '',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (programId) {
      Api.programs.get(programId).then((response) => {
        setProgram(response.data);
      });
    }
  }, [programId]);

  function onChange(event) {
    const newProgram = { ...program };
    newProgram[event.target.name] = event.target.value;
    setProgram(newProgram);
  }

  async function onSubmit(event) {
    event.preventDefault();
    setError(null);
    try {
      if (programId) {
        await Api.programs.update(programId, program);
        navigate(`/admin/programs/${programId}`);
      } else {
        const response = await Api.programs.create(program);
        const { id } = response.data;
        navigate(`/admin/programs/${id}`);
      }
    } catch (error) {
      if (error.response?.status === StatusCodes.UNPROCESSABLE_ENTITY) {
        setError(new ValidationError(error.response.data));
      } else {
        setError(new UnexpectedError());
      }
    }
  }

  return (
    <>
      <Helmet>
        <title>Program - {staticContext?.env?.VITE_SITE_TITLE ?? ''}</title>
      </Helmet>
      <main className="container">
        <div className="row justify-content-center">
          <div className="col col-sm-10 col-md-8 col-lg-6 col-xl-4">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">Program</h2>
                <form onSubmit={onSubmit}>
                  {error && error.message && <div className="alert alert-danger">{error.message}</div>}
                  <div className="mb-3">
                    <label className="form-label" htmlFor="name">
                      Name
                    </label>
                    <input
                      type="text"
                      className={classNames('form-control', { 'is-invalid': error?.errorsFor?.('name') })}
                      id="name"
                      name="name"
                      onChange={onChange}
                      value={program.name}
                    />
                    {error?.errorMessagesHTMLFor?.('name')}
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="description">
                      Description
                    </label>
                    <input
                      type="text"
                      className={classNames('form-control', { 'is-invalid': error?.errorsFor?.('description') })}
                      id="description"
                      name="description"
                      onChange={onChange}
                      value={program.description}
                    />
                    {error?.errorMessagesHTMLFor?.('description')}
                  </div>
                  <div className="mb-3 d-grid">
                    <button className="btn btn-primary" type="submit">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default AdminProgramForm;
