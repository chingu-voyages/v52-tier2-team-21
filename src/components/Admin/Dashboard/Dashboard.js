import React, { useEffect, useState } from "react";
import Sidebar from "../../../container/Sidebar";
import Header from "../../../container/Header";
import Welcome from "../WelcomePage/Welcome";
import Appointment from "../WelcomePage/Welcome";
import AppointmentRequest from "../AppointmentRequest/AppointmentRequest";
import AppointmentSchedule from "../AppointmentSchedule/AppointmentSchedule";

function Dashboard() {
  const [activePage, setActivePage] = useState("");
  const [activeBtn, setActiveBtn] = useState("");
  const [screen, setScreen] = useState();
  const [isSidebarOpen, setisSidebarOpen] = useState(true);

  useEffect(() => {
    const Path = window.location.href;
    if (Path?.includes("admin-dashboard")) {
      setActivePage("Welcome");
    } else if (Path?.includes("admin-appointment-request")) {
      setActivePage("Appointment Request");
    } else if (Path?.includes("admin-appointment-schedule")) {
      setActivePage("Appointment Schedule");
    }
  }, [activeBtn]);

  useEffect(() => {
    const handleResize = () => {
      setScreen(window?.outerWidth);
      if (window?.outerWidth <= 938) {
        setisSidebarOpen(false);
      }
      else{
        setisSidebarOpen(true)
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <section className={`grid ${isSidebarOpen && screen > 938 ? "grid-cols-[auto_1fr]" : ""} gap-0 w-full min-h-[100vh] max-h-[100vh] overflow-hidden`}>
        {isSidebarOpen && (
          <div  className={`${
            screen <= 938 ? "absolute top-0 left-0" : "col-span-1"
          } z-20 ${
            isSidebarOpen ? "animate__animated animate__slideInLeft " : "animate__animated animate__slideOutRight animate__slowers"
          }`}>
            <Sidebar 
              setActiveBtn={setActiveBtn} 
              activeBtn={activeBtn} 
              isSidebarOpen={isSidebarOpen}
              setisSidebarOpen={setisSidebarOpen}
              screen={screen}
              />
          </div>
        )}
        <div className={`col-${isSidebarOpen ? "span-1" : "1"}`}>
          <div className="grid flex flex-col gap-3 h-[100vh]">
            <Header 
            isSidebarOpen={isSidebarOpen}
            setisSidebarOpen={setisSidebarOpen}
            screen={screen}
            />
            <div
              style={{
                height: "inherit",
                zIndex: "1",
                overflowY: "auto",
                overflowX: "hidden",
              }}
              className="bg-[#81BFDA] z-10 rounded-lg m-4 bg-opacity-20 shadow-md backdrop-filter backdrop-blur-lg "
            >
              {activePage == "Welcome" ? (
                <Welcome />
              ) : activePage == "Appointment Request" ? (
                <AppointmentRequest 
                screen={screen}
                />
              ) : activePage == "Appointment Schedule" ? (
                <AppointmentSchedule 
                screen={screen}
                />
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
