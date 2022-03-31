import React from "react";
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
import { ResidentRecordsService } from "lib/services";

const residentsRecordsService = new ResidentRecordsService();

const ResidentRecordsPage = () => {
  const searchInputRef = React.useRef(null);

  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const getResidentRecords = async (search) => {
    setLoading(true);
    let residentRecordsData = await residentsRecordsService.getAll("");

    setData(residentRecordsData.data);

    setLoading(false);
  };

  const getResidentAge = (birthdate) => {
    let dt = new Date();
    // return dt.getYear() - new Date(birthdate).getYear();
    return dt.getFullYear() - 1998;
  };

  const handleSearch = async (search) => {
    await getResidentRecords(search);
  };

  React.useEffect(() => {
    searchInputRef.current.focus();
    getResidentRecords();
  }, []);

  const tableColumns = React.useMemo(
    () => [
      {
        name: "Resident",
        selector: (row) => row.first_name,
        sortable: true,
        cell: (row) => (
          <Container fluid className="d-flex align-items-center">
            <UserAvatar size={48} name={`${row.first_name} ${row.last_name}`} />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="pl-3">
              <p className="mb-0">
                {row.first_name} {row.middle_name} {row.last_name}
              </p>

              <small className="text-muted">{row.email}</small>
            </div>
          </Container>
        ),
      },
      {
        name: "Age",
        selector: (row) => row.name,
        sortable: true,
        cell: (row) => getResidentAge(row.birthdate),
      },
      {
        name: "Has Complaints Reported",
        selector: (row) => row.resident_complaints,
        sortable: true,
        cell: (row) =>
          row.resident_complaints.length > 0 ? (
            <Badge bg="danger">Record(s) found</Badge>
          ) : (
            <>&mdash;</>
          ),
      },
      {
        name: "Has Files",
        selector: (row) => row.resident_complaints,
        sortable: true,
        cell: (row) =>
          row.resident_files.length === 0 ? (
            <Button variant="link">View</Button>
          ) : (
            <>&mdash;</>
          ),
      },
      {
        name: "Actions",
        selector: (row) => row.id,
        sortable: true,
        cell: (row) => (
          <ButtonGroup>
            <Button className="btn-edit">Edit</Button>
            <Button className="btn-delete">Remove</Button>
          </ButtonGroup>
        ),
      },
    ],
    []
  );

  return (
    <DashboardLayout title="Resident Records">
      <Container fluid className="datatable-header">
        <div>
          <Button variant="primary">Add New Entry</Button>

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

export default ResidentRecordsPage;
