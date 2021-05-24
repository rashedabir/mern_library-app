import React, { useState } from "react";
import axios from "axios";
import ErrorNotice from "../../misc/ErrorNotice";

export default function Contact() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [subject, setSubject] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const newContact = { firstName, lastName, subject };
      await axios.post("http://localhost:5000/public/contact", newContact);
      alert("Your Data Saved..");
    } catch (error) {
      error.response.data.msg && setError(error.response.data.msg);
    }
  };

  return (
    <div>
      <div className="error-page">
        {error && (
          <ErrorNotice message={error} clearError={() => setError(undefined)} />
        )}
      </div>
      <div class="container">
        <form onSubmit={submit}>
          <label for="fname">First Name</label>
          <input
            type="text"
            id="fname"
            name="firstname"
            placeholder="Your name.."
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label for="lname">Last Name</label>
          <input
            type="text"
            id="lname"
            name="lastname"
            placeholder="Your last name.."
            onChange={(e) => setLastName(e.target.value)}
          />

          <label for="subject">Subject</label>
          <textarea
            id="subject"
            name="subject"
            placeholder="Write something.."
            style={{ height: "200px" }}
            onChange={(e) => setSubject(e.target.value)}
          ></textarea>

          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}
