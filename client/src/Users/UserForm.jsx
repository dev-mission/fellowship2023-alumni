import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { StatusCodes } from 'http-status-codes';

import Api from '../Api';
import { useAuthContext } from '../AuthContext';
import { useStaticContext } from '../StaticContext';
import PhotoInput from '../Components/PhotoInput';
import UnexpectedError from '../UnexpectedError';
import ValidationError from '../ValidationError';

import Form from 'react-bootstrap/Form';

function UserForm() {
  const staticContext = useStaticContext();
  const authContext = useAuthContext();
  const location = useLocation();
  const params = useParams();
  const userId = params.userId ?? authContext.user.id;

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    picture: '',
    isAdmin: false,
  });
  const [isUploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (userId) {
      Api.users.get(userId).then((response) =>
        setUser({
          ...response.data,
          password: '',
        }),
      );
    }
  }, [userId]);

  function onChange(event) {
    const newUser = { ...user };
    newUser[event.target.name] = event.target.value;
    setUser(newUser);
  }

  function onToggle(event) {
    const newUser = { ...user };
    newUser[event.target.name] = event.target.checked;
    setUser(newUser);
  }

  async function onSubmit(event) {
    event.preventDefault();
    setError(null);
    setSuccess(false);
    try {
      const response = await Api.users.update(user.id, user);
      if (user.id === authContext.user.id) {
        authContext.setUser(response.data);
      }
      setSuccess(true);
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
        <title>My Account - {staticContext?.env?.VITE_SITE_TITLE ?? ''}</title>
      </Helmet>
      <main className="container">
        <div className="row justify-content-center">
          <div className="col col-sm-10 col-md-8 col-lg-6 col-xl-4">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">Profile</h2>
                {location.state?.flash && <div className="alert alert-success">{location.state?.flash}</div>}
                <form onSubmit={onSubmit}>
                  {error && error.message && <div className="alert alert-danger">{error.message}</div>}
                  {success && <div className="alert alert-info">Your account has been updated!</div>}
                  <div className="mb-3">
                    <label className="form-label" htmlFor="picture">
                      Picture
                    </label>
                    <PhotoInput
                      className="card"
                      id="picture"
                      name="picture"
                      value={user.picture}
                      valueUrl={user.pictureUrl}
                      onChange={onChange}
                      onUploading={setUploading}>
                      <div className="card-body">
                        <div className="card-text">Drag-and-drop a photo file here, or click here to browse and select a file.</div>
                      </div>
                    </PhotoInput>
                    {error?.errorMessagesHTMLFor?.('picture')}
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="firstName">
                      First name
                    </label>
                    <input
                      type="text"
                      className={classNames('form-control', { 'is-invalid': error?.errorsFor?.('firstName') })}
                      id="firstName"
                      name="firstName"
                      onChange={onChange}
                      value={user.firstName}
                    />
                    {error?.errorMessagesHTMLFor?.('firstName')}
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="lastName">
                      Last name
                    </label>
                    <input
                      type="text"
                      className={classNames('form-control', { 'is-invalid': error?.errorsFor?.('lastName') })}
                      id="lastName"
                      name="lastName"
                      onChange={onChange}
                      value={user.lastName}
                    />
                    {error?.errorMessagesHTMLFor?.('lastName')}
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="pronouns">
                      Pronouns
                    </label>
                    <input
                      type="text"
                      className={classNames('form-control', { 'is-invalid': error?.errorsFor?.('pronouns') })}
                      id="pronouns"
                      name="pronouns"
                      onChange={onChange}
                      value={user.pronouns}
                      placeholder="she/they..."
                    />
                    {error?.errorMessagesHTMLFor?.('pronouns')}
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">Bio</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Let our community know what you're up to or what types of roles you're looking for"></textarea>
                  </div>
                  <div className="mb-3">
                    <label>Dev/Mission Affiliation</label>
                    <Form.Select aria-label="Default select example">
                      <option>Pre-Apprenticeship Student</option>
                      <option value="1">Current Fellow</option>
                      <option value="2">Fellowship Alum</option>
                      <option value="3">CTA</option>
                      <option value="4">Intern</option>
                      <option value="5">Staff</option>
                    </Form.Select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="LinkedIn">
                      LinkedIn
                    </label>
                    <input
                      type="text"
                      className={classNames('form-control', { 'is-invalid': error?.errorsFor?.('LinkedIn') })}
                      id="LinkedIn"
                      name="LinkedIn"
                      onChange={onChange}
                      value={user.LinkedIn}
                      placeholder="Enter LinkedIn Profile"
                    />
                    {error?.errorMessagesHTMLFor?.('linkedIn')}
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="GitHub">
                      GitHub
                    </label>
                    <input
                      type="text"
                      className={classNames('form-control', { 'is-invalid': error?.errorsFor?.('GitHub') })}
                      id="GitHub"
                      name="GitHub"
                      onChange={onChange}
                      value={user.GitHub}
                      placeholder="Enter GitHub link"
                    />
                    {error?.errorMessagesHTMLFor?.('GitHub')}
                  </div>
                  <h3>Employment Info</h3>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="currentCompany">
                      Current Company
                    </label>
                    <input
                      type="text"
                      className={classNames('form-control', { 'is-invalid': error?.errorsFor?.('currentCompany') })}
                      id="currentCompany"
                      name="currentCompany"
                      onChange={onChange}
                      value={user.currentCompany}
                      placeholder="Enter company name"
                    />
                    {error?.errorMessagesHTMLFor?.('currentCompany')}
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="currentJobTitle">
                      Current Job Title
                    </label>
                    <input
                      type="text"
                      className={classNames('form-control', { 'is-invalid': error?.errorsFor?.('currentJobTitle') })}
                      id="currentJobTitle"
                      name="currentJobTitle"
                      onChange={onChange}
                      value={user.currentJobTitle}
                      placeholder="Enter job title"
                    />
                    {error?.errorMessagesHTMLFor?.('currentJobTitle')}
                  </div>
                  <h3>Contact Info</h3>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="email">
                      Email
                    </label>
                    <input
                      type="text"
                      className={classNames('form-control', { 'is-invalid': error?.errorsFor?.('email') })}
                      id="email"
                      name="email"
                      onChange={onChange}
                      value={user.email}
                      placeholder="Keep up updated. Enter the email you use most often!"
                    />
                    {error?.errorMessagesHTMLFor?.('email')}
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="phone">
                      Phone
                    </label>
                    <input
                      type="text"
                      className={classNames('form-control', { 'is-invalid': error?.errorsFor?.('phone') })}
                      id="phone"
                      name="phone"
                      onChange={onChange}
                      value={user.phone}
                      placeholder="Number we can best reach you!"
                    />
                    {error?.errorMessagesHTMLFor?.('phone')}
                  </div>
                  <div className="mb-3 d-grid">
                    <button disabled={isUploading} className="btn btn-primary" type="submit">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h1>Account Settings</h1>
                <div className="mb-3">
                    <label className="form-label" htmlFor="email">
                      Email
                    </label>
                    <input
                      type="text"
                      className={classNames('form-control', { 'is-invalid': error?.errorsFor?.('email') })}
                      id="email"
                      name="email"
                      onChange={onChange}
                      value={user.email}
                      placeholder="Keep up updated. Enter the email you use most often!"
                    />
                    {error?.errorMessagesHTMLFor?.('email')}
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                    <input
                      type="password"
                      className={classNames('form-control', { 'is-invalid': error?.errorsFor?.('password') })}
                      id="password"
                      name="password"
                      onChange={onChange}
                      value={user.password}
                    />
                    {error?.errorMessagesHTMLFor?.('password')}
                  </div>
                  {authContext.user.isAdmin && (
                    <div className="mb-3">
                      <label className="form-label" htmlFor="isAdmin">
                        Administrator
                      </label>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className={classNames('form-check-input', { 'is-invalid': error?.errorsFor?.('isAdmin') })}
                          id="isAdmin"
                          name="isAdmin"
                          onChange={onToggle}
                          checked={user.isAdmin}
                        />
                        <label htmlFor="isAdmin" className="form-check-label">
                          Is an administrator?
                        </label>
                      </div>
                      {error?.errorMessagesHTMLFor?.('isAdmin')}
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default UserForm;
