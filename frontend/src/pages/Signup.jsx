import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const styles = {
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 15px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#333",
    color: "white",
    cursor: "pointer",
  },
  loginPrompt: {
    marginTop: "10px",
    textAlign: "center",
  },
  loginButton: {
    background: "none",
    border: "none",
    color: "#333",
    textDecoration: "underline",
    cursor: "pointer",
  },
  main: {
    backgroundImage:
      'url("https://web-champions-reimagine-round1.vercel.app/assests/images/nike%20green%20shoe.jpg")',
    width: "100vw",
    height: "100vh",
    alignItems: "center",
    paddingLeft: "5%",
    paddingTop: "10%",
  },
};

function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geoLocation: "",
  });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_URL}/api/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geoLocation,
      }),
    });
    console.log("response aa gyi");

    const json = await response.json();
    if (json.success) {
      toast("SignUp Successful, redirecting to login page.");
      navigate("/login");
    }

    if (!json.success) {
      toast.info("Enter Valid Credentials");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  return (
    <div style={styles.main}>
      <div style={styles.container}>
        <h2>Signup</h2>
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label htmlFor="username">Name</label>
            <input
              type="text"
              id="username"
              name="name"
              style={styles.input}
              value={credentials.name}
              onChange={onChange}
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              style={styles.input}
              value={credentials.email}
              onChange={onChange}
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              style={styles.input}
              value={credentials.password}
              onChange={onChange}
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="geoLocation"
              style={styles.input}
              value={credentials.geoLocation}
              onChange={onChange}
            />
          </div>
          <button type="submit" style={styles.button}>
            Signup
          </button>
          <p style={styles.loginPrompt}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "black" }}>
                Login
              </Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;
