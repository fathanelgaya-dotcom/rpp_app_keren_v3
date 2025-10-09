import React, { useState } from 'react';
import axios from 'axios';
import logo from './logo.png';

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

const COLORS = {
  black:'#0b0b0b', red:'#d9534f', green:'#5cb85c',
  blue:'#337ab7', purple:'#6f42c1'
};

export default function App() {
  const [theme, setTheme] = useState('purple');
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
  const [user, setUser] = useState(null);
  const [loginForm, setLoginForm] = useState({ username:'', password:'' });
  const [registerForm, setRegisterForm] = useState({ username:'', password:'' });

  const onChange = (k,v) => setForm(prev => ({ ...prev, [k]:v }));

  const register = async () => {
    try {
      const r = await axios.post('http://localhost:4000/api/register', registerForm);
      setInfo(r.data.ok ? `Register sukses: ${r.data.user.username}` : `Register gagal: ${r.data.error}`);
    } catch(e) { setInfo('Register error: ' + e.message); }
  };

  const login = async () => {
    try {
      const r = await axios.post('http://localhost:4000/api/login', loginForm);
      if (r.data.ok) {
        setUser(r.data.user);
        setGenerateCount(r.data.user.generate_count || 0);
        setInfo(`Login sukses: ${r.data.user.username}`);
      } else setInfo(`Login gagal: ${r.data.error}`);
    } catch(e) { setInfo('Login error: ' + e.message); }
  };

  const generate = async () => {
    if (!user) return setInfo('Login dulu sebelum generate.');
    setInfo('Menghubungi server untuk generate RPP...');
    try {
      const payload = { ...form, userId: user.id };
      const r = await axios.post('http://localhost:4000/api/generate-rpp', payload);
      if (r.data.ok) {
        setPreview(r.data.data);
        setGenerateCount(generateCount + 1);
        setInfo('Berhasil generate.');
      } else setInfo('Gagal generate: ' + (r.data.error || 'unknown'));
    } catch(e) { setInfo('Error: ' + e.message); }
  };

  const downloadWord = async () => {
    if (!preview) return setInfo('Belum ada RPP untuk diunduh.');
    setInfo('Mempersiapkan dokumen Word...');
    try {
      const r = await axios.post('http://localhost:4000/api/export-word', preview, { responseType: 'blob' });
      const blob = new Blob([r.data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'RPP_Integrasi_App.docx';
      a.click();
      URL.revokeObjectURL(url);
      setInfo('Download dimulai.');
    } catch(e) { setInfo('Gagal download: ' + e.message); }
  };

  // 🟩 Fungsi render Word-like RPP
  const renderRPP = (rpp) => (
    <div style={{ lineHeight:1.7, color:'black' }}>
      <h2 style={{ textAlign:'center', textDecoration:'underline' }}>Rencana Pelaksanaan Pembelajaran (RPP)</h2>

      {/* IDENTITAS */}
      <table style={{width:'100%', borderCollapse:'collapse', marginBottom:'10px'}}>
        <tbody>
          {Object.entries(rpp.identitas || {}).map(([k,v])=>(
            <tr key={k}><td><b>{k.replaceAll('_',' ')}</b></td><td>{v}</td></tr>
          ))}
        </tbody>
      </table>

      <h4>Capaian Pembelajaran:</h4><p>{rpp.capaian_pembelajaran}</p>
      <h4>Tujuan Pembelajaran:</h4>
      <ul>{rpp.tujuan_pembelajaran?.map((t,i)=><li key={i}>{t}</li>)}</ul>

      <h4>Indikator Tujuan Pembelajaran:</h4>
      <ul>{rpp.indikator_tujuan_pembelajaran?.map((t,i)=><li key={i}>{t}</li>)}</ul>

      <h4>Materi Insersi KBC:</h4><p>{rpp.materi_insersi_KBC}</p>

      <h4>Praktek Pedagogik:</h4><p>{rpp.praktek_pedagogik?.model}</p>

      <h4>Lingkungan Pembelajaran:</h4>
      <ul>{rpp.lingkungan_pembelajaran?.map((x,i)=><li key={i}>{x}</li>)}</ul>

      <h4>Mitra Pembelajaran:</h4>
      <ul>{rpp.mitra_pembelajaran?.map((x,i)=><li key={i}>{x}</li>)}</ul>

      <h4>Pemanfaatan Digital:</h4>
      <ul>{rpp.pemanfaatan_digital?.map((x,i)=><li key={i}>{x}</li>)}</ul>

      <h4>Langkah Pembelajaran:</h4>
      <div style={{ marginLeft: "10px", lineHeight: 1.7 }}>
        {rpp.langkah_pembelajaran?.map((x, i) => {
          // Jika baris diawali **, tampilkan sebagai subjudul tebal (tanpa bullet)
          if (x.startsWith("**")) {
            return (
              <div
                key={i}
                style={{
                  fontWeight: "bold",
                  marginTop: "10px",
                  marginBottom: "5px",
                  textIndent: "0px",
                }}
              >
                {x.replace(/\*\*/g, "")}
              </div>
          );
        }

          // Jika baris biasa, tampilkan dengan bullet
          return (
            <div
              key={i}
              style={{
                marginLeft: "20px",
                textIndent: "-10px",
                paddingLeft: "20px",
             }}
            >
              • {x}
            </div>
          );
        })}
      </div>

      <h4>Pengalaman Murid:</h4>
      <ul>{Object.entries(rpp.pengalaman_murid || {}).map(([k,v])=> <li key={k}><b>{k}</b>: {v}</li>)}</ul>

      <h4>Asesmen Formatif:</h4>
      <div style={{ marginLeft: "10px" }}>
        {Object.entries(rpp.asesmen_formatif || {}).map(([k, v]) => (
          <div key={k} style={{ marginBottom: "10px" }}>
            <b>{k.replaceAll('_', ' ')}</b>:
            {Array.isArray(v) ? (
              <ol style={{ marginTop: "5px", marginLeft: "20px" }}>
                {v.map((item, i) => (
                <li key={i}>{item}</li>
                ))}
              </ol>
            ) : (
              <p style={{ marginLeft: "10px" }}>{v}</p>
            )}
          </div>
        ))}
      </div>

      <h4>Rubrik Penilaian:</h4>
      <p>Skala: {rpp.rubrik_penilaian?.skala}</p>
      <ul>{Object.entries(rpp.rubrik_penilaian?.kriteria || {}).map(([k,v])=> <li key={k}><b>{k}</b>: {v}</li>)}</ul>

      <h4>Lembar Kerja:</h4>
      <p><b>Tujuan:</b> {rpp.lembar_kerja?.tujuan}</p>
      <p><b>Tugas:</b> {rpp.lembar_kerja?.tugas}</p>
      <p><b>Urutan Kerja:</b> {rpp.lembar_kerja?.urutan_kerja}</p>
      <p><b>Rubrik:</b> {rpp.lembar_kerja?.rubrik}</p>
    </div>
  );

  return (
    <div className="app" style={{ background:`linear-gradient(135deg, ${COLORS[theme]} 0%, #2f2b5a 100%)` }}>
      <header className="header">
        <div className="header-left"><img src={logo} alt="logo" className="logo" /></div>
        <div className="header-center">
          <h1>APLIKASI PEMBUAT RPP</h1>
          <h2>Integrasi Deep Learning dan KBC</h2>
          <p>Pengawas Keren</p>
        </div>
      </header>

      <div className="info-banner">Aplikasi ini dibuat oleh Pengawas Keren Youtube Channel ©2025 WA 087866174274</div>

      {/* LOGIN */}
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

      <div className="form-preview">
        {/* FORM INPUT */}
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
              {PROFILE_OPTIONS.map(p=> <option key={p} value={p}>{p}</option>)}
            </select>
          </label>
          <label>Topik KBC
            <select value={form.topikKBC} onChange={e=>onChange('topikKBC', e.target.value)}>
              {TOPIK_KBC.map(p=> <option key={p} value={p}>{p}</option>)}
            </select>
          </label>
          <label>Praktek Pedagogik
            <select value={form.praktekPedagogik} onChange={e=>onChange('praktekPedagogik', e.target.value)}>
              {PEDAGOGIK_OPTIONS.map(p=> <option key={p} value={p}>{p}</option>)}
            </select>
          </label>
        </div>

        {/* PREVIEW */}
        <div className="preview-col">
          <h3>Preview RPP</h3>
          <div className="preview-box" style={{ background:'white', padding:'20px', borderRadius:'10px', boxShadow:'0 0 10px rgba(0,0,0,0.2)' }}>
            {preview ? renderRPP(preview) : <p>Hasil RPP akan muncul di sini setelah klik “Buat RPP”.</p>}
          </div>
        </div>
      </div>

      {user && (
        <div className="bottom-row">
          <div className="info-box">Info: {info} | Jumlah generate: {generateCount}</div>
          <div><button onClick={generate}>Buat RPP</button><button onClick={downloadWord}>Download Word</button></div>
        </div>
      )}

      <div className="color-row">
        {Object.keys(COLORS).map(c=><button key={c} style={{background:COLORS[c]}} onClick={()=>setTheme(c)} title={c}></button>)}
      </div>
    </div>
  );
}
