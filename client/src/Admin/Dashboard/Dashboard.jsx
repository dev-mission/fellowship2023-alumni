import Container from 'react-bootstrap/Container';

function Dashboard() {
    return (
    <>
      <Container>
        <h5>What do alums need help?</h5>
        <p>This is based on the help survey.</p>
        <img src="../../public/PieChart.png" className="img-fluid"></img>
        <hr></hr>
        <h5>What opps are alums interested in?</h5>
        <p>This is based on what opportunities are being saved.</p>
        <ul className="list-group">
          <li className="list-group-item">
            <div className="row">
              <div className="col">
                <p className="mb-0">Jobs</p>
              </div>
              <div className="col d-flex justify-content-end">
                <span className="badge text-bg-secondary">14</span>
              </div>
            </div>
          </li>
          <li className="list-group-item">
            <div className="row">
              <div className="col">
                <p className="mb-0">Internships</p>
              </div>
              <div className="col d-flex justify-content-end">
                <span className="badge text-bg-secondary">14</span>
              </div>
            </div>
          </li>
          <li className="list-group-item">
            <div className="row">
              <div className="col">
                <p className="mb-0">Volunteering</p>
              </div>
              <div className="col d-flex justify-content-end">
                <span className="badge text-bg-secondary">14</span>
              </div>
            </div>
          </li>
          <li className="list-group-item">
            <div className="row">
              <div className="col">
                <p className="mb-0">Learning</p>
              </div>
              <div className="col d-flex justify-content-end">
                <span className="badge text-bg-secondary">14</span>
              </div>
            </div>
          </li>
          <li className="list-group-item">
            <div className="row">
              <div className="col">
                <p className="mb-0">Events</p>
              </div>
              <div className="col d-flex justify-content-end">
                <span className="badge text-bg-secondary">14</span>
              </div>
            </div>
          </li>
          <li className="list-group-item">
            <div className="row">
              <div className="col">
                <p className="mb-0">Alumni Meet Ups</p>
              </div>
              <div className="col d-flex justify-content-end">
                <span className="badge text-bg-secondary">14</span>
              </div>
            </div>
          </li>
          <li className="list-group-item">
            <div className="row">
              <div className="col">
                <p className="mb-0">Scholarships</p>
              </div>
              <div className="col d-flex justify-content-end">
                <span className="badge text-bg-secondary">14</span>
              </div>
            </div>
          </li>
          <li className="list-group-item">
            <div className="row">
              <div className="col">
                <p className="mb-0">Other Resources</p>
              </div>
              <div className="col d-flex justify-content-end">
                <span className="badge text-bg-secondary">14</span>
              </div>
            </div>
          </li>
        </ul>
        <hr></hr> 
        <h5>What specific opps are interesting?</h5> 
        <p>This is based on what opportunities are being saved.</p>
        <ul className="list-group">
          <li className="list-group-item">
              <div className="row">
                <div className="col">
                  <p className="mb-0">Uber Software Engineering</p>
                </div>
                <div className="col d-flex justify-content-end">
                  <span className="badge text-bg-secondary">14</span>
                </div>
              </div>
            </li>
            <li className="list-group-item">
            <div className="row">
              <div className="col">
                <p className="mb-0">Google Internship</p>
              </div>
              <div className="col d-flex justify-content-end">
                <span className="badge text-bg-secondary">14</span>
              </div>
            </div>
          </li>
          <li className="list-group-item">
            <div className="row">
              <div className="col">
                <p className="mb-0">SF State Career Fair</p>
              </div>
              <div className="col d-flex justify-content-end">
                <span className="badge text-bg-secondary">14</span>
              </div>
            </div>
          </li>
        </ul>
      </Container>
    </>
     
    );
  }

  export default Dashboard;