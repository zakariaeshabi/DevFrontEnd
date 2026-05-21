import { Link } from 'react-router-dom';
import type { CSSProperties } from 'react';
import HeaderMUI from '../components/HeaderMUI';
import HeaderBS from '../components/HeaderBS';

const sampleUserName = 'Admin TaskFlow';

export default function Tp4Lab() {
  const boxStyle: CSSProperties = {
    background: '#f7f8fa',
    border: '1px solid #e5e7eb',
    borderRadius: 16,
    padding: 16,
  };

  const sectionTitle: CSSProperties = {
    margin: '0 0 12px',
    fontSize: 18,
    fontWeight: 700,
  };

  const linkBtn: CSSProperties = {
    display: 'inline-block',
    padding: '0.65rem 1rem',
    borderRadius: 10,
    textDecoration: 'none',
    background: '#1B8C3E',
    color: 'white',
    fontWeight: 600,
  };

  return (
    <div style={{ minHeight: '100vh', background: 'white' }}>
      <HeaderMUI title="TaskFlow — Démo TP4" onMenuClick={() => {}} userName={sampleUserName} onLogout={() => {}} />

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: 24, display: 'grid', gap: 24 }}>
        <section style={boxStyle}>
          <h1 style={{ margin: 0, fontSize: 30 }}>TP4 — MUI vs Bootstrap & Architecture BDD</h1>
          <p style={{ marginTop: 10, color: '#4b5563', lineHeight: 1.6 }}>
            Cette page rassemble les composants ajoutés pour le TP4 et donne un accès rapide
            aux deux variantes de login.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 16 }}>
            <Link to="/login-mui" style={linkBtn}>Tester Login MUI</Link>
            <Link to="/login-bs" style={linkBtn}>Tester Login Bootstrap</Link>
            <Link to="/dashboard" style={{ ...linkBtn, background: '#0f172a' }}>Retour au dashboard</Link>
          </div>
        </section>

        <section style={boxStyle}>
          <h2 style={sectionTitle}>Aperçu Header MUI</h2>
          <div style={{ border: '1px dashed #cbd5e1', borderRadius: 12, overflow: 'hidden' }}>
            <HeaderMUI title="TaskFlow" onMenuClick={() => {}} userName="Admin" onLogout={() => {}} />
          </div>
        </section>

        <section style={boxStyle}>
          <h2 style={sectionTitle}>Aperçu Header Bootstrap</h2>
          <div style={{ border: '1px dashed #cbd5e1', borderRadius: 12, overflow: 'hidden' }}>
            <HeaderBS title="TaskFlow" onMenuClick={() => {}} userName="Admin" onLogout={() => {}} />
          </div>
        </section>
      </main>
    </div>
  );
}
