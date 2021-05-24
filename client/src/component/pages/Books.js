import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import axios from "axios";
import ErrorNotice from "../../misc/ErrorNotice";

export default function Books() {
  const { userData } = useContext(UserContext);
  const history = useHistory();

  const [book, setBook] = useState([]);

  const delUrl = "http://localhost:5000/book/deletebook";

  const removeData = (_id) => {
    axios.get(`${delUrl}/${_id}`).then((res) => {
      const del = book.filter((book) => _id !== book.id);
      setBook(del);
    });

    getData();
  };

  const getData = async () => {
    const url = "http://localhost:5000/book/bookdata";
    const response = await axios.get(url);
    setBook(response.data);
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
      "book name",
      "code",
      "date",
      "category",
      "author email",
      "price",
      "operation",
    ];

    return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };

  const renderBody = () => {
    return (
      book &&
      book.map(({ _id, name, code, date, category, email, price }) => {
        return (
          <tr key={_id}>
            <td>{_id}</td>
            <td>{name}</td>
            <td>{code}</td>
            <td>{date}</td>
            <td>{category}</td>
            <td>{email}</td>
            <td>{price}</td>
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
  const [code, setCode] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [email, setEmail] = useState("");
  const [price, setPrice] = useState("");

  const [error, setError] = useState("");

  const submit = async (e) => {
    try {
      e.preventDefault();
      const newBook = { name, code, date, category, email, price };
      await axios.post("http://localhost:5000/book/add", newBook);
      getData();
    } catch (error) {
      error.response.data.msg && setError(error.response.data.msg);
    }
  };

  return (
    <div className="author-table">
      <div>
        <h1 id="title">Books</h1>
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
          Add Book
        </button>
        <div className={`modalBackground modalShowing-${modal}`}>
          <div className="modalInner">
            <form>
              <div class="form-row">
                <div class="col">
                  <label for="exampleInputEmail1">Book Name</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Book Name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="col">
                  <label for="exampleInputEmail1">Book Code</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Book Code"
                    onChange={(e) => setCode(e.target.value)}
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="col">
                  <label for="exampleInputEmail1">Date</label>
                  <input
                    type="date"
                    class="form-control"
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="col">
                  <label for="exampleInputEmail1">Author Email</label>
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
                  <label for="exampleInputEmail1">Category</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Category"
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="col">
                  <label for="exampleInputEmail1">Price</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Price"
                    onChange={(e) => setPrice(e.target.value)}
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
