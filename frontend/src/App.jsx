import React, { useState } from "react";
import axios from "axios";
import "./style.css";
import logo from "./logo/logo.png";

// ✅ base URL otomatis ambil dari .env (Vercel), fallback ke localhost saat dev
const API_BASE = (import.meta.env.VITE_API_URL || "http://localhost:4000").replace(/\/$/, "");

function App() {
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [registerForm, setRegisterForm] = useState({ username: "", password: "" });
  const [isRegister, setIsRegister] = useState(false);
  const [preview, setPreview] = useState(null);
  const [payload, setPayload] = useState({ namaGuru: "", mataPelajaran: "", kelas: "", materi: "" });

  // ---------- LOGIN ----------
  const handleLogin = async () => {
    try {
      const r = await axios.post(`${API_BASE}/api/login`, loginForm);
      alert("Login berhasil ✅");
      console.log(r.data);
    } catch (err) {
      alert("Login gagal ❌");
      console.error(err);
    }
  };

  // ---------- REGISTER ----------
  const handleRegister = async () => {
    try {
      const r = await axios.post(`${API_BASE}/api/register`, registerForm);
      alert("Registrasi berhasil ✅");
      console.log(r.data);
    } catch (err) {
      alert("Registrasi gagal ❌");
      console.error(err);
    }
  };

  // ---------- GENERATE RPP ----------
  const handleGenerateRPP = async () => {
    try {
      const r = await axios.post(`${API_BASE}/api/generate-rpp`, payload);
      setPreview(r.data);
      alert("RPP berhasil dibuat ✅");
      console.log(r.data);
    } catch (err) {
      alert("Gagal membuat RPP ❌");
      console.error(err);
    }
  };

  // ---------- EXPORT WORD ----------
  const handleExportWord = async () => {
    try {
      const r = await axios.post(`${API_BASE}/api/export-word`, preview, { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([r.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "RPP.docx");
      document.body.appendChild(link);
      link.click();
      alert("Berhasil diexport ke Word ✅");
    } catch (err) {
      alert("Export Word gagal ❌");
      console.error(err);
    }
  };

  return (
    <div className="app-container">
      <img src={logo} alt="Logo" className="logo" />
      <h1>📘 Aplikasi RPP Keren</h1>

      {/* Toggle Login/Register */}
      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "Sudah punya akun? Login" : "Belum punya akun? Register"}
      </button>

      {/* LOGIN FORM */}
      {!isRegister && (
        <div className="card">
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={loginForm.username}
            onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={loginForm.password}
            onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}

      {/* REGISTER FORM */}
      {isRegister && (
        <div className="card">
          <h2>Register</h2>
          <input
            type="text"
            placeholder="Username"
            value={registerForm.username}
            onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={registerForm.password}
            onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
          />
          <button onClick={handleRegister}>Daftar</button>
        </div>
      )}

      {/* FORM RPP */}
      <div className="card">
        <h2>Generate RPP</h2>
        <input
          type="text"
          placeholder="Nama Guru"
          value={payload.namaGuru}
          onChange={(e) => setPayload({ ...payload, namaGuru: e.target.value })}
        />
        <input
          type="text"
          placeholder="Mata Pelajaran"
          value={payload.mataPelajaran}
          onChange={(e) => setPayload({ ...payload, mataPelajaran: e.target.value })}
        />
        <input
          type="text"
          placeholder="Kelas"
          value={payload.kelas}
          onChange={(e) => setPayload({ ...payload, kelas: e.target.value })}
        />
        <input
          type="text"
          placeholder="Materi"
          value={payload.materi}
          onChange={(e) => setPayload({ ...payload, materi: e.target.value })}
        />
        <button onClick={handleGenerateRPP}>Generate</button>
      </div>

      {/* PREVIEW RPP */}
      {preview && (
        <div className="preview-card">
          <h2>📄 Preview RPP</h2>
          <pre>{JSON.stringify(preview, null, 2)}</pre>
          <button onClick={handleExportWord}>Export ke Word</button>
        </div>
      )}
    </div>
  );
}

export default App;
