import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  //const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");
  const [date, setDate] = useState("");
  const [_id, set_id] = useState("");
  //const [refresh, setRefresh] = useState(true);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: null,
  });
  async function fetchEmployees() {
    try {
      const response = await axios.get(
        "http://localhost:3001/employee/getEmployees"
      );
      setEmployees(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    async function fetchEmployees() {
      try {
        const response = await axios.get(
          "http://localhost:3001/employee/getEmployees"
        );
        setEmployees(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchEmployees();
  }, []);

  //console.log("out of use effect", employees);
  const addNewEmployee = (e) => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setSalary("");
    setDate("");
    setIsAdding(true);
  };

  const handleEdit = (event, _id) => {
    event.preventDefault();
    set_id(_id);
    const [employee] = employees.filter((employee) => employee._id === _id);
    //setSelectedEmployee(employee);
    setFirstName(employee.firstName);
    setLastName(employee.lastName);
    setEmail(employee.email);
    setSalary(employee.salary);
    setDate(employee.date);
    set_id(employee._id);
    setIsEditing(true);
  };

  const handleDelete = (event, _id) => {
    event.preventDefault();
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.value) {
        axios
          .post("http://localhost:3001/employee/delete", { _id })
          .then((response) => {
            console.log("employee deleted");
            fetchEmployees();
          })
          .catch((error) => {
            console.log(error);
          });

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: `${firstName} ${lastName}'s data has been deleted.`,
          //text: "data has been deleted.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !salary || !date) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }

    axios
      .post("http://localhost:3001/employee/edit", {
        _id,
        firstName,
        lastName,
        email,
        salary,
        date,
      })
      .then((response) => {
        console.log("data updated");
        fetchEmployees();
      })
      .catch((error) => {
        console.log(error);
      });
    //setEmployees(employees);
    setIsEditing(false);

    Swal.fire({
      icon: "success",
      title: "Updated!",
      text: `${firstName} ${lastName}'s data has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleAdd = (event) => {
    event.preventDefault();
    if (!firstName || !lastName || !email || !salary || !date) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }
    axios
      .post("http://localhost:3001/employee/addEmployee", {
        firstName,
        lastName,
        email,
        salary,
        date,
      })
      .then((response) => {
        console.log("successfully employee added");
        fetchEmployees();
      })
      .catch((error) => {
        console.log(error);
      });
    setIsAdding(false);
    Swal.fire({
      icon: "success",
      title: "Updated!",
      text: `${firstName} ${lastName}'s has been added.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="container">
      {/* List */}
      {!isAdding && !isEditing && (
        <>
          <header>
            <h1>Employee Management System</h1>
            <div style={{ marginTop: "30px", marginBottom: "18px" }}>
              <button onClick={addNewEmployee} className="round-button">
                Add Employee
              </button>
            </div>
          </header>

          <div className="contain-table">
            <table className="striped-table">
              <thead>
                <tr>
                  <th>SNo.</th>
                  <th>FirstName</th>
                  <th>LastName</th>
                  <th>Email</th>
                  <th>Salary</th>
                  <th>Created at</th>
                  <th colSpan={2} className="text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {employees.length > 0 ? (
                  employees.map((employee, i) => (
                    <tr key={employee._id}>
                      <td>{i + 1}</td>
                      <td>{employee.firstName}</td>
                      <td>{employee.lastName}</td>
                      <td>{employee.email}</td>
                      <td>{formatter.format(employee.salary)}</td>
                      <td>{employee.date} </td>
                      <td className="text-right">
                        <button
                          onClick={(event) => handleEdit(event, employee._id)}
                          className="button muted-button"
                        >
                          Edit
                        </button>
                      </td>
                      <td className="text-left">
                        <button
                          onClick={(event) => handleDelete(event, employee._id)}
                          className="button muted-button"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7}>No Employees</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
      {/* Add */}
      {isAdding && (
        <div className="small-container">
          <form onSubmit={handleAdd}>
            <h1>Add Employee</h1>
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              type="text"
              //ref={textInput}
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="salary">Salary ($)</label>
            <input
              id="salary"
              type="number"
              name="salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
            <label htmlFor="date">Date</label>
            <input
              id="date"
              type="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <div style={{ marginTop: "30px" }}>
              <input type="submit" value="Add" />
              <input
                style={{ marginLeft: "12px" }}
                className="muted-button"
                type="button"
                value="Cancel"
                onClick={() => setIsAdding(false)}
              />
            </div>
          </form>
        </div>
      )}
      {/* Edit */}
      {isEditing && (
        <div className="small-container">
          <form onSubmit={(e) => handleUpdate(e)}>
            <h1>Edit Employee</h1>
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="salary">Salary ($)</label>
            <input
              id="salary"
              type="number"
              name="salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
            <label htmlFor="date">Date</label>
            <input
              id="date"
              type="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <div style={{ marginTop: "30px" }}>
              <input type="submit" value="Update" />
              <input
                style={{ marginLeft: "12px" }}
                className="muted-button"
                type="button"
                value="Cancel"
                onClick={() => setIsEditing(false)}
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
