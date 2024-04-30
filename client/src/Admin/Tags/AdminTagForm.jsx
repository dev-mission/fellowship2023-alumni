import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { StatusCodes } from 'http-status-codes';

import Api from '../../Api';
import { useStaticContext } from '../../StaticContext';

import UnexpectedError from '../../UnexpectedError';
import ValidationError from '../../ValidationError';

function AdminTagForm() {
  const staticContext = useStaticContext();
  const navigate = useNavigate();
  const params = useParams();
  const tagId = params.tagId;

  const [tag, setTag] = useState({
    name: 'Tag Name',
    description: 'Description',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (tagId) {
      Api.tags.get(tagId).then((response) => {
        setTag(response.data);
      });
    }
  }, [tagId]);

  function onChange(event) {
    const newTag = { ...tag };
    newTag[event.target.name] = event.target.value;
    setTag(newTag);
  }

  async function onSubmit(event) {
    event.preventDefault();
    setError(null);
    try {
      if (tagId) {
        await Api.tags.update(tagId, tag);
        navigate(`/admin/tags/${tagId}`);
      } else {
        const response = await Api.tags.create(tag);
        const { id } = response.data;
        navigate(`/admin/tags/${id}`);
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
        <title>Tag - {staticContext?.env?.VITE_SITE_TITLE ?? ''}</title>
      </Helmet>
      <main className="container">
        <div className="row justify-content-center">
          <div className="col col-sm-10 col-md-8 col-lg-6 col-xl-4">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">Tag</h2>
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
                      value={tag.name}
                    />
                    {error?.errorMessagesHTMLFor?.('name')}
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

export default AdminTagForm;
