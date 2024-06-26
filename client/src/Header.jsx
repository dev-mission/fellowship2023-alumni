import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import classNames from 'classnames';

import './Header.scss';
import Api from './Api';
import { useAuthContext } from './AuthContext';

function Header() {
  const navigate = useNavigate();
  const { user, setUser } = useAuthContext();
  const [isNavbarShowing, setNavbarShowing] = useState(false);

  useEffect(
    function () {
      Api.users.me().then((response) => {
        if (response.status === 204) {
          setUser(null);
        } else {
          setUser(response.data);
        }
      });
    },
    [setUser],
  );

  async function onLogout(event) {
    event.preventDefault();
    await Api.auth.logout();
    setUser(null);
    hideNavbar();
    navigate('/');
  }

  function toggleNavbar() {
    setNavbarShowing(!isNavbarShowing);
  }

  function hideNavbar() {
    setNavbarShowing(false);
  }

  return (
    <nav className="header navbar navbar-expand-md navbar-light bg-light fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/" onClick={hideNavbar}>
          Full Stack Starter
        </Link>
        <button onClick={toggleNavbar} className="navbar-toggler" type="button" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={classNames('collapse navbar-collapse', { show: isNavbarShowing })}>
          <ul className="navbar-nav flex-grow-1 mb-2 mb-md-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/" onClick={hideNavbar}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/opportunities" onClick={hideNavbar}>
                Opportunities
              </Link>
            </li>
            <ul className="navbar-nav flex-grow-1 d-flex justify-content-end">
              {user && (
                <>
                  {user.isAdmin && (
                    <NavDropdown title="Admin">
                      <Link className="dropdown-item" to="/admin/surveyResponses" onClick={hideNavbar}>
                        Survey Responses
                      </Link>
                      <Link className="dropdown-item" to="/admin/tags" onClick={hideNavbar}>
                        Tags
                      </Link>
                      <Link className="dropdown-item" to="/admin/organizations" onClick={hideNavbar}>
                        Organizations
                      </Link>
                      <Link className="dropdown-item" to="/admin/programs" onClick={hideNavbar}>
                        Programs
                      </Link>
                      <Link className="dropdown-item" to="/admin/cohorts" onClick={hideNavbar}>
                        Cohorts
                      </Link>
                      <Link className="dropdown-item" to="/admin/users" onClick={hideNavbar}>
                        Users
                      </Link>
                    </NavDropdown>
                  )}
                  <li className="nav-item me-3">
                    <span className="nav-link d-inline-block me-1">
                      Hello,{' '}
                      <Link to="/account" onClick={hideNavbar}>
                        {user.firstName}!
                      </Link>
                    </span>
                    {user.pictureUrl && <div className="header__picture" style={{ backgroundImage: `url(${user.pictureUrl})` }}></div>}
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/logout" onClick={onLogout}>
                      Log out
                    </a>
                  </li>
                </>
              )}
              {!user && (
                <li className="nav-item">
                  <Link className="nav-link" to="/login" onClick={hideNavbar}>
                    Log in
                  </Link>
                </li>
              )}
            </ul>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
