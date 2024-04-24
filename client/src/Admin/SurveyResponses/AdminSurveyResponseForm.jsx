import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { StatusCodes } from 'http-status-codes';

import Api from '../../Api';
import { useStaticContext } from '../../StaticContext';

import UnexpectedError from '../../UnexpectedError';
import ValidationError from '../../ValidationError';

function AdminSurveyResponseForm() {
  const staticContext = useStaticContext();
  const navigate = useNavigate();
  const params = useParams();
  const surveyResponseId = params.surveyResponseId;

  const [surveyResponse, setSurveyResponse] = useState({
    isJob: true,
    isVolunteer: true,
    isOther: true,
    otherText: 'More text',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (surveyResponseId) {
      Api.surveyResponses.get(surveyResponseId).then((response) => {
        setSurveyResponse(response.data);
      });
    }
  }, [surveyResponseId]);

  function onChange(event) {
    const newSurveyResponse = { ...surveyResponse };
    newSurveyResponse[event.target.name] = event.target.value;
    setSurveyResponse(newSurveyResponse);
  }

  function onChangeCheckBox(event) {
    const newSurveyResponse = { ...surveyResponse };
    newSurveyResponse[event.target.name] = event.target.checked;
    setSurveyResponse(newSurveyResponse);
  }

  async function onSubmit(event) {
    event.preventDefault();
    setError(null);
    try {
      if (surveyResponseId) {
        await Api.surveyResponses.update(surveyResponseId, surveyResponse);
        navigate(`/admin/surveyResponses/${surveyResponseId}`);
      } else {
        const response = await Api.surveyResponses.create(surveyResponse);
        const { id } = response.data;
        navigate(`/admin/surveyResponses/${id}`);
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
        <title>SurveyResponse - {staticContext?.env?.VITE_SITE_TITLE ?? ''}</title>
      </Helmet>
      <main className="container">
        <div className="row justify-content-center">
          <div className="col col-sm-10 col-md-8 col-lg-6 col-xl-4">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">SurveyResponse</h2>
                <form onSubmit={onSubmit}>
                  {error && error.message && <div className="alert alert-danger">{error.message}</div>}
                  <div className="mb-3 form-group form-check">
                    <input
                      type="checkbox"
                      className={classNames('form-check-input', { 'is-invalid': error?.errorsFor?.('isJob') })}
                      id="isJob"
                      name="isJob"
                      onChange={onChangeCheckBox}
                      checked={surveyResponse.isJob}
                      value={surveyResponse.isJob}
                    />
                    <label className="form-check-label" htmlFor="isJob">
                      Looking for Job
                    </label>
                    {error?.errorMessagesHTMLFor?.('isJob')}
                  </div>
                  <div className="mb-3 form-group form-check">
                    <input
                      type="checkbox"
                      className={classNames('form-check-input', { 'is-invalid': error?.errorsFor?.('isVolunteer') })}
                      id="isVolunteer"
                      name="isVolunteer"
                      onChange={onChangeCheckBox}
                      checked={surveyResponse.isVolunteer}
                      value={surveyResponse.isVolunteer}
                    />
                    <label className="form-check-label" htmlFor="isVolunteer">
                      Looking for Volunteering Opportunity
                    </label>
                    {error?.errorMessagesHTMLFor?.('isVolunteer')}
                  </div>
                  <div className="mb-3 form-group form-check">
                    <input
                      type="checkbox"
                      className={classNames('form-check-input', { 'is-invalid': error?.errorsFor?.('isOther') })}
                      id="isOther"
                      name="isOther"
                      onChange={onChangeCheckBox}
                      checked={surveyResponse.isOther}
                      value={surveyResponse.isOther}
                    />
                    <label className="form-check-label" htmlFor="isOther">
                      Looking for Other Opportunities
                    </label>
                    {error?.errorMessagesHTMLFor?.('isOther')}
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="otherText">
                      More information
                    </label>
                    <input
                      type="text"
                      className={classNames('form-control', { 'is-invalid': error?.errorsFor?.('otherText') })}
                      id="otherText"
                      name="otherText"
                      onChange={onChange}
                      value={surveyResponse.otherText}
                    />
                    {error?.errorMessagesHTMLFor?.('otherText')}
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="expiresOn">
                      Expires on
                    </label>
                    <input
                      type="date"
                      className={classNames('form-control', { 'is-invalid': error?.errorsFor?.('expiresOn') })}
                      id="expiresOn"
                      name="expiresOn"
                      onChange={onChange}
                      value={surveyResponse.expiresOn}
                    />
                    {error?.errorMessagesHTMLFor?.('expiresOn')}
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

export default AdminSurveyResponseForm;
