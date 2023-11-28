import { useRouter } from "next/router";
import React, { useState } from "react";

const Login = () => {
  const [form, setForm] = useState({});
  const router = useRouter();
  const handleFormChange = (e) => {
    const input = e.target.name;
    setForm({
      ...form,
      [input]: e.target.value,
    });
  };
  const handleLogin = async () => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.status == 200) {
      localStorage.setItem("tina-test", JSON.stringify(data.token));
      alert("LOGIN SUCCESS");
    } else {
      alert(data.message);
    }
  };
  return (
    <div>
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
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;
