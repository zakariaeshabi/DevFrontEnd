import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar, { type Project } from '../components/Sidebar';
import MainContent from '../components/MainContent';
import ProjectForm from '../components/ProjectForm';
import useProjects from '../hooks/useProjects';
import { logout } from '../features/auth/authSlice';
import type { RootState } from '../store';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { projects, columns, loading, error, addProject, renameProject, deleteProject } = useProjects();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const handleToggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    navigate('/login', { replace: true });
  }, [dispatch, navigate]);

  const handleAddProject = useCallback(async (name: string, color: string) => {
    const created = await addProject(name, color);
    if (created) {
      setShowForm(false);
    }
  }, [addProject]);

  const handleRename = useCallback(
    async (project: Project) => {
      await renameProject(project);
    },
    [renameProject],
  );

  const handleDelete = useCallback(
    async (id: string) => {
      await deleteProject(id);
    },
    [deleteProject],
  );

  if (loading) return <div className={styles.loading}>Chargement...</div>;

  return (
    <div className={styles.layout}>
      <Header
        title="TaskFlow"
        onMenuClick={handleToggleSidebar}
        userName={user?.name}
        onLogout={handleLogout}
      />

      <div className={styles.body}>
        <Sidebar
          projects={projects}
          isOpen={sidebarOpen}
          onRename={handleRename}
          onDelete={handleDelete}
        />

        <div className={styles.content}>
          <div className={styles.toolbar}>
            {!showForm ? (
              <button className={styles.addBtn} onClick={() => setShowForm(true)}>
                + Nouveau projet
              </button>
            ) : (
              <ProjectForm
                submitLabel="Créer"
                onSubmit={handleAddProject}
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
