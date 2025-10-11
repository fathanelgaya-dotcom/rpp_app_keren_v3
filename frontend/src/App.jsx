import React, { useState } from "react";
import axios from "axios";
import "./style.css";
import logo from "./logo/logo.png";

const COLORS = {
  black:'#0b0b0b', red:'#d9534f', green:'#5cb85c',
  blue:'#337ab7', purple:'#6f42c1'
};

// ✅ Base URL otomatis dari .env atau fallback ke localhost
const API_BASE = (import.meta.env.VITE_API_URL || "http://localhost:4000").replace(/\/$/,"");

export default function App() {
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [registerForm, setRegisterForm] = useState({ username: "", password: "" });
  const [isRegister, setIsRegister] = useState(false);
  const [user, setUser] = useState(null);
  const [preview, setPreview] = useState(null);
  const [payload, setPayload] = useState({ namaGuru: "", mataPelajaran: "", kelas: "", materi: "" });
  const [theme, setTheme] = useState("purple");
  const [info, setInfo] = useState("");

  // ---------- LOGIN ----------
  const handleLogin = async () => {
    try {
      const r = await axios.post(`${API_BASE}/api/login`, loginForm);
      if (r.data.ok) {
        setUser(r.data.user);
        setInfo(`Login sukses: ${r.data.user.username}`);
      } else setInfo(`Login gagal: ${r.data.error}`);
    } catch (err) {
      setInfo("Login error: " + err.message);
      console.error(err);
    }
  };

  // ---------- REGISTER ----------
  const handleRegister = async () => {
    try {
      const r = await axios.post(`${API_BASE}/api/register`, registerForm);
      if (r.data.ok) {
        setInfo(`Register sukses: ${r.data.user.username}`);
      } else setInfo(`Register gagal: ${r.data.error}`);
    } catch (err) {
      setInfo("Register error: " + err.message);
      console.error(err);
    }
  };

  // ---------- GENERATE RPP ----------
  const handleGenerateRPP = async () => {
    if (!user) return setInfo("Login dulu sebelum generate.");
    setInfo("Menghubungi server...");
    try {
      const r = await axios.post(`${API_BASE}/api/generate-rpp`, payload);
      setPreview(r.data);
      setInfo("RPP berhasil dibuat ✅");
    } catch (err) {
      setInfo("Gagal membuat RPP ❌");
      console.error(err);
    }
  };

  // ---------- EXPORT WORD ----------
  const handleExportWord = async () => {
    if (!preview) return setInfo("Belum ada RPP untuk diunduh.");
    setInfo("Mempersiapkan dokumen Word...");
    try {
      const r = await axios.post(`${API_BASE}/api/export-word`, preview, { responseType: "blob" });
      const blob = new Blob([r.data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "RPP.docx";
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      setInfo("Download dimulai ✅");
    } catch (err) {
      setInfo("Export Word gagal ❌");
      console.error(err);
    }
  };

  // ---------- RENDER PREVIEW mirip Word ----------
  const renderRPP = (rpp) => (
    <div className="preview-box">
      <h2>Rencana Pelaksanaan Pembelajaran (RPP)</h2>

      {/* IDENTITAS */}
      <table style={{width:'100%', borderCollapse:'collapse', marginBottom:'10px'}}>
        <tbody>
          {Object.entries(rpp.identitas || {}).map(([k,v])=>(
            <tr key={k}><td><b>{k.replaceAll('_',' ')}</b></td><td>{v}</td></tr>
          ))}
        </tbody>
      </table>

      <h4>Capaian Pembelajaran:</h4>
      <p>{rpp.capaian_pembelajaran}</p>

      <h4>Tujuan Pembelajaran:</h4>
      <ul>{rpp.tujuan_pembelajaran?.map((t,i)=><li key={i}>{t}</li>)}</ul>

      <h4>Indikator Tujuan Pembelajaran:</h4>
      <ul>{rpp.indikator_tujuan_pembelajaran?.map((t,i)=><li key={i}>{t}</li>)}</ul>

      <h4>Materi Insersi KBC:</h4>
      <p>{rpp.materi_insersi_KBC}</p>

      <h4>Praktek Pedagogik:</h4>
      <p>{rpp.praktek_pedagogik?.model}</p>

      <h4>Langkah Pembelajaran:</h4>
      <ol>
        {rpp.langkah_pembelajaran?.map((x,i)=>(
          <li key={i}>{x.startsWith("**") ? <b>{x.replace(/\*\*/g,'')}</b> : x}</li>
        ))}
      </ol>

      <h4>Pengalaman Murid:</h4>
      <ul>
        {Object.entries(rpp.pengalaman_murid || {}).map(([k,v])=> <li key={k}><b>{k}</b>: {v}</li>)}
      </ul>

      <h4>Asesmen Formatif:</h4>
      <ul>
        {Object.entries(rpp.asesmen_formatif || {}).map(([k,v])=>(
          <li key={k}>
            <b>{k.replaceAll('_',' ')}</b>:
            {Array.isArray(v) ? <ol>{v.map((item,i)=><li key={i}>{item}</li>)}</ol> : <span>{v}</span>}
          </li>
        ))}
      </ul>

      <h4>Rubrik Penilaian:</h4>
      <ul>
        <li>Skala: {rpp.rubrik_penilaian?.skala}</li>
        {Object.entries(rpp.rubrik_penilaian?.kriteria || {}).map(([k,v])=> <li key={k}><b>{k}</b>: {v}</li>)}
      </ul>
    </div>
  );

  return (
    <div className="app" style={{ background:`linear-gradient(135deg, ${COLORS[theme]} 0%, #2f2b5a 100%)` }}>
      <header className="header">
        <div className="header-left"><img src={logo} alt="Logo" className="logo" /></div>
        <div className="header-center">
          <h1>APLIKASI RPP Keren</h1>
          <h2>Integrasi Deep Learning dan KBC</h2>
          <p>Pengawas Keren</p>
        </div>
      </header>

      <div className="info-banner">{info || "Aplikasi ini dibuat oleh Pengawas Keren Youtube Channel ©2025"}</div>

      {/* LOGIN / REGISTER */}
      {!user && (
        <div className="login-box">
          {!isRegister && (
            <div>
              <label>Username<input value={loginForm.username} onChange={e=>setLoginForm({...loginForm, username:e.target.value})}/></label>
              <label>Password<input type="password" value={loginForm.password} onChange={e=>setLoginForm({...loginForm, password:e.target.value})}/></label>
              <button onClick={handleLogin}>Login</button>
              <p onClick={()=>setIsRegister(true)} style={{cursor:'pointer'}}>Belum punya akun? Register</p>
            </div>
          )}
          {isRegister && (
            <div>
              <label>Username<input value={registerForm.username} onChange={e=>setRegisterForm({...registerForm, username:e.target.value})}/></label>
              <label>Password<input type="password" value={registerForm.password} onChange={e=>setRegisterForm({...registerForm, password:e.target.value})}/></label>
              <button onClick={handleRegister}>Daftar</button>
              <p onClick={()=>setIsRegister(false)} style={{cursor:'pointer'}}>Sudah punya akun? Login</p>
            </div>
          )}
        </div>
      )}

      {/* FORM & PREVIEW */}
      <div className="form-preview">
        <div className="form-col">
          <label>Nama Guru<input value={payload.namaGuru} onChange={e=>setPayload({...payload,namaGuru:e.target.value})}/></label>
          <label>Mata Pelajaran<input value={payload.mataPelajaran} onChange={e=>setPayload({...payload,mataPelajaran:e.target.value})}/></label>
          <label>Kelas<input value={payload.kelas} onChange={e=>setPayload({...payload,kelas:e.target.value})}/></label>
          <label>Materi<input value={payload.materi} onChange={e=>setPayload({...payload,materi:e.target.value})}/></label>
          <button onClick={handleGenerateRPP}>Generate</button>
        </div>
        <div className="preview-col">
          {preview ? renderRPP(preview) : <p className="preview-box">Hasil RPP akan muncul di sini setelah klik “Generate”.</p>}
          {preview && <button onClick={handleExportWord}>Export ke Word</button>}
        </div>
      </div>

      {/* Theme picker */}
      <div className="color-row">
        {Object.keys(COLORS).map(c => <button key={c} style={{background:COLORS[c]}} onClick={()=>setTheme(c)} title={c}></button>)}
      </div>
    </div>
  );
}
