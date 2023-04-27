import { memo } from "react";
import { Route, Routes } from "react-router-dom";

import Login from "../components/pages/Login";
import { Home } from "../components/pages/Home";
import { Setting } from "../components/pages/Setting";
import { Layout } from "../components/pages/Layout";
import { Page401 } from "../components/pages/Page401";
import { Page404 } from "../components/pages/Page404";

export const Router = memo(() => {
  return (
    <Routes>
      {/* <Route path="/" element={<Login />} /> */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="401" element={<Page401 />} />
        <Route path="setting" element={<Setting />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
});
