import { memo } from 'react';
import styles from './MainContent.module.css';

export interface Column {
  id: string;
  title: string;
  tasks: string[];
}

interface MainContentProps {
  columns: Column[];
}

function MainContent({ columns }: MainContentProps) {
  console.log('MainContent re-render');

  return (
    <main className={styles.main}>
      <div className={styles.board}>
        {columns.map(col => (
          <section key={col.id} className={styles.column}>
            <h3 className={styles.colTitle}>
              {col.title} <span className={styles.count}>({col.tasks.length})</span>
            </h3>
            <div className={styles.cards}>
              {col.tasks.map((task, i) => (
                <div key={i} className={styles.card}>
                  {task}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

export default memo(MainContent);
