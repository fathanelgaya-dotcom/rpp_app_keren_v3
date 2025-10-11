import React, { useState } from 'react';
import axios from 'axios';
import './style.css';
import logo from './logo/logo.png';

// Dropdown options
const PROFILE_OPTIONS = [
  'Keimanan dan ketaqwaan kepada Tuhan YME',
  'Kewargaan', 'Kreativitas', 'Kemandirian', 'Komunikasi',
  'Kesehatan', 'Kolaborasi', 'Penalaran Kritis'
];

const TOPIK_KBC = [
  'Cinta Allah dan Rasul-Nya', 'Cinta ilmu', 'Cinta lingkungan',
  'Cinta diri dan sesama', 'Cinta tanah air'
];

const PEDAGOGIK_OPTIONS = [
  'Pembelajaran Mendalam (default)',
  'Problem Based Learning (PBL)',
  'Project Based Learning (PjBL)',
  'Discovery Learning', 'Inquiry Learning',
  'PAIKEM', 'Cooperative Learning',
  'LOK-R (literasi, orientasi, komunikasi, refleksi)'
];

// Theme colors
const COLORS = { black:'#0b0b0b', red:'#d9534f', green:'#5cb85c', blue:'#337ab7', purple:'#6f42c1' };

// Base URL from .env or localhost
const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:4000').replace(/\/$/, '');

export default function App() {
  // ---------------- State ----------------
  const [user, setUser] = useState(null);
  const [loginForm, setLoginForm] = useState({ username:'', password:'' });
  const [registerForm, setRegisterForm] = useState({ username:'', password:'' });
  const [form, setForm] = useState({
    namaMadrasah:'', mataPelajaran:'', fase:'', kelas:'',
    tema:'', tahunAjaran:'', alokasiWaktu:'', cp:'',
    profilLulusan:PROFILE_OPTIONS[0],
    topikKBC:TOPIK_KBC[0],
    praktekPedagogik:PEDAGOGIK_OPTIONS[0]
  });
  const [preview, setPreview] = useState(null);
  const [info, setInfo] = useState('');
  const [generateCount, setGenerateCount] = useState(0);
  const [theme, setTheme] = useState('purple');

  const onChange = (k,v) => setForm(prev => ({ ...prev, [k]:v }));

  // ---------------- Handlers ----------------
  const register = async () => {
    try {
      const r = await axios.post(`${API_BASE}/api/register`, registerForm);
      setInfo(r.data.ok ? `Register sukses: ${r.data.user.username}` : `Register gagal: ${r.data.error}`);
    } catch(e) { setInfo('Register error: ' + e.message); }
  };

  const login = async () => {
    try {
      const r = await axios.post(`${API_BASE}/api/login`, loginForm);
      if(r.data.ok){
        setUser(r.data.user);
        setGenerateCount(r.data.user.generate_count || 0);
        setInfo(`Login sukses: ${r.data.user.username}`);
      } else setInfo(`Login gagal: ${r.data.error}`);
    } catch(e){ setInfo('Login error: '+e.message); }
  };

  const generate = async () => {
    if(!user) return setInfo('Login dulu sebelum generate.');
    setInfo('Menghubungi server untuk generate RPP...');
    try{
      const payload = { ...form, userId:user.id };
      const r = await axios.post(`${API_BASE}/api/generate-rpp`, payload);
      if(r.data.ok){
        setPreview(r.data.data);
        setGenerateCount(generateCount+1);
        setInfo('Berhasil generate.');
      } else setInfo('Gagal generate: '+(r.data.error||'unknown'));
    } catch(e){ setInfo('Error: '+e.message); }
  };

  const downloadWord = async () => {
    if(!preview) return setInfo('Belum ada RPP untuk diunduh.');
    setInfo('Mempersiapkan dokumen Word...');
    try{
      const r = await axios.post(`${API_BASE}/api/export-word`, preview, { responseType:'blob' });
      const blob = new Blob([r.data], { type:'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'RPP_Integrasi_App.docx';
      a.click();
      URL.revokeObjectURL(url);
      setInfo('Download dimulai.');
    } catch(e){ setInfo('Gagal download: '+e.message); }
  };

  // ---------------- Render ----------------
  return (
    <div className="app" style={{ background:`linear-gradient(135deg, ${COLORS[theme]} 0%, #2f2b5a 100%)` }}>
      
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className="header-center">
          <h1>APLIKASI PEMBUAT RPP</h1>
          <h2>Integrasi Deep Learning dan KBC</h2>
          <p>Pengawas Keren</p>
        </div>
      </header>

      <div className="info-banner">
        Aplikasi ini dibuat oleh Pengawas Keren Youtube Channel ©2025 WA 087866174274
      </div>

      {/* Login/Register */}
      {!user && (
        <div className="login-box">
          <div className="register-section">
            <label>User Name<input value={registerForm.username} onChange={e=>setRegisterForm({...registerForm, username:e.target.value})}/></label>
            <label>Password<input type="password" value={registerForm.password} onChange={e=>setRegisterForm({...registerForm, password:e.target.value})}/></label>
            <button onClick={register}>Registrasi</button>
          </div>
          <div className="login-section">
            <label>User Name<input value={loginForm.username} onChange={e=>setLoginForm({...loginForm, username:e.target.value})}/></label>
            <label>Password<input type="password" value={loginForm.password} onChange={e=>setLoginForm({...loginForm, password:e.target.value})}/></label>
            <button onClick={login}>Login</button>
          </div>
        </div>
      )}

      {/* Form + Preview */}
      <div className="form-preview">
        <div className="form-col">
          {Object.entries({
            namaMadrasah:'Nama Madrasah', mataPelajaran:'Mata Pelajaran',
            fase:'Fase', kelas:'Kelas', tahunAjaran:'Tahun Ajaran',
            alokasiWaktu:'Alokasi Waktu', tema:'Tema/Materi'
          }).map(([k,label])=>(
            <label key={k}>{label}<input value={form[k]} onChange={e=>onChange(k,e.target.value)}/></label>
          ))}
          <label>CP<textarea value={form.cp} onChange={e=>onChange('cp', e.target.value)} /></label>
          <label>Profil Lulusan
            <select value={form.profilLulusan} onChange={e=>onChange('profilLulusan', e.target.value)}>
              {PROFILE_OPTIONS.map(p=><option key={p} value={p}>{p}</option>)}
            </select>
          </label>
          <label>Topik KBC
            <select value={form.topikKBC} onChange={e=>onChange('topikKBC', e.target.value)}>
              {TOPIK_KBC.map(p=><option key={p} value={p}>{p}</option>)}
            </select>
          </label>
          <label>Praktek Pedagogik
            <select value={form.praktekPedagogik} onChange={e=>onChange('praktekPedagogik', e.target.value)}>
              {PEDAGOGIK_OPTIONS.map(p=><option key={p} value={p}>{p}</option>)}
            </select>
          </label>
        </div>

        <div className="preview-col">
          <h3>Preview RPP</h3>
          <div className="preview-box">
            {preview ? <pre>{JSON.stringify(preview,null,2)}</pre> : <p>Hasil RPP akan muncul di sini setelah klik “Buat RPP”.</p>}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      {user && (
        <div className="bottom-row">
          <div className="info-box">Info: {info} | Jumlah generate: {generateCount}</div>
          <div>
            <button onClick={generate}>Buat RPP</button>
            <button onClick={downloadWord}>Download Word</button>
          </div>
        </div>
      )}

      {/* Theme */}
      <div className="color-row">
        {Object.keys(COLORS).map(c=><button key={c} style={{background:COLORS[c]}} onClick={()=>setTheme(c)} title={c}></button>)}
     
