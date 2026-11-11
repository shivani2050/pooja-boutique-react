import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Services from "./components/Services.jsx";
import About from "./components/About.jsx";
import WhyChooseUs from "./components/WhyChooseUs.jsx";
import Gallery from "./components/Gallery.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import { Routes ,Route} from "react-router-dom";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Account from "./pages/Account.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
 import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
 

 function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-ink text-ivory">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <WhyChooseUs />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default function App(){
  return(
       <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-pass" element={<ForgotPassword/>}/>
      <Route path="/register" element={<Register />} />
      <Route path="/account" element={<Account />} />
      <Route path="/admin/login" element={<AdminLogin/>}/>
      
      
<Route
  path="/admin/dashboard"
  element={
     <ProtectedRoute>
      <AdminDashboard/>
     </ProtectedRoute>
  }
/> 
    </Routes>
  )
}