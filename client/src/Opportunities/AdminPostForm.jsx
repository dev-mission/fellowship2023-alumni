import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { StatusCodes } from 'http-status-codes';
import { DateTime } from 'luxon';

import Api from '../Api';
import { useStaticContext } from '../StaticContext';

import UnexpectedError from '../UnexpectedError';
import ValidationError from '../ValidationError';

function AdminPostForm() {
  const staticContext = useStaticContext();
  const navigate = useNavigate();
  const params = useParams();
  const postId = params.postId;

  const [post, setPost] = useState({
    title: 'Job Title',
    workLocation: 'San Francisco, CA',
    description: 'Description',
    applicationUrl: 'https://devmission.org/',
    OrganizationId: 2,
  });
  const [error, setError] = useState(null);

  const [organizations, setOrganizations] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    Api.organizations.index().then((response) => setOrganizations(response.data));
  }, []);

  useEffect(() => {
    Api.tags.index().then((response) => setTags(response.data));
  }, []);

  useEffect(() => {
    if (postId) {
      Api.posts.get(postId).then((response) => {
        setPost(response.data);
      });
    }
  }, [postId]);

  function onChange(event) {
    const newPost = { ...post };
    newPost[event.target.name] = event.target.value;
    setPost(newPost);
  }

  function onChangeCheckBox(event) {
    const newPost = { ...post };
    newPost[event.target.name] = event.target.checked;
    setPost(newPost);
  }

  async function onSubmit(event) {
    event.preventDefault();
    setError(null);
    try {
      post.postedOn = DateTime.fromISO(post.postedOn, { zone: 'local' }).toISO();
      if (postId) {
        await Api.posts.update(postId, post);
        navigate(`/opportunities/${postId}`);
      } else {
        const response = await Api.posts.create(post);
        const { id } = response.data;
        navigate(`/opportunities/${id}`);
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
        <title>Opportunity - {staticContext?.env?.VITE_SITE_TITLE ?? ''}</title>
      </Helmet>
      <main className="container">
        <div className="row justify-content-center">
          <div className="col col-sm-10 col-md-8 col-lg-6 col-xl-4">
            <div className="card">
              <div className="card-body">
                <h2 className="mb-4 card-title">New Opportunity</h2>
                <form onSubmit={onSubmit}>
                  {error && error.message && <div className="alert alert-danger">{error.message}</div>}
                  <h6 className="mb-3 card-title">Type</h6>
                  <div className="form-group form-check">
                    <input
                      type="radio"
                      className={classNames('form-check-input', { 'is-invalid': error?.errorsFor?.('job') })}
                      id="job"
                      name="type"
                      onChange={onChange}
                      //value={post.type}
                    />
                    <label className="form-label" htmlFor="job">
                      Job
                    </label>
                    {error?.errorMessagesHTMLFor?.('job')}
                  </div>
                  <div className="form-group form-check">
                    <input
                      type="radio"
                      className={classNames('form-check-input', { 'is-invalid': error?.errorsFor?.('internship') })}
                      id="internship"
                      name="type"
                      onChange={onChange}
                      //value={post.type}
                    />
                    <label className="form-label" htmlFor="internship">
                      Internship
                    </label>
                    {error?.errorMessagesHTMLFor?.('internship')}
                  </div>
                  <div className="form-group form-check">
                    <input
                      type="radio"
                      className={classNames('form-check-input', { 'is-invalid': error?.errorsFor?.('volunteer') })}
                      id="volunteer"
                      name="type"
                      onChange={onChange}
                      //value={post.type}
                    />
                    <label className="form-label" htmlFor="volunteer">
                      Volunteer
                    </label>
                    {error?.errorMessagesHTMLFor?.('volunteer')}
                  </div>
                  <div className="form-group form-check">
                    <input
                      type="radio"
                      className={classNames('form-check-input', { 'is-invalid': error?.errorsFor?.('learning') })}
                      id="learning"
                      name="type"
                      onChange={onChange}
                      //value={post.type}
                    />
                    <label className="form-label" htmlFor="learning">
                      Learning Opportunity
                    </label>
                    {error?.errorMessagesHTMLFor?.('learning')}
                  </div>
                  <div className="form-group form-check">
                    <input
                      type="radio"
                      className={classNames('form-check-input', { 'is-invalid': error?.errorsFor?.('event') })}
                      id="event"
                      name="type"
                      onChange={onChange}
                      //value={post.type}
                    />
                    <label className="form-label" htmlFor="event">
                      Event
                    </label>
                    {error?.errorMessagesHTMLFor?.('event')}
                  </div>
                  <div className="form-group form-check">
                    <input
                      type="radio"
                      className={classNames('form-check-input', { 'is-invalid': error?.errorsFor?.('alumniMeet') })}
                      id="alumniMeet"
                      name="type"
                      onChange={onChange}
                      //value={post.type}
                    />
                    <label className="form-label" htmlFor="alumniMeet">
                      Alumni Meet Up
                    </label>
                    {error?.errorMessagesHTMLFor?.('alumniMeet')}
                  </div>
                  <div className="form-group form-check">
                    <input
                      type="radio"
                      className={classNames('form-check-input', { 'is-invalid': error?.errorsFor?.('scholarship') })}
                      id="scholarship"
                      name="type"
                      onChange={onChange}
                      //value={post.type}
                    />
                    <label className="form-label" htmlFor="scholarship">
                      Scholarship
                    </label>
                    {error?.errorMessagesHTMLFor?.('scholarship')}
                  </div>
                  <div className="form-group form-check">
                    <input
                      type="radio"
                      className={classNames('form-check-input', { 'is-invalid': error?.errorsFor?.('other') })}
                      id="other"
                      name="type"
                      onChange={onChange}
                      //value={post.type}
                    />
                    <label className="form-label" htmlFor="other">
                      Other Resource (health, housing, legal, etc.)
                    </label>
                    {error?.errorMessagesHTMLFor?.('other')}
                  </div>
                  <hr />
                  <div className="mb-3">
                    <label className="form-label" htmlFor="OrganizationId">
                      Organization
                    </label>
                    <select
                      id="OrganizationId"
                      name="OrganizationId"
                      className="form-select"
                      onChange={onChange}
                      value={post.OrganizationId}>
                      {organizations.map((organization) => (
                        <option key={organization.id} value={organization.id}>
                          {organization.name}
                        </option>
                      ))}
                    </select>
                    {error?.errorMessagesHTMLFor?.('OrganizationId')}
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="title">
                      Role
                    </label>
                    <input
                      type="text"
                      className={classNames('form-control', { 'is-invalid': error?.errorsFor?.('title') })}
                      id="title"
                      name="title"
                      onChange={onChange}
                      value={post.title}
                    />
                    {error?.errorMessagesHTMLFor?.('title')}
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="workLocation">
                      Location
                    </label>
                    <input
                      type="text"
                      className={classNames('form-control', { 'is-invalid': error?.errorsFor?.('workLocation') })}
                      id="workLocation"
                      name="workLocation"
                      onChange={onChange}
                      value={post.workLocation}
                    />
                    {error?.errorMessagesHTMLFor?.('workLocation')}
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="applicationUrl">
                      Link to Posting
                    </label>
                    <input
                      type="text"
                      className={classNames('form-control', { 'is-invalid': error?.errorsFor?.('applicationUrl') })}
                      id="applicationUrl"
                      name="applicationUrl"
                      onChange={onChange}
                      value={post.applicationUrl}
                    />
                    {error?.errorMessagesHTMLFor?.('applicationUrl')}
                  </div>
                  <h6 className="mb-3 card-title">Tags (Optional)</h6>
                  {tags.map((tag) => (
                    <>
                      <div className="mb-3 form-group form-check">
                        <input
                          type="checkbox"
                          className={classNames('form-check-input', { 'is-invalid': error?.errorsFor?.(tag.name) })}
                          id={tag.id}
                          name={tag.name}
                          onChange={onChangeCheckBox}
                          value={tag.name}
                          // checked={tag.name && post. == tag.name}
                        />
                        <label className="form-check-label" htmlFor="isJob">
                          {tag.name}
                        </label>
                        {error?.errorMessagesHTMLFor?.(tag.name)}
                      </div>
                    </>
                  ))}
                  <div className="mb-3">
                    <label className="form-label" htmlFor="experience">
                      Experience Level (Optional)
                    </label>
                    <select
                      id="experience"
                      name="experience"
                      className="form-select"
                      onChange={onChange}
                      // value={post.experience}
                    >
                      <option value={post.experience}>Entry</option>
                      <option value={post.experience}>Associate</option>
                      <option value={post.experience}>Mid</option>
                      <option value={post.experience}>Senior</option>
                    </select>
                    {error?.errorMessagesHTMLFor?.('experience')}
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="description">
                      Job Description (Optional)
                    </label>
                    <textarea
                      className={classNames('form-control', { 'is-invalid': error?.errorsFor?.('description') })}
                      id="description"
                      name="description"
                      onChange={onChange}
                      value={post.description}
                    />
                    {error?.errorMessagesHTMLFor?.('description')}
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="responsibilities">
                      Responsibilites (Optional)
                    </label>
                    <textarea
                      className={classNames('form-control', { 'is-invalid': error?.errorsFor?.('responsibilities') })}
                      id="responsibilities"
                      name="responsibilities"
                      onChange={onChange}
                      // value={post.responsibilities}
                    />
                    {error?.errorMessagesHTMLFor?.('responsibilities')}
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="qualifications">
                      Qualifications (Optional)
                    </label>
                    <textarea
                      className={classNames('form-control', { 'is-invalid': error?.errorsFor?.('qualifications') })}
                      id="qualifications"
                      name="qualifications"
                      onChange={onChange}
                      // value={post.qualifications}
                    />
                    {error?.errorMessagesHTMLFor?.('qualifications')}
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="otherText">
                      Other Details
                    </label>
                    <textarea
                      className={classNames('form-control', { 'is-invalid': error?.errorsFor?.('otherText') })}
                      id="otherText"
                      name="otherText"
                      onChange={onChange}
                      // value={post.otherText}
                    />
                    {error?.errorMessagesHTMLFor?.('otherText')}
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

export default AdminPostForm;
