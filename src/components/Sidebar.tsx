import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';

export interface Project {
  id: string;
  name: string;
  color: string;
}

interface SidebarProps {
  projects: Project[];
  isOpen: boolean;
  onRename?: (project: Project) => void;
  onDelete?: (id: string) => void;
  actionsDisabled?: boolean;
}

function Sidebar({ projects, isOpen, onRename, onDelete, actionsDisabled = false }: SidebarProps) {
  console.log('Sidebar re-render');

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
      <h2 className={styles.title}>Mes Projets</h2>
      <ul className={styles.list}>
        {projects.map(project => (
          <li key={project.id} className={styles.row}>
            <NavLink
              to={`/projects/${project.id}`}
              className={({ isActive }) => `${styles.item} ${isActive ? styles.active : ''}`}
            >
              <span className={styles.dot} style={{ background: project.color }} />
              <span className={styles.name}>{project.name}</span>
            </NavLink>

            {(onRename || onDelete) && (
              <div className={styles.actions}>
                {onRename && (
                  <button
                    type="button"
                    className={styles.actionBtn}
                    onClick={() => onRename(project)}
                    disabled={actionsDisabled}
                    title="Renommer"
                  >
                    ✏️
                  </button>
                )}
                {onDelete && (
                  <button
                    type="button"
                    className={styles.actionBtn}
                    onClick={() => onDelete(project.id)}
                    disabled={actionsDisabled}
                    title="Supprimer"
                  >
                    🗑️
                  </button>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default memo(Sidebar);
