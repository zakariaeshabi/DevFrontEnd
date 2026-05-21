import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';
import Header from '../components/Header';
import { logout } from '../features/auth/authSlice';
import type { RootState } from '../store';
import styles from './ProjectDetail.module.css';

interface Project {
  id: string;
  name: string;
  color: string;
}

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/projects/${id}`)
      .then(res => setProject(res.data))
      .catch(() => navigate('/dashboard', { replace: true }))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) return <div className={styles.loading}>Chargement...</div>;
  if (!project) return null;

  return (
    <div className={styles.layout}>
      <Header
        title="TaskFlow"
        onMenuClick={() => navigate('/dashboard')}
        userName={user?.name}
        onLogout={() => {
          dispatch(logout());
          navigate('/login', { replace: true });
        }}
      />

      <main className={styles.main}>
        <div className={styles.header}>
          <span className={styles.dot} style={{ background: project.color }} />
          <h2>{project.name}</h2>
        </div>
        <p className={styles.info}>Projet ID: {project.id}</p>
      </main>
    </div>
  );
}
