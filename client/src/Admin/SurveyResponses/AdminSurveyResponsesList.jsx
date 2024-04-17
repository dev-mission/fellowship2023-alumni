import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { DateTime } from 'luxon';

import Api from '../../Api';
import { useStaticContext } from '../../StaticContext';

function AdminSurveyResponsesList() {
  const location = useLocation();
  const navigate = useNavigate();
  const staticContext = useStaticContext();
  const [surveyResponses, setSurveyResponses] = useState([]);

  useEffect(() => {
    Api.surveyResponses.index().then((response) => setSurveyResponses(response.data));
  }, []);

  return (
    <>
      <Helmet>
        <title>Manage Survey Responses - {staticContext?.env?.VITE_SITE_TITLE ?? ''}</title>
      </Helmet>
      <main className="users container">
        <h1>Manage Survey Responses</h1>
        {location.state?.flash && <div className="alert alert-success mb-3">{location.state?.flash}</div>}
        <div className="mb-3">
          <Link className="btn btn-outline-primary" to="new">
            New Survey Response
          </Link>
        </div>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th className="w-20">Name</th>
                <th className="w-20">Looking for Jobs</th>
                <th className="w-20">Looking for Volunteer Opportunities</th>
                <th className="w-20">Looking for Other Opportunities</th>
                <th className="w-20">More info</th>
                <th className="w-20">Expires</th>
              </tr>
            </thead>
            <tbody>
              {surveyResponses.map((surveyResponse) => (
                <tr key={surveyResponse.id} onClick={() => navigate(`${surveyResponse.id}`)}>
                  <td>{surveyResponse.User.firstName + ' ' +surveyResponse.User.lastName}</td>
                  <td>{surveyResponse.isJob && 'Yes'}</td>
                  <td>{surveyResponse.isVolunteer && 'Yes'}</td>
                  <td>{surveyResponse.isOther && 'Yes'}</td>
                  <td>{surveyResponse.otherText}</td>
                  <td>{new Date(surveyResponse.expiresOn).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
export default AdminSurveyResponsesList;
