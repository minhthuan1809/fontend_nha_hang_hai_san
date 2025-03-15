import Login from "../_common/auth/Login";
import Register from "../_common/auth/Register";
import Footer from "../_common/layout/Footer";
import ForgotPassword from "../_common/layout/ForgotPassword";
import ModalCart from "../_common/layout/ModalCart";
import NavBar from "../_common/layout/NavBar";
import TawkToChat from "../_shared/components/TawkToChat";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <NavBar />
      <Login />
      <Register />
      <ForgotPassword />
      {/* // chat */}
      <TawkToChat />
      {/* // Fixed product comment */}
      {children}
      <ModalCart />
      <Footer />
    </div>
  );
}
