import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

export const BaseCertificateTemplate = () => {
  return (
    <Container fluid className="certificate-container">
      {/* <div className="inline">
        <div>A</div>
        <div>B</div>
        <div>C</div>
      </div> */}
      <Row>
        <Col md={4} fluid>
          <div className="col-7 mx-auto">
            <Image
              src="/assets/images/pitogo-seal.png"
              fluid
              alt="Pitogo Seal Logo"
            />
          </div>
        </Col>

        <Col md={4} fluid className="certificate-header-texts text-center">
          <p>REPUBLIC OF THE PHILIPPINES</p>
          <p>BARANGAY (23) PITOGO</p>
          <p>CITY OF MAKATI</p>
          <p>OFFICE OF THE BARANGAY COUNCIL</p>
        </Col>

        <Col md={4} fluid>
          <div className="col-7 mx-auto">
            <Image
              src="/assets/images/makati-logo.png"
              fluid
              alt="Makati City Logo"
            />
          </div>
        </Col>
      </Row>

      <Container fluid className="certificate-content-container col-10">
        <h5 className="fw-bold text-center">CERTIFICATION</h5>

        <p>To Whom It May Concern</p>

        <br />

        <p className="text-center">
          This is to certify that ___________ , ___________ years old, is a bona
          fide resident of Barangay Pitogo with postal address at ___________ .
          This certification is being issued upon the request of the above
          mentioned person for ___________ . Issued on ___________ at the &nbsp;
          <b>Barangay Pitogo, Makati City</b>.
        </p>
      </Container>
    </Container>
  );
};
