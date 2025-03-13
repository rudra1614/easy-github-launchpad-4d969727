import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import "./main.scss";
import { DevProfile, Home } from "./Pages";
import { CompanyProfile } from "./Pages/CompanyProfile/CompanyProfile";
import { Evaluation } from "./Pages/CompanyProfile/Nested/EvaluationNested";
import { JobsNested } from "./Pages/CompanyProfile/Nested/JobsNested";
import { TalentPool } from "./Pages/CompanyProfile/Nested/TalentPool";
import { TimeOffNested } from "./Pages/CompanyProfile/Nested/TimeOffNested";

import { Jobs } from "./Pages/Jobs/Jobs";
// Auth

import Login from "./Pages/Auth/User/Login";
import Register from "./Pages/Auth/User/Register";

import CompanyLogin from "./Pages/Auth/Company/Login";
import CompanyRegister from "./Pages/Auth/Company/Register";

// Jobs
import { Archived } from "./Pages/CompanyProfile/Nested/Jobs/Archived/Archived";
import { OpenPaused } from "./Pages/CompanyProfile/Nested/Jobs/OpenPaused/OpenPaused";
// Evaluation
import { Completed } from "./Pages/CompanyProfile/Nested/Evaluation/Completed/Completed";
import { Pending } from "./Pages/CompanyProfile/Nested/Evaluation/Pending/Pending";
// Talentpool
import { All } from "./Pages/CompanyProfile/Nested/TalentPool/All/All";
import { Opened } from "./Pages/CompanyProfile/Nested/TalentPool/Opened/Opened";
import { Proposed } from "./Pages/CompanyProfile/Nested/TalentPool/Proposed/Proposed";
import { Saved } from "./Pages/CompanyProfile/Nested/TalentPool/Saved/Saved";

// Profile
import { CompanyProfileProvider } from "./context/CompanyProfileContext";
import { Profile } from "./Pages/CompanyProfile/Profile/Profile";
import ErrorPage from "./Pages/Error/ErrorPage";
import { JobProvider } from "./context/JobContext";
import { Applied } from "./Pages/DevProfile/Nested/Applied";

const App = () => {
  const user = localStorage.getItem("userData");
  const token = localStorage.getItem("token");
  const companyInfo = localStorage.getItem("companyInfo");
  const isLogedCompany = companyInfo && token;

  //Test
  // let hours = 5;
  // let now = new Date().getTime();
  // let setupTime = localStorage.getItem("setupTime");
  // if (setupTime == null) {
  //   localStorage.setItem("setupTime", now);
  // } else {
  //   if (now - setupTime > hours * 60 * 60 * 1000) {
  //     localStorage.clear();
  //     localStorage.setItem("setupTime", now);
  //   }
  // }

  return (
    <main>
      <div>
        <JobProvider>
          <CompanyProfileProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/user/login" element={<Login />} />
              <Route path="/user/register" element={<Register />} />
              <Route path="/company/login" element={<CompanyLogin />} />
              <Route path="/company/register" element={<CompanyRegister />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/dev-profile">
                <Route
                  exact
                  path="/dev-profile"
                  element={user ? <DevProfile /> : <Login />}
                />
                <Route
                  exact
                  path="/dev-profile/applied"
                  element={<Applied />}
                />
              </Route>
              <Route
                path="/comprofile"
                element={
                  isLogedCompany ? (
                    <CompanyProfile />
                  ) : (
                    <Navigate to="/company/login" />
                  )
                }
              >
                <Route index element={<JobsNested />} />
                {/* Jobs */}
                <Route path="jobs" element={<JobsNested />}>
                  <Route index path="openpaused" element={<OpenPaused />} />
                  <Route path="archived" element={<Archived />} />
                  {/* Jobs */}
                </Route>
                <Route path="timeoff" element={<TimeOffNested />} />
                {/* Evaluation */}
                <Route path="evaluation" element={<Evaluation />}>
                  <Route index path="pending" element={<Pending />} />
                  <Route path="completed" element={<Completed />} />
                </Route>
                {/* Evaluation */}
                {/* Talentpool */}
                <Route path="talentpool" element={<TalentPool />}>
                  <Route index path="all" element={<All />} />
                  <Route path="saved" element={<Saved />} />
                  <Route path="opened" element={<Opened />} />
                  <Route path="proposed" element={<Proposed />} />
                </Route>
                {/* Talentpool */}
                {/* Profile */}
              </Route>

              <Route
                path="timeoff"
                element={isLogedCompany ? <TimeOffNested /> : <CompanyLogin />}
              />
              {/* Evaluation */}
              <Route
                path="evaluation"
                element={isLogedCompany ? <Evaluation /> : <CompanyLogin />}
              >
                <Route index path="pending" element={<Pending />} />
                <Route path="completed" element={<Completed />} />
              </Route>
              {/* Evaluation */}
              {/* Talentpool */}
              <Route
                path="talentpool"
                element={isLogedCompany ? <TalentPool /> : <CompanyLogin />}
              >
                <Route index path="all" element={<All />} />
                <Route path="saved" element={<Saved />} />
                <Route path="opened" element={<Opened />} />
                <Route path="proposed" element={<Proposed />} />
              </Route>
              {/* Talentpool */}
              {/* Profile */}
              <Route
                path="/profile"
                element={isLogedCompany ? <Profile /> : <CompanyLogin />}
              />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </CompanyProfileProvider>
        </JobProvider>
      </div>
    </main>
  );
};

export default App;
