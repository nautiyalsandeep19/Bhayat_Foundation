import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Navbar from './Pages/Navbar/Navbar';
import About from './Pages/About/About';
import Footer from './Pages/Footer/Footer';
import Certification from './Pages/Cetification/Certification';
import Fundraise from './Pages/FundRaise/Fundraise';
import Donate from './Pages/Donate/Donate';
import Payment from './Pages/Payment/Payment';
import VolunteerIDCard from './Pages/VolunteerIDCard/VolunteerIDCard';
import Volunteer from './Pages/Volunteer/Volunteer';
import Profile from './Pages/Profile/Profile';
import SignupLogin from './Pages/SignupLogin/SignupLogin';
import { ToastContainer } from 'react-toastify';
import { AuthProvider, AuthContext } from './Pages/context/AuthContext';
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword';
import ResetPassword from './Pages/ResetPassword/ResetPassword';
import Programs from './Pages/Programs/Programs';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Layout />
      </Router>
    </AuthProvider>
  );
};

const Layout = () => {
  const location = useLocation();
  const { user } = React.useContext(AuthContext);

  const hideFooterRoutes = ['/FundRaise', '/Donate'];
  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/Certifcation" element={<Certification />} />
        <Route path="/signupLogin" element={<SignupLogin />} />
        <Route path="/FundRaise" element={<Fundraise />} />
        <Route path="/Donate" element={<Donate />} />
        <Route path="/Payment" element={<Payment />} />
        <Route path="/Volunteer" element={<Volunteer />} />
        <Route path='/VolunteerIDCard' element={<VolunteerIDCard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/Programs" element={<Programs />} />
        <Route 
          path='/Profile' 
          element={user ? <Profile volunteerId={user?._id} /> : <Navigate to="/signupLogin" />}
        />
      </Routes>
      
      {!shouldHideFooter && <Footer />}
    </>
  );
};

export default App;
