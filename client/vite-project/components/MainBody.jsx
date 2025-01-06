import React, { useState } from 'react';
import SubjectCard from './SubjectCard';
import SubjectMarksPDF from './Printpdf';

function MainBody() {
  // State for managing the list of subjects
  const [subjects, setSubjects] = useState([]);

  // State for managing input fields for new subject and faculty
  const [newSubject, setNewSubject] = useState('');
  const [newFaculty, setNewFaculty] = useState('');

  // Handle input change for new subject
  const handleSubjectChange = (e) => {
    setNewSubject(e.target.value);
  };

  // Handle input change for new faculty
  const handleFacultyChange = (e) => {
    setNewFaculty(e.target.value);
  };

  // Add new subject card
  const addSubject = () => {
    if (newSubject && newFaculty) {
      setSubjects([...subjects, { subject: newSubject, faculty: newFaculty }]);
      setNewSubject('');
      setNewFaculty('');
    }
  };

  // Delete subject card
  const deleteSubject = (index) => {
    const updatedSubjects = subjects.filter((_, i) => i !== index);
    setSubjects(updatedSubjects);
  };

  return (
    <div className="main-body">
      <h2>Unit Test Record Section</h2>

      {/* Form for adding new subjects */}
      <div className="subject-form">
        <input
          type="text"
          placeholder="Enter Subject Name"
          value={newSubject}
          onChange={handleSubjectChange}
        />
        <input
          type="text"
          placeholder="Enter Faculty Name"
          value={newFaculty}
          onChange={handleFacultyChange}
        />
        <button onClick={addSubject}>Add Subject</button>
      </div>

      {/* Render subject cards */}
      {subjects.length > 0 ? (
        subjects.map((item, index) => (
          <div key={index} className="subject-card-wrapper">
            <SubjectCard subject={item.subject} faculty={item.faculty} />
            <button onClick={() => deleteSubject(index)}>Delete</button>
          </div>
        ))
      ) : (
        <p>No subjects added yet. Please add subjects using the form above.</p>
      )}
    </div>
  );
}

export default MainBody;
