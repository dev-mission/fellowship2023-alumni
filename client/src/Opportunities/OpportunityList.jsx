import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

import Form from 'react-bootstrap/Form';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Badge from 'react-bootstrap/Badge';

function OpportunityList() {
  return (
    <>
        <Card.Body>
          {/* <Container>
            <div className="row">
              <div className="col-md-6"><h1>Opportunities</h1></div>
              <div className="col-md-4 .col-md-offset-4"><Button variant="outline-primary">New Opp</Button></div>
            </div>
          </Container> */}
          <Container>
            <div className="row">
              <div className="col-md-6"><h1>Opportunities</h1></div>
              <div className="col-md-6 col-md-offset-4"><Button className="col-md-12" variant="outline-primary">New Opp</Button></div>
            </div>
          </Container>
          <Container>
            <div className="row">
              <div className="d-flex">
                {/* <DropdownButton className="w-100" title="Recently Added" id="bg-nested-dropdown">
              <Dropdown.Item eventKey="1">Most popular</Dropdown.Item>
              <Dropdown.Item eventKey="2">Newest</Dropdown.Item>
              <Dropdown.Item eventKey="2">Oldest</Dropdown.Item>
            </DropdownButton> */}
                <Form.Select aria-label="Default select example">
                  <option>Recently Added</option>
                  <option value="1">Most popular</option>
                  <option value="2">Newest</option>
                  <option value="3">Oldest</option>
                </Form.Select>
              </div>
            </div>
          </Container>
          <Container>
            <Row>
              <Col><Button variant="outline-primary">Add Filter</Button></Col>
              <Col><Form.Control type="text" placeholder="Search" /></Col>
            </Row>
          </Container>
        </Card.Body>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-3 offset-9">
            <h6>CLEAR FILTERS</h6>
          </div>
        </div>
      </div>
      <Container>
        <div className="card">
          <h5 className="card-header d-flex justify-content-between">Uber
            <Badge pill bg="primary">
              Jobs
            </Badge>
          </h5>
          <div className="card-body">
            <h5 className="card-title">Software Engineer</h5>
            <p className="card-text">San Francisco, CA</p>
            <p className="card-text">Posted 6 days ago</p>
          </div>
        </div>
          <div className="card">
            <h5 className="card-header d-flex justify-content-between">Uber
              <Badge pill bg="primary">
                Jobs
              </Badge>
            </h5>
            <div className="card-body">
              <h5 className="card-title">Software Engineer</h5>
              <p className="card-text">San Francisco, CA</p>
              <p className="card-text">Posted 6 days ago</p>
            </div>
          </div>
          <div className="card">
            <h5 className="card-header d-flex justify-content-between">Uber
              <Badge pill bg="primary">
                Jobs
              </Badge>
            </h5>
            <div className="card-body">
              <h5 className="card-title">Software Engineer</h5>
              <p className="card-text">San Francisco, CA</p>
              <p className="card-text">Posted 6 days ago</p>
            </div>
          </div>
      </Container>
    </>
  );
}

export default OpportunityList;