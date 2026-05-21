import { useEffect, useState } from 'react';
import { useAuth } from './features/auth/AuthContext';
import Login from './features/auth/Login';
import Header from './components/Header';
import Sidebar, { Project } from './components/Sidebar';
import MainContent, { Column } from './components/MainContent';
import Tooltip from './components/Tooltip';

export default function App() {
  const { state: authState } = useAuth();

  
  if (!authState.user) {
    return <Login />;
  }

  return <Dashboard />;
}

function Dashboard() {
  const { state: authState, dispatch } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [loading, setLoading] = useState(true);

  
  const [showTooltipDemo, setShowTooltipDemo] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [projRes, colRes] = await Promise.all([
          fetch('http://localhost:4000/projects'),
          fetch('http://localhost:4000/columns'),
        ]);

        const projData: Project[] = await projRes.json();
        const colData: Column[] = await colRes.json();

        setProjects(projData);
        setColumns(colData);
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div style={{ padding: '2rem' }}>Chargement...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header
        title="TaskFlow"
        onMenuClick={() => setSidebarOpen(p => !p)}
        userName={authState.user?.name}
        onLogout={() => dispatch({ type: 'LOGOUT' })}
        tooltipDemoEnabled={showTooltipDemo}
        onToggleTooltipDemo={() => setShowTooltipDemo(v => !v)}
      />

      {showTooltipDemo && <Tooltip />}

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar projects={projects} isOpen={sidebarOpen} />
        <MainContent columns={columns} />
      </div>
    </div>
  );
}
