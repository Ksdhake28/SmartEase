import React, { useState } from "react";

function StudentInfo() {
  // Initial student data
  const [studentData, setStudentData] = useState({
    name: "Enter student name",
    rollNumber: "Enter roll number",
    class: "Select class",
    div: "Select division",
    mobileNumber: "Enter mobile number",
    email: "Enter email address",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setStudentData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Toggle between edit and save states
  const toggleEdit = async () => {
    if (isEditing) {
      try {
        // Make a POST request to the backend to save student data
        const response = await fetch("http://localhost:3000/UT-records", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studentData, // Sending the student data object
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to save data");
        }

        // Reset error message and display success message if the request is successful
        setErrorMessage("");
        setSuccessMessage("Data saved successfully!");
      } catch (error) {
        // Display error message if request fails
        setErrorMessage("An error occurred while saving data.");
        console.error("Error:", error);
      }
    } else {
      setSuccessMessage("");
      setErrorMessage("");
    }
    setIsEditing(!isEditing); // Toggle the editing state
  };

  return (
    <div className="main-body">
      <h2>Student Information</h2>

      <div className="student-info-card">
        <div className="student-info-field">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={studentData.name}
            onChange={handleInputChange}
            readOnly={!isEditing}
          />
        </div>

        <div className="student-info-field">
          <label htmlFor="rollNumber">Roll Number:</label>
          <input
            type="text"
            id="rollNumber"
            value={studentData.rollNumber}
            onChange={handleInputChange}
            readOnly={!isEditing}
          />
        </div>

        <div className="student-info-field">
          <label htmlFor="class">Class:</label>
          <select
            id="class"
            value={studentData.class}
            onChange={handleInputChange}
            disabled={!isEditing}
          >
            <option value="SE">SE</option>
            <option value="TE">TE</option>
            <option value="BE">BE</option>
          </select>
        </div>

        <div className="student-info-field">
          <label htmlFor="div">Div:</label>
          <select
            id="div"
            value={studentData.div}
            onChange={handleInputChange}
            disabled={!isEditing}
          >
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
          </select>
        </div>

        <div className="student-info-field">
          <label htmlFor="mobileNumber">Mobile Number:</label>
          <input
            type="text"
            id="mobileNumber"
            value={studentData.mobileNumber}
            onChange={handleInputChange}
            readOnly={!isEditing}
          />
        </div>

        <div className="student-info-field">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={studentData.email}
            onChange={handleInputChange}
            readOnly={!isEditing}
          />
        </div>

        <button onClick={toggleEdit}>{isEditing ? "Save" : "Edit"}</button>

        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </div>
  );
}

export default StudentInfo;
