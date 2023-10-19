import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "ui";

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/system");
    }
  }, []);
  return (
    <Layout>
      <div id="app"></div>
    </Layout>
  );
}
