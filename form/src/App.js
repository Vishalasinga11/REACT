import React, { useState } from 'react';
import './App.css'; // Import the CSS file

function App() {
  const [formdata, setFormData] = useState({
    firstname: "",
    lastname: "hi",
    gender: "female",
    subject: ['maths'],
    location: "Hyd"
  });

  const handlerchange = (e) => {
    if (e.target.name === 'subject') {
      let copy = { ...formdata };
      if (e.target.checked) {
        copy.subject.push(e.target.value);
      } else {
        copy.subject = copy.subject.filter(ev => ev !== e.target.value);
      }
      setFormData(copy);
    } else {
      setFormData(() => ({
        ...formdata,
        [e.target.name]: e.target.value
      }));
    }
  };

  return (
    <form className="form-container">
      <label className="form-label">Firstname:</label>
      <input
        type="text"
        onChange={handlerchange}
        name="firstname"
        value={formdata.firstname}
        className="form-input"
      />
      <br />
      <label className="form-label">Lastname:</label>
      <input
        type="text"
        onChange={handlerchange}
        name="lastname"
        value={formdata.lastname}
        className="form-input"
      />
      <br />
      <label className="form-label">Gender:</label>
      <input
        type="radio"
        name="gender"
        onChange={handlerchange}
        value="Female"
        checked={formdata.gender === "Female"}
        className="form-radio"
        required
      />
      <label className="form-radio-label">Female</label>
      <input
        type="radio"
        name="gender"
        onChange={handlerchange}
        value="Male"
        checked={formdata.gender === "Male"}
        className="form-radio"
      />
      <label className="form-radio-label">Male</label>
      <br />
      <label className="form-label">Subject:</label>
      <input
        type="checkbox"
        name="subject"
        onChange={handlerchange}
        value="maths"
        checked={formdata.subject.includes("maths")}
        className="form-checkbox"
      />
      <label className="form-checkbox-label">Maths</label>
      <input
        type="checkbox"
        name="subject"
        onChange={handlerchange}
        value="science"
        checked={formdata.subject.includes("science")}
        className="form-checkbox"
      />
      <label className="form-checkbox-label">Science</label>
      <br />
      <label className="form-label">Location:</label>
      <select onChange={handlerchange} name="location" className="form-select">
        <option value="Hyd">Hyd</option>
        <option value="kerala">Kerala</option>
      </select>
      <br />
      <button type="button" onClick={() => console.log(formdata)} className="form-button">
        Submit
      </button>
    </form>
  );
}

export default App;
