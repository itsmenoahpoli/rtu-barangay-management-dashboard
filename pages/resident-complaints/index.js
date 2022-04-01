import React from "react";
import { useRouter } from "next/router";
import {
  Container,
  ButtonGroup,
  Button,
  Card,
  Form,
  Badge,
} from "react-bootstrap";
import UserAvatar from "react-user-avatar";

import { DashboardLayout } from "components/layouts";
import { TableBuilder } from "components/tables";

const ResidentComplaintsPage = () => {
  const router = useRouter();
  const searchInputRef = React.useState(null);

  const [search, setSearch] = React.useState("");
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const getResidentComplaints = (search) => {
    //
  };

  const handleSearch = (search) => {
    setSearch(search);
  };

  React.useEffect(() => {
    searchInputRef.current.focus();
    getResidentComplaints("");
  }, []);

  React.useEffect(() => {
    if (search !== "") {
      getResidentComplaints(search);
    }
  }, [search]);

  const tableColumns = React.useMemo(
    () => [
      {
        name: "Resident",
        grow: 2,
        selector: (row) => row.first_name,
        sortable: true,
        cell: (row) => (
          <Container fluid className="d-flex align-items-center">
            <UserAvatar
              size={48}
              name={`${row.resident.first_name} ${row.resident.last_name}`}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="pl-3">
              <p className="mb-0">
                {row.resident.first_name} {row.resident.middle_name}{" "}
                {row.last_name}
              </p>

              <small className="text-muted">{row.email}</small>
            </div>
          </Container>
        ),
      },
      {
        name: "Type",
        selector: (row) => row.id,
        sortable: true,
      },
      {
        name: "Actions",
        selector: (row) => row.id,
        sortable: true,
        cell: (row) => (
          <ButtonGroup>
            <Button
              variant="info"
              className="btn-edit"
              onClick={() => handleViewResident(row.id)}
            >
              View Profile
            </Button>
            <Button
              variant="danger"
              className="btn-delete"
              onClick={() => handleDeleteResident(row.id)}
            >
              Remove
            </Button>
          </ButtonGroup>
        ),
      },
    ],
    []
  );

  return (
    <DashboardLayout title="Resident Complaints">
      <Container fluid className="datatable-header">
        <div>
          <Button
            variant="primary"
            onClick={() => router.push("/resident-complaints/new")}
          >
            Create New Complaint
          </Button>

          <Button variant="secondary">Export to CSV</Button>
        </div>

        <div className="col-sm-6 col-md-4 d-flex">
          <Form.Control
            type="text"
            placeholder="Search"
            className="shadow-sm"
            ref={searchInputRef}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </Container>

      <Card className="card-datatable">
        <Card.Body>
          <TableBuilder columns={tableColumns} data={data} loading={loading} />
        </Card.Body>
      </Card>
    </DashboardLayout>
  );
};

export default ResidentComplaintsPage;
