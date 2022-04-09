import React from "react";
import { useRouter } from "next/router";
import { Card } from "react-bootstrap";

import { DashboardLayout } from "components/layouts";
import { ResidentRecordForm } from "components/forms";
import { TableBuilder } from "components/tables";
import { ResidentRecordsService } from "lib/services";

const residentRecordsService = new ResidentRecordsService();

const ResidentProfilePage = () => {
  const router = useRouter();
  const residentId = router.query.resident_id;

  const [resident, setResident] = React.useState(null);

  const getResidentProfile = async (residentId) => {
    const { data } = await residentRecordsService.getResidentRecordById(
      residentId
    );

    setResident(data);
  };

  const handleUpdateResidentRecord = (resident) => {
    console.log(resident);
  };

  React.useEffect(() => {
    if (residentId) {
      getResidentProfile(residentId);
    }
  }, []);

  return (
    <DashboardLayout title="Resident Profile">
      {Boolean(resident === null) && "Fetching profile ..."}

      {Boolean(resident !== null) && (
        <>
          {/* TODO: Implement tabs for profile, documents, complaints */}
          <Card>
            <Card.Body>
              <div className="mb-4">Basic Information</div>

              <ResidentRecordForm resident={resident} type="edit" formFns />
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <div className="mb-4">Reported Complaints</div>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <div className="mb-4">Requested/Issued Certificates</div>
            </Card.Body>
          </Card>
        </>
      )}
    </DashboardLayout>
  );
};

export default ResidentProfilePage;
