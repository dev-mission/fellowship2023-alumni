import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Api from '../../Api';
import { useStaticContext } from '../../StaticContext';

function AdminSurveyResponse() {
  const staticContext = useStaticContext();
  const navigate = useNavigate();
  const { surveyResponseId } = useParams();

  const [surveyResponse, setSurveyResponse] = useState();

  useEffect(() => {
    if (surveyResponseId) {
      Api.surveyResponses.get(surveyResponseId).then((response) => setSurveyResponse(response.data));
    }
  }, [surveyResponseId]);

  async function onDelete() {
    if (window.confirm(`Are you sure you wish to delete this Survey response?`)) {
      const response = await Api.surveyResponses.delete(surveyResponseId);
      if (response.status === 200) {
        navigate('/admin/surveyResponses', { state: { flash: 'Survey response deleted!' } });
      } else {
        window.alert('An unexpected error has occurred.');
      }
    }
  }

  return (
    <>
      <Helmet>
        <title>Survey Response - {staticContext?.env?.VITE_SITE_TITLE ?? ''}</title>
      </Helmet>
      <main className="container">
        {surveyResponse && (
          <>
            <h1>
              Name:
              {' ' + surveyResponse.User.firstName + ' ' + surveyResponse.User.lastName}
            </h1>
            <h3>Looking for Job Opportunities: {surveyResponse.isJob ? 'Yes' : 'No'}</h3>
            <h3>Looking for Volunteer Opportunities: {surveyResponse.isVolunteer ? 'Yes' : 'No'}</h3>
            <h3>Looking for Other Opportunities: {surveyResponse.isOther ? 'Yes' : 'No'}</h3>
            <p>{surveyResponse.otherText}</p>
            <div className="mb-3">
              <Link className="btn btn-outline-primary me-2" to="edit">
                Edit Survey Response
              </Link>
              <button className="btn btn-outline-danger" onClick={onDelete}>
                Delete Survey Response
              </button>
            </div>
          </>
        )}
      </main>
    </>
  );
}

export default AdminSurveyResponse;
