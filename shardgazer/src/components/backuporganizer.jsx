// src/components/backuporganizer.jsx
import React from 'react';

export default function BackupOrganizer({ tasks }) {
  return (
    <div style={styles.card}>
      <h3 style={styles.title}>⏳ Regional Safety Copy Queue (Data Insurance)</h3>
      <p style={styles.desc}>Lining up duplicate backup workflows across states to assure zero office files get lost during an outage.</p>
      <div style={styles.list}>
        {tasks.map(task => (
          <div key={task.id} style={styles.item}>
            <div style={styles.row}>
              <div>
                <span style={{ 
                  ...styles.priorityBadge, 
                  background: task.priority === 'Critical' ? 'rgba(239, 68, 68, 0.15)' : task.priority === 'High' ? 'rgba(245, 158, 11, 0.15)' : '#334155',
                  color: task.priority === 'Critical' ? '#ef4444' : task.priority === 'High' ? '#f59e0b' : '#94a3b8'
                }}>{task.priority} IMPORTANCE</span>
                <strong style={styles.taskText}>{task.task.replace('Shard', 'Box').replace('Node', 'Desk Location')}</strong>
              </div>
              <span style={{ color: task.status === 'Completed' ? '#10b981' : '#f59e0b', fontSize: '12px', fontWeight: '700' }}>
                {task.status === 'Completed' ? '✓ Safe & Saved' : '⚡ Processing Now'}
              </span>
            </div>
            <div style={styles.metaRow}>
              Scheduled Processing Window: <span style={styles.mono}>{task.timeScheduled}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  card: { background: '#1e293b', border: '1px solid #334155', padding: '20px', borderRadius: '8px' },
  title: { margin: '0 0 4px 0', fontSize: '1.1rem', fontWeight: '700', color: '#f8fafc' },
  desc: { fontSize: '12px', color: '#64748b', margin: '0 0 16px 0' },
  list: { display: 'flex', flexDirection: 'column', gap: '10px' },
  item: { background: '#0f172a', padding: '12px', borderRadius: '6px', border: '1px solid #1e293b' },
  row: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  priorityBadge: { padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: '700', marginRight: '10px' },
  taskText: { fontSize: '13px', color: '#f8fafc' },
  metaRow: { fontSize: '11px', color: '#64748b', marginTop: '6px' },
  mono: { fontFamily: 'monospace', color: '#cbd5e1' }
};