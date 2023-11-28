import React, { useState } from "react";

const Register = () => {
  const [form, setForm] = useState({});
  const handleFormChange = (e) => {
    const input = e.target.name;
    setForm({
      ...form,
      [input]: e.target.value,
    });
  };
  const handleRegister = async () => {
    console.log(form);
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    console.log(data);
  };
  return (
    <div>
      <div>
        <p>Username</p>
        <input
          onChange={handleFormChange}
          name="username"
          placeholder="username"
        />
      </div>
      <div>
        <p>Email</p>
        <input onChange={handleFormChange} name="email" placeholder="email" />
      </div>
      <div>
        <p>Password</p>
        <input
          onChange={handleFormChange}
          name="password"
          placeholder="password"
        />
      </div>
      <div>
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
};

export default Register;
