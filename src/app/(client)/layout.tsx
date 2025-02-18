import React from "react";
import Footer from "../_common/layout/Footer";
import NavBar from "../_common/layout/NavBar";
import Login from "../_common/layout/Login";
import Register from "../_common/layout/Register";
import ForgotPassword from "../_common/layout/ForgotPassword";
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <NavBar />
      <Login />
      <Register />
      <ForgotPassword />
      {children}
      <Footer />
    </div>
  );
}
