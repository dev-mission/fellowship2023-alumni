import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function HelpSurvey() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <h1>The Help Survey</h1>
            <Button variant="primary" onClick={handleShow}>
                The Help Survey
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>What are you looking for help with?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    This survey helps us imrpove our resources and services, but if you want to reach out for help directly, don't hesitate to message staff on Slack!
                    <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="customCheck1"></input>
                        <label class="custom-control-label" for="customCheck1">Job</label>
                    </div>
                    <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="customCheck1"></input>
                        <label class="custom-control-label" for="customCheck1">Volunteer opportunities</label>
                    </div>
                    <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="customCheck1"></input>
                        <label class="custom-control-label" for="customCheck1">Other resources</label>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary">Submit</Button>
                </Modal.Footer>
            </Modal>
        </>

    );
}

export default HelpSurvey;