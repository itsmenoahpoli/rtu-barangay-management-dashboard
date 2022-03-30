import React from "react";
import { Container, Button, Card, Form } from "react-bootstrap";

import { DashboardLayout } from "components/layouts";

const ResidentRecordsPage = () => {
  const searchInputRef = React.useRef(null);

  React.useEffect(() => {
    searchInputRef.current.focus();
  }, []);

  return (
    <DashboardLayout title="Resident Records">
      <Container fluid className="datatable-header">
        <div>
          <Button variant="info">Add New Entry</Button>
        </div>

        <div className="col-md-4 d-flex">
          <Form.Control
            type="text"
            placeholder="Search"
            className="shadow-sm"
            ref={searchInputRef}
          />
        </div>
      </Container>

      <Card className="card-datatable shadow-sm">
        <Card.Body>Datatable</Card.Body>
      </Card>
    </DashboardLayout>
  );
};

export default ResidentRecordsPage;
