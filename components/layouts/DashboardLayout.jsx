import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Container, Row, Col, Image } from "react-bootstrap";

import {
  DashboardSidebarNavigation,
  DashboardNavbarNavigation,
} from "components/navigations";
import { BreadcrumbBuilder } from "components/general";

export const DashboardLayout = (props) => {
  const { title, children } = props;

  let router = useRouter();

  const handleNavigate = (url) => {
    router.push(url);
  };

  return (
    <>
      <Head>
        <title>PITOGO &mdash; {title || "Dashboard"}</title>
      </Head>

      <Container fluid className="dashboard-layout">
        <DashboardSidebarNavigation handleNavigate={handleNavigate} />

        <Container fluid className="dashboard-content">
          <Container fluid className="dashboard-page-content">
            <Container className="dashboard-page-content-body">
              <Container fluid className="mb-4">
                <BreadcrumbBuilder />
                <h3 className="dashboard-page-title">{title || "Dashboard"}</h3>
              </Container>

              {children}
            </Container>
          </Container>
        </Container>
      </Container>
    </>
  );
};
