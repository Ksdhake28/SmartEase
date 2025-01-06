import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

function SubjectMarksPDF() {
  const [marksData, setMarksData] = useState([]);

  // Fetch subject marks from the backend
  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const response = await fetch("http://localhost:3000/UT-records");
        const data = await response.json();
        setMarksData(data); // assuming data is an array of subjects with marks
      } catch (error) {
        console.error("Error fetching marks:", error);
      }
    };

    fetchMarks();
  }, []);

  // Function to generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text("Student Marks Report", 14, 22);

    // Prepare table data
    const tableColumn = ["Subject", "UT1", "UT2", "UT3"];
    const tableRows = [];

    marksData.forEach((subjectRecord) => {
      const subjectRow = [
        subjectRecord.subject,
        subjectRecord.marks.UT1 || "N/A",
        subjectRecord.marks.UT2 || "N/A",
        subjectRecord.marks.UT3 || "N/A",
      ];
      tableRows.push(subjectRow);
    });

    // Add autoTable
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30, // Table starting position
    });

    // Save the PDF
    doc.save("subject-marks-report.pdf");
  };

  return (
    <div className="Marks-Display">
      <h1>Marks for Subjects</h1>
      {/* Render Marks (Optional) */}
      {marksData.length > 0 ? (
        <ul>
          {marksData.map((subjectRecord, index) => (
            <li key={index}>
              {subjectRecord.subject}: UT1 - {subjectRecord.marks.UT1 || "N/A"}, UT2 -{" "}
              {subjectRecord.marks.UT2 || "N/A"}, UT3 - {subjectRecord.marks.UT3 || "N/A"}
            </li>
          ))}
        </ul>
      ) : (
        <p>No marks available.</p>
      )}

      {/* Print Button */}
      <button onClick={generatePDF}>Print Marks as PDF</button>
    </div>
  );
}

export default SubjectMarksPDF;
