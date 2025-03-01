import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://skill-share-c93a.onrender.com/log-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      console.log("here")
      if (!response.ok) {
        console.error("Login failed with status:", response.status);
        alert("Login failed. Please check your credentials.");
        return;
      }

      const data = await response.json();
      console.log("Login response:", data);

      if (data.token) {
        localStorage.setItem("token", data.token);
        console.log("Token saved:", data.token);
        navigate("/home"); // Redirect to SignedIn Parent
      } else {
        console.error("Login failed: No token returned");
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login. Please try again.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f4f4",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          background: "#fff",
          boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
          borderRadius: "8px",
          width: "300px",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Log In</h2>
        <label style={{ marginBottom: "5px" }}>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            padding: "8px",
            marginBottom: "15px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />

        <label style={{ marginBottom: "5px" }}>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            padding: "8px",
            marginBottom: "15px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;