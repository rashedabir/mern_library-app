import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import axios from "axios";
import ErrorNotice from "../../misc/ErrorNotice";

export default function Author() {
  const { userData } = useContext(UserContext);
  const history = useHistory();

  const [author, setAuthor] = useState([]);

  const delUrl = "http://localhost:5000/author/deleteauthor";

  const removeData = (_id) => {
    axios.get(`${delUrl}/${_id}`).then((res) => {
      const del = author.filter((author) => _id !== author.id);
      setAuthor(del);
    });

    getData();
  };

  const getData = async () => {
    const url = "http://localhost:5000/author/authordata";
    const response = await axios.get(url);
    setAuthor(response.data);
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
      "email",
      "phone",
      "gender",
      "address",
      "operation",
    ];

    return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };

  const renderBody = () => {
    return (
      author &&
      author.map(({ _id, name, email, phone, gender, address }) => {
        return (
          <tr key={_id}>
            <td>{_id}</td>
            <td>{name}</td>
            <td>{email}</td>
            <td>{phone}</td>
            <td>{gender}</td>
            <td>{address}</td>
            <td className="opration">
              <button onClick={() => removeData(_id)}>Delete</button>
            </td>
          </tr>
        );
      })
    );
  };

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    try {
      e.preventDefault();
      const newAuthor = { name, email, phone, gender, address };
      await axios.post("http://localhost:5000/author/add", newAuthor);
      getData();
    } catch (error) {
      error.response.data.msg && setError(error.response.data.msg);
    }
  };

  return (
    <div className="author-table">
      <div>
        <h1 id="title">Authors</h1>
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
          Add Author
        </button>
        <div className={`modalBackground modalShowing-${modal}`}>
          <div className="modalInner">
            <form>
              <div class="form-row">
                <div class="col">
                  <label for="exampleInputEmail1">Author Name</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Author Name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
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
              <div class="form-group">
                <label for="sel1">Gender</label>
                <select
                  class="form-control"
                  id="sel1"
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option>Select</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
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
