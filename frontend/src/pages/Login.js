import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import CharacterListing from "./characterListing";

function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    console.log(e.target.name);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    if (isSignup) {
      if (
        formData.name !== "" &&
        formData.email !== "" &&
        formData.password !== ""
      ) {
        axios
          .post("http://localhost:8000/signup", formData)
          .then(function (response) {
            setIsSignup(false);
            setFormData({
              name: "",
              email: "",
              password: "",
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    } else {
      if (formData.email !== "" && formData.password !== "") {
        axios
          .post("http://localhost:8000/login", formData)
          .then(function (response) {
            navigate("/characterListing");
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        console.log("login get out");
      }
    }
  };
  return (
    <div
      style={{
        width: "300px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        textAlign: "center",
      }}
    >
      <h2>{isSignup ? "Sign Up" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        {isSignup && (
          <input
            type="text"
            name="name"
            placeholder="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              display: "block",
              width: "100%",
              margin: "10px 0",
              padding: "8px",
            }}
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{
            display: "block",
            width: "100%",
            margin: "10px 0",
            padding: "8px",
          }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{
            display: "block",
            width: "100%",
            margin: "10px 0",
            padding: "8px",
          }}
        />
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px",
            cursor: "pointer",
          }}
        >
          {isSignup ? "Sign Up" : "Login"}
        </button>
      </form>
      <p
        style={{ marginTop: "10px", cursor: "pointer", color: "blue" }}
        onClick={() => setIsSignup(!isSignup)}
      >
        {isSignup
          ? "Already have an account? Login"
          : "Don't have an account? Sign Up"}
      </p>
    </div>
  );
}

export default Login;
