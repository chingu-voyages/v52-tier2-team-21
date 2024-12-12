import React, { Suspense } from 'react';
import Animation from './components/assets/Animation - 1731949632643.gif';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Login = React.lazy(() => import("./components/LoginPage/Login"));
const Registration = React.lazy(() => import("./components/RegistrationPage/Registration"));
const AdminDashboard = React.lazy(() => import("./components/Admin/Dashboard/Dashboard"));
const Homepage = React.lazy(() => import("./components/Resident/HomePagge/hompePage"));
const UserPanel = React.lazy(() => import("./components/user/resident"));
const Dashboard = React.lazy(() => import("./components/user/dashboard"));


function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-[100vh]">
            <img src={Animation} width={200} height={200} alt="loader" />
          </div>
        }
      >
        <Routes>
          <Route
            path="/sign-in"
            element={<Login />}
          />
          <Route path="/" element={<Registration />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/app/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/app/admin-appointment-request" element={<AdminDashboard />} />
          <Route path="/app/admin-appointment-schedule" element={<AdminDashboard />} />
          <Route path='/app/resident' element={<UserPanel/>}/>
          <Route path='/app/dashboard' element={<Dashboard/>}/>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
