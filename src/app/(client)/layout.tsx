import Login from "../_common/auth/Login";
import Register from "../_common/auth/Register";
import Footer from "../_common/layout/Footer";
import ForgotPassword from "../_common/layout/ForgotPassword";
import NavBar from "../_common/layout/NavBar";
import Loading from "../_shared/components/Loading";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <NavBar />
      <Login />
      <Register />
      <ForgotPassword />
      <Loading />
        {/* // Fixed product comment */}
      {children}
      <Footer />
    </div>
  );
}
