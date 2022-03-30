import React from "react";
import { Container, Button, Card, Form, Row } from "react-bootstrap";

import { DashboardLayout } from "components/layouts";
import { TableBuilder } from "components/tables";

const ResidentRecordsPage = () => {
  const searchInputRef = React.useRef(null);

  React.useEffect(() => {
    searchInputRef.current.focus();

    console.log(process.env.API_BASEURL);
  }, []);

  const tableColumns = React.useMemo(
    () => [
      {
        name: "Resident",
        selector: (row) => row.name,
        sortable: true,
      },
      {
        name: "Age",
        selector: (row) => row.name,
        sortable: true,
      },
      {
        name: "With Complaints",
        selector: (row) => row.name,
        sortable: true,
      },
      {
        name: "Actions",
        selector: (row) => row.name,
        sortable: true,
      },
    ],
    []
  );

  return (
    <DashboardLayout title="Resident Records">
      <Container fluid className="datatable-header">
        <div>
          <Button variant="info">Add New Entry</Button>
        </div>

        <div className="col-sm-6 col-md-4 d-flex">
          <Form.Control
            type="text"
            placeholder="Search"
            className="shadow-sm"
            ref={searchInputRef}
          />
        </div>
      </Container>

      <Card className="card-datatable">
        <Card.Body>
          <TableBuilder columns={tableColumns} data={[]} />
        </Card.Body>
      </Card>
    </DashboardLayout>
  );
};

export default ResidentRecordsPage;
