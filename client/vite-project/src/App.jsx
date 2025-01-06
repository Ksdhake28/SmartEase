import React from "react";
import "./index.css"; // Same CSS file
import Header from "../components/Header";
import MainBody from "../components/MainBody.jsx";
import Sidebar from "../components/Sidebar";
import StudentInfo from "../components/Studentinfo";
import SubjectMarksPDF from "../components/Printpdf";

function App() {
  return (
    <>
      <Header />
      <StudentInfo />
      <MainBody />
      <SubjectMarksPDF />
    </>
  );
}

export default App;
