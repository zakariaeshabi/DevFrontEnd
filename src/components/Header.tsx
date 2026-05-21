import styles from './Header.module.css';

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
  userName?: string;
  onLogout?: () => void;
  tooltipDemoEnabled?: boolean;
  onToggleTooltipDemo?: () => void;
}

export default function Header({ title, onMenuClick, userName, onLogout, tooltipDemoEnabled, onToggleTooltipDemo }: HeaderProps) {
  const initials = userName
    ? userName
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map(s => s[0]?.toUpperCase())
        .join('')
    : 'JD';

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button className={styles.menuBtn} onClick={onMenuClick}>☰</button>
        <h1 className={styles.logo}>{title}</h1>
      </div>

      <div className={styles.right}>
        {userName && <span className={styles.userName}>{userName}</span>}
        <span className={styles.avatar} title={userName || 'User'}>{initials}</span>
        {onToggleTooltipDemo && (
          <button
            className={styles.demoBtn}
            onClick={onToggleTooltipDemo}
            aria-pressed={tooltipDemoEnabled ? 'true' : 'false'}
            title="Afficher/Masquer la démo Tooltip"
          >
            {tooltipDemoEnabled ? 'Fermer démo' : 'Démo Tooltip'}
          </button>
        )}
        {onLogout && (
          <button className={styles.logoutBtn} onClick={onLogout}>
            Déconnexion
          </button>
        )}
      </div>
    </header>
  );
}
