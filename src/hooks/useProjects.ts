import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import api from '../api/axios';
import type { Project } from '../components/Sidebar';
import type { Column } from '../components/MainContent';

export default function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [projRes, colRes] = await Promise.all([api.get<Project[]>('/projects'), api.get<Column[]>('/columns')]);
        setProjects(projRes.data);
        setColumns(colRes.data);
      } catch {
        setError('Erreur chargement');
      } finally {
        setLoading(false);
      }
    }

    void fetchData();
  }, []);

  const addProject = useCallback(async (name: string, color: string) => {
    setError(null);
    try {
      const { data } = await api.post<Project>('/projects', { name, color });
      setProjects(prev => [...prev, data]);
      return data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(`Erreur: ${err.response?.status ?? 'serveur'}`);
      } else {
        setError('Erreur inconnue');
      }
      return null;
    }
  }, []);

  const renameProject = useCallback(async (project: Project) => {
    const newName = prompt('Nouveau nom :', project.name)?.trim();
    if (!newName || newName === project.name) return null;

    setError(null);
    try {
      const { data } = await api.put<Project>(`/projects/${project.id}`, {
        ...project,
        name: newName,
      });
      setProjects(prev => prev.map(p => (p.id === data.id ? data : p)));
      return data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(`Erreur: ${err.response?.status ?? 'serveur'}`);
      } else {
        setError('Erreur inconnue');
      }
      return null;
    }
  }, []);

  const deleteProject = useCallback(async (id: string) => {
    if (!confirm('Êtes-vous sûr ?')) return false;

    setError(null);
    try {
      await api.delete(`/projects/${id}`);
      setProjects(prev => prev.filter(p => p.id !== id));
      return true;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(`Erreur: ${err.response?.status ?? 'serveur'}`);
      } else {
        setError('Erreur inconnue');
      }
      return false;
    }
  }, []);

  return { projects, columns, loading, error, addProject, renameProject, deleteProject };
}
