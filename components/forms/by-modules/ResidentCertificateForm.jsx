import React from "react";
import {
  Container,
  Form,
  FloatingLabel,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import Pdf from "react-to-pdf";

import { BaseCertificateTemplate } from "components/certificate-templates";

const requiredValidation = { required: true };

export const ResidentCertificateForm = (props) => {
  const { residents, formFns } = props;
  const certificateTemplateRef = React.useRef(null);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [selectedResident, setSelectedResident] = React.useState("");
  const [selectedCertificateType, setSelectedCertificateType] =
    React.useState("");
  const [purpose, setPurpose] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const handleFormSubmit = async (values) => {
    setSubmitted(true);

    await formFns.submitFormFn(values);

    setSubmitted(false);
  };

  const setResidentData = (residentId) => {
    let idx = residents.findIndex((r) => r.id === parseInt(residentId));

    setSelectedResident(residents[idx]);
  };

  return (
    <Container>
      <div className="mb-4">
        <small className="text-sm text-muted">Certificate Information</small>
      </div>

      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <Form.Group className="form-group">
          <FloatingLabel label="Resident">
            <Form.Select
              type="text"
              placeholder="Resident"
              className={
                Boolean(errors && errors.resident_id?.type === "required")
                  ? "border border-danger"
                  : ""
              }
              defaultValue={selectedResident}
              onInput={(e) => setResidentData(e.target.value)}
              {...register("resident_id", { ...requiredValidation })}
            >
              <option value="">Choose</option>
              {Boolean(residents.length > 0) &&
                residents.map((_, idx) => (
                  <option key={idx} value={_.id}>
                    {_.first_name} {_.middle_name} {_.last_name}
                  </option>
                ))}
            </Form.Select>
          </FloatingLabel>

          {Boolean(errors && errors.email?.type === "required") && (
            <small className="text-danger">This field is required</small>
          )}
        </Form.Group>

        <Form.Group className="form-group">
          <FloatingLabel label="Certificate Type">
            <Form.Select
              type="text"
              placeholder="Certificate Type"
              className={
                Boolean(errors && errors.type?.type === "required")
                  ? "border border-danger"
                  : ""
              }
              onInput={(e) => setSelectedCertificateType(e.target.value)}
              {...register("type", { ...requiredValidation })}
            >
              <option value="">Choose</option>
              <option value="barangay-clearance">Barangay Clearance</option>
              <option value="barangay-certificate">Barangay Certificate</option>
              <option value="indigency-certificate">
                Indigency Certificate
              </option>
              <option value="solo-parent-certificate">
                Solo Parent Certificate
              </option>
              <option value="business-permit-certificate">
                Business Permit
              </option>
              <option value="telecommunication-permit-certificate">
                Telecommunication Permit
              </option>
            </Form.Select>
          </FloatingLabel>

          {Boolean(errors && errors.email?.type === "required") && (
            <small className="text-danger">This field is required</small>
          )}
        </Form.Group>

        <Form.Group className="form-group">
          <FloatingLabel label="Purpose">
            <Form.Control
              type="text"
              as="textarea"
              style={{ height: "100px" }}
              onInput={(e) => setPurpose(e.target.value)}
              {...register("purpose", { ...requiredValidation })}
            />
          </FloatingLabel>
        </Form.Group>

        <Row>
          <Col></Col>
        </Row>

        <div className="mb-1">
          <small className="text-sm text-muted">Certificate Preview</small>
        </div>

        <div className="d-flex justify-content-center">
          <div ref={certificateTemplateRef} style={{ width: "65%" }}>
            <BaseCertificateTemplate
              resident={selectedResident}
              type={selectedCertificateType}
              purpose={purpose}
            />
          </div>
        </div>

        <Button
          type="submit"
          variant="success"
          className="mt-3"
          disabled={submitted}
        >
          CREATE CERTIFICATE
        </Button>
      </Form>

      {/* <Pdf
        targetRef={certificateTemplateRef}
        filename="barangay-certificate-2022.pdf"
      >
        {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
      </Pdf> */}
    </Container>
  );
};
