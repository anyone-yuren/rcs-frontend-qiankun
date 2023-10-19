import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Layout } from "ui";

export default function Home() {
  // useEffect(() => {
  //   if (location.pathname === "/") {
  //     navigate("/system");
  //   }
  // }, []);
  return (
    <Layout>
      <Card>123</Card>
      <div id="app"></div>
    </Layout>
  );
}
