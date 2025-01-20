// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import HomePage from './components/HomePage';
// import RegistrationPage from './components/RegistrationPage';
// import PaymentPage from './components/PaymentPage';
// import AdminPage from './components/AdminPage';
// import AuthPage from './components/AuthPage';
// import PrivateRoute from './components/PrivateRoute';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/auth" element={<AuthPage />} />
//         <Route
//           path="/"
//           element={
//             <PrivateRoute>
//               <HomePage />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/register"
//           element={
//             <PrivateRoute>
//               <RegistrationPage />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/payment"
//           element={
//             <PrivateRoute>
//               <PaymentPage />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/admin"
//           element={
//             <PrivateRoute>
//               <AdminPage />
//             </PrivateRoute>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import AuthPage from './components/AuthPage';
import RegistrationPage from './components/RegistrationPage';
import PaymentPage from './components/PaymentPage';
import MainPage from './components/Mainpage';
import PrivateRoute from './components/PrivateRoute';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />


        <Route
          path="/home"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
