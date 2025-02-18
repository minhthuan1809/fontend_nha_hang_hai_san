import React from "react";
import Footer from "../_common/layout/Footer";
import NavBar from "../_common/layout/NavBar";
import Login from "../_common/layout/Login";
import Register from "../_common/layout/Register";
import ForgotPassword from "../_common/layout/ForgotPassword";
import Loading from "../_common/ui/Loading";
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <NavBar />
      <Login />
      <Register />
      <ForgotPassword />
      <Loading />
      {children}
      <Footer />
    </div>
  );
}
