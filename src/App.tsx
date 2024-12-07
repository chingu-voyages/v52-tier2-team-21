import React, { Suspense } from 'react';
import Animation from './components/assets/Animation - 1731949632643.gif';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Login = React.lazy(() => import("./components/LoginPage/Login"));
const Registration = React.lazy(() => import("./components/RegistrationPage/Registration"));
const HomePage = React.lazy(() => import ("./components/hompePage"));


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
        <Route path="/register" element={<Registration />} />
        <Route path="/" element={<HomePage/>} />

      </Routes>
    </Suspense>
  </BrowserRouter>
  );
}

export default App;
