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
          <Container>
            <div className="row">
              <div className="col-md-6">
                <h1>Opportunities</h1>
              </div>
              <div className="col-md-4 .col-md-offset-4">
                <Button variant="outline-primary">New Opp</Button>
              </div>
            </div>
          </Container>
          <DropdownButton title="Recently Added" id="bg-nested-dropdown">
            <Dropdown.Item eventKey="1">Most popular</Dropdown.Item>
            <Dropdown.Item eventKey="2">Newest</Dropdown.Item>
            <Dropdown.Item eventKey="2">Oldest</Dropdown.Item>
          </DropdownButton>
          <Container>
            <Row>
              <Col>
                <Button variant="outline-primary">Add Filter</Button>
              </Col>
              <Col>
                <Form.Control type="text" placeholder="Search" />
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
      <Container>
        <div className="col-md-4 col-md-offset-5">
          <h3>CLEAR FILTERS</h3>
        </div>
      </Container>
    </>
  );
}

export default OpportunityList;
