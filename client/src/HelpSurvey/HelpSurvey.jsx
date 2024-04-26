import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function HelpSurvey() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function myFunction() {
    var checkBox = document.getElementById('myCheck');
    var text = document.getElementById('text');
    if (checkBox.checked == true) {
      text.style.display = 'block';
    } else {
      text.style.display = 'none';
    }
  }

  return (
    <>
      <h1>The Help Survey</h1>
      <Button variant="primary" onClick={handleShow}>
        The Help Survey
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>What are you looking for help with?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="pb-2">
            This survey helps us imrpove our resources and services, but if you want to reach out for help directly, don&apos;t hesitate to
            message staff on Slack!
          </div>
          <div className="custom-control custom-checkbox">
            <input type="checkbox" className="custom-control-input" id="customCheck1"></input>
            <label className="custom-control-label" htmlFor="customCheck1">
              <div className="ms-1">Job</div>
            </label>
          </div>
          <div className="custom-control custom-checkbox">
            <input type="checkbox" className="custom-control-input" id="customCheck1"></input>
            <label className="custom-control-label" htmlFor="customCheck1">
              <div className="ms-1">Volunteer opportunities</div>
            </label>
          </div>
          <div className="custom-control custom-checkbox">
            <input type="checkbox" className="custom-control-input" id="myCheck" onClick={myFunction}></input>
            <label className="custom-control-label" htmlFor="customCheck1">
              <div className="ms-1">Other resources</div>
            </label>
            <input
              style={{ display: 'none' }}
              id="text"
              className="form-control"
              type="text"
              placeholder="mental health support, housing assistance, training..."
              aria-label="default input example"></input>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary">Submit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default HelpSurvey;
