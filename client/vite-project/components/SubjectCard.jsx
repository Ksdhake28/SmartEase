import React, { useState } from "react";

function SubjectCard({ subject, faculty }) {
  let name = "Kshitij Dhake";
  const [marks, setMarks] = useState({
    UT1: 0,
    UT2: 0,
    UT3: 0,
  });

  const handleChange = (e) => {
    setMarks({ ...marks, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    console.log(`Marks for ${subject}: `, marks);

    try {
      const response = await fetch("http://localhost:3000/UT-records", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name, subject, marks}),
      });

      console.log(response);
    } catch (error) {
      console.log(" Error ", error);
    }
  };

  return (
    <div className="promo_card">
      <div className="subject-info">
        <h3>Subject: {subject}</h3>
        <p>|</p>
        <h3>Faculty: {faculty}</h3>
      </div>
      <div className="ut-section">
        <div className="UT-1">
          <form action="#" style={{ marginRight: "5px" }}>
            <label htmlFor="UT1">UT1:</label>
            <br />
            <input
              type="number"
              id="UT1"
              value={marks.UT1}
              placeholder="input marks"
              onChange={handleChange}
            />
          </form>
        </div>
        <div className="marks-ut2">
          <div className="UT-2">
            <form action="#">
              <label htmlFor="UT2">UT2:</label>
              <br />
              <input
                type="text"
                id="UT2"
                value={marks.UT2}
                placeholder="input marks"
                onChange={handleChange}
              />
            </form>
          </div>
        </div>
        <div className="marks-ut3">
          <div className="UT-3">
            <form action="#">
              <label htmlFor="UT3">UT3:</label>
              <br />
              <input
                type="text"
                id="UT3"
                value={marks.UT3}
                placeholder="input marks"
                onChange={handleChange}
              />
            </form>
          </div>
        </div>
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default SubjectCard;
