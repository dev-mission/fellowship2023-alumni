import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

import Form from 'react-bootstrap/Form';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function OpportunityList() {
  return (
    <>
      <Card>
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
          <div className="row">
            <DropdownButton title="Recently Added" id="bg-nested-dropdown">
              <Dropdown.Item eventKey="1">Most popular</Dropdown.Item>
              <Dropdown.Item eventKey="2">Newest</Dropdown.Item>
              <Dropdown.Item eventKey="2">Oldest</Dropdown.Item>
            </DropdownButton>
          </div>
          <Container>
            <Row>
              <Col><Button variant="outline-primary">Add Filter</Button></Col>
              <Col><Form.Control type="text" placeholder="Search" /></Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-3 offset-9">
            <h6>CLEAR FILTERS</h6>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div class="card">
          <h5 class="card-header">Uber</h5>
          <div class="card-body">
            <h5 class="card-title">Software Engineer</h5>
            <p class="card-text">San Francisco, CA</p>
            <p class="card-text">Posted 6 days ago</p>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div class="card">
          <h5 class="card-header">Uber</h5>
          <div class="card-body">
            <h5 class="card-title">Software Engineer</h5>
            <p class="card-text">San Francisco, CA</p>
            <p class="card-text">Posted 6 days ago</p>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div class="card">
          <h5 class="card-header">Uber</h5>
          <div class="card-body">
            <h5 class="card-title">Software Engineer</h5>
            <p class="card-text">San Francisco, CA</p>
            <p class="card-text">Posted 6 days ago</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default OpportunityList;