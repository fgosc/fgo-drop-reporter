import { memo } from "react";
import { Route, Routes } from "react-router-dom";

import Login from "../components/pages/Login";
import { Home } from "../components/pages/Home";
import { Setting } from "../components/pages/Setting";
import { Layout } from "../components/pages/Layout";
import { Page401 } from "../components/pages/Page401";
import { Page404 } from "../components/pages/Page404";
import PrivacyPolicy from "../components/pages/PrivacyPolicy";
import Contact from "../components/pages/Contact";
import Service from "../components/pages/Service";
import ReportDetails from "../components/templates/ReportDetails";
import ReportsList from "../components/pages/ReportsList";
import OwnerInfo from "../components/pages/OwnerInfo";
import ReportslistByOwner from "../components/pages/ReportsListByOwner";

export const Router = memo(() => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="401" element={<Page401 />} />
        <Route path="setting" element={<Setting />} />
        <Route path="service" element={<Service />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="contact" element={<Contact />} />
        <Route path="reports/all" element={<ReportsList />} />
        <Route path="reports/:id" element={<ReportDetails />} />
        <Route path="/owners/:owner" element={<OwnerInfo />} />
        <Route path="/owners/:owner/reports" element={<ReportslistByOwner />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
});
