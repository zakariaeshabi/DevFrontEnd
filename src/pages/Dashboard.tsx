import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../features/auth/AuthContext';
import api from '../api/axios';
import Header from '../components/Header';
import Sidebar, { type Project } from '../components/Sidebar';
import MainContent, { type Column } from '../components/MainContent';
import ProjectForm from '../components/ProjectForm';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const { state: authState, dispatch } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [projRes, colRes] = await Promise.all([api.get('/projects'), api.get('/columns')]);
        setProjects(projRes.data);
        setColumns(colRes.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || `Erreur ${err.response?.status ?? 'serveur'}`);
        } else {
          setError('Erreur lors du chargement des données');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  async function addProject(name: string, color: string) {
    setSaving(true);
    setError(null);
    try {
      const { data } = await api.post('/projects', { name, color });
      setProjects(prev => [...prev, data]);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || `Erreur ${err.response?.status ?? 'serveur'}`);
      } else {
        setError('Erreur inconnue');
      }
      throw err;
    } finally {
      setSaving(false);
    }
  }

  async function renameProject(project: Project) {
    const newName = prompt('Nouveau nom :', project.name)?.trim();
    if (!newName || newName === project.name) return;

    setSaving(true);
    setError(null);
    try {
      const { data } = await api.put(`/projects/${project.id}`, { ...project, name: newName });
      setProjects(prev => prev.map(p => (p.id === project.id ? data : p)));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || `Erreur ${err.response?.status ?? 'serveur'}`);
      } else {
        setError('Erreur inconnue');
      }
    } finally {
      setSaving(false);
    }
  }

  async function deleteProject(id: string) {
    const confirmed = confirm('Êtes-vous sûr ?');
    if (!confirmed) return;

    setSaving(true);
    setError(null);
    try {
      await api.delete(`/projects/${id}`);
      setProjects(prev => prev.filter(project => project.id !== id));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || `Erreur ${err.response?.status ?? 'serveur'}`);
      } else {
        setError('Erreur inconnue');
      }
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className={styles.loading}>Chargement...</div>;

  return (
    <div className={styles.layout}>
      <Header
        title="TaskFlow"
        onMenuClick={() => setSidebarOpen(prev => !prev)}
        userName={authState.user?.name}
        onLogout={() => dispatch({ type: 'LOGOUT' })}
      />

      <div className={styles.body}>
        <Sidebar
          projects={projects}
          isOpen={sidebarOpen}
          onRename={renameProject}
          onDelete={deleteProject}
          actionsDisabled={saving}
        />

        <div className={styles.content}>
          <div className={styles.toolbar}>
            {!showForm ? (
              <button className={styles.addBtn} onClick={() => setShowForm(true)} disabled={saving}>
                + Nouveau projet
              </button>
            ) : (
              <ProjectForm
                submitLabel={saving ? 'Création...' : 'Créer'}
                onSubmit={async (name, color) => {
                  try {
                    await addProject(name, color);
                    setShowForm(false);
                  } catch {
                    // l'erreur est déjà gérée dans le state
                  }
                }}
                onCancel={() => setShowForm(false)}
              />
            )}
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <MainContent columns={columns} />
        </div>
      </div>
    </div>
  );
}
