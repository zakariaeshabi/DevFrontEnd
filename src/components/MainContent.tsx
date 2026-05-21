import { memo } from 'react';

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
    <main className="main">
      <div className="board">
        {columns.map(col => (
          <section key={col.id} className="column">
            <h3 className="colTitle">
              {col.title} <span className="count">({col.tasks.length})</span>
            </h3>
            <div className="cards">
              {col.tasks.map((task, i) => (
                <div key={i} className="card">
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
