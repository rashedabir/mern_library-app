import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import axios from "axios";
import ErrorNotice from "../../misc/ErrorNotice";

export default function Members() {
  const { userData } = useContext(UserContext);
  const history = useHistory();

  const [member, setMember] = useState([]);

  const delUrl = "http://localhost:5000/member/deletemember";

  const removeData = (_id) => {
    axios.get(`${delUrl}/${_id}`).then((res) => {
      const del = member.filter((member) => _id !== member.id);
      setMember(del);
    });

    getData();
  };

  const getData = async () => {
    const url = "http://localhost:5000/member/memberdata";
    const response = await axios.get(url);
    setMember(response.data);
  };

  useEffect(() => {
    if (!userData.user) {
      history.push("/login");
    }
    getData();
  }, [history, userData.user]);

  const renderHeader = () => {
    let headerElement = [
      "_id",
      "name",
      "student Id",
      "dob",
      "gender",
      "phone",
      "type",
      "email",
      "address",
      "operation",
    ];

    return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };

  const renderBody = () => {
    return (
      member &&
      member.map(
        ({ _id, name, studentId, dob, gender, phone, type, email, address }) => {
          return (
            <tr key={_id}>
              <td>{_id}</td>
              <td>{name}</td>
              <td>{studentId}</td>
              <td>{dob}</td>
              <td>{gender}</td>
              <td>{phone}</td>
              <td>{type}</td>
              <td>{email}</td>
              <td>{address}</td>
              <td className="opration">
                <button onClick={() => removeData(_id)}>Delete</button>
              </td>
            </tr>
          );
        }
      )
    );
  };

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("Student");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const [error, setError] = useState("");

  const submit = async (e) => {
    try {
      e.preventDefault();
      const newMember = { name, studentId, dob, gender, phone, type, email, address };
      await axios.post("http://localhost:5000/member/insert", newMember);
      getData();
    } catch (error) {
      error.response.data.msg && setError(error.response.data.msg);
    }
  };

  return (
    <div className="author-table">
      <div>
        <h1 id="title">Members</h1>
        <input
          style={{ marginLeft: "15px", width: "250px" }}
          placeholder="Search"
          class="form-control"
        />
        <button
          className="btn btn-primary"
          style={{ float: "right", marginRight: "15px", marginBottom: "10px" }}
          onClick={() => toggleModal()}
        >
          Add Member
        </button>
        <div className={`modalBackground modalShowing-${modal}`}>
          <div className="modalInner">
            <form>
              <div class="form-row">
                <div class="col">
                  <label for="exampleInputEmail1">Member Name</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Member Name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="col">
                  <label for="exampleInputEmail1">Student ID</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Student ID"
                    onChange={(e) => setStudentId(e.target.value)}
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="col">
                  <label for="exampleInputEmail1">D.O.B.</label>
                  <input
                    type="date"
                    class="form-control"
                    onChange={(e) => setDob(e.target.value)}
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="sel1">Gender</label>
                <select class="form-control" id="sel1" onChange={(e) => setGender(e.target.value)}>
                  <option>Select</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <div class="form-row">
                <div class="col">
                  <label for="exampleInputEmail1">Email</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Author Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="col">
                  <label for="exampleInputEmail1">Phone</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Phone"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="col">
                  <label for="exampleInputEmail1">Type</label>
                  <input
                    value={type}
                    type="text"
                    class="form-control"
                    onChange={(e) => setType(e.target.value)}
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="col">
                  <label for="exampleInputEmail1">Address</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Address"
                    style={{ height: "100px" }}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>

              <button type="submit" class="btn btn-primary" onClick={submit}>
                Submit
              </button>
            </form>
            <div className="error-page">
              {error && (
                <ErrorNotice
                  message={error}
                  clearError={() => setError(undefined)}
                />
              )}
            </div>
            <button
              className="exitButton"
              onClick={() => {
                toggleModal();
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
      <table id="employee">
        <thead>
          <tr>{renderHeader()}</tr>
        </thead>
        <tbody>{renderBody()}</tbody>
      </table>
    </div>
  );
}
