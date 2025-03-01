import React, { useState } from "react";

const SignIn = () => {
  const [formData, setFormData] = useState({
    otp: "",
    username: "",
    email: "",
    password: "",
  });

  const [otpSent, setOtpSent] = useState(false);

  // Handle input change and update state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission to sign in the user
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure OTP is a valid number
    const otpValue = parseInt(formData.otp);
    if (isNaN(otpValue)) {
      alert("Please enter a valid OTP");
      return;
    }

    try {
      const response = await fetch("https://skill-share-c93a.onrender.com/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          otp: otpValue, // Send OTP as a number
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Sign In Successful");
      } else {
        alert(data.message || "Sign In Failed");
      }
    } catch (error) {
      console.error("Error signing in:", error);
      alert("Error signing in");
    }
  };

  // Function to send OTP to the user
  const sendOtp = async () => {
    if (!formData.email) {
      alert("Please enter an email");
      return;
    }
    try {
      const response = await fetch("https://skill-share-c93a.onrender.com/otp-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await response.json();
      if (response.ok) {
        setOtpSent(true);
        alert("OTP sent successfully");
      } else {
        alert(data.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Error sending OTP");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <h2>Sign In</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "300px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      >
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "3px",
          }}
          required
        />
        <button
          type="button"
          onClick={sendOtp}
          style={{
            padding: "8px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "3px",
            cursor: "pointer",
          }}
        >
          Send OTP
        </button>
        {otpSent && (
          <>
            <input
              type="number"
              name="otp"
              placeholder="Enter OTP"
              value={formData.otp}
              onChange={handleChange}
              style={{
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "3px",
              }}
              required
            />
          </>
        )}
        <input
          type="text"
          name="username"
          placeholder="Enter Username"
          value={formData.username}
          onChange={handleChange}
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "3px",
          }}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "3px",
          }}
          required
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "3px",
            cursor: "pointer",
          }}
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;