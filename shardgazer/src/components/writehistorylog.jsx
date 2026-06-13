// src/components/writehistorylog.jsx
import React, { useState } from 'react';

export default function WriteHistoryLog({ initialLogs }) {
  const [logs, setLogs] = useState(initialLogs);

  const handleUndo = (id) => {
    setLogs(logs.filter(log => log.id !== id));
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>📝 Active Order History Log (Security Receipts)</h3>
      <p style={styles.desc}>A listing of file changes saved across the office. If an entry is mistaken, tap the revert button to drop it.</p>
      
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.thRow}>
              <th style={styles.th}>TIME RECEIVED</th>
              <th style={styles.th}>RECEIPT NO.</th>
              <th style={styles.th}>SHELF STORAGE BOX</th>
              <th style={styles.th}>ACTION TAKEN</th>
              <th style={styles.th}>DEPARTMENT FILE PATH</th>
              <th style={styles.thAction}>SAFETY CONTROL</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(log => (
              <tr key={log.id} style={styles.tr}>
                <td style={styles.tdTime}>{log.timestamp}</td>
                <td style={styles.tdId}>{log.id}</td>
                <td style={styles.tdShard}><span style={styles.shardBadge}>Box-{log.shard.replace('shard-', '')}</span></td>
                <td style={styles.td}>
                  <span style={{
                    ...styles.opBadge,
                    color: log.operation === 'INSERT' ? '#10b981' : log.operation === 'UPDATE' ? '#38bdf8' : '#ef4444',
                    background: log.operation === 'INSERT' ? 'rgba(16, 185, 129, 0.1)' : log.operation === 'UPDATE' ? 'rgba(56, 189, 248, 0.1)' : 'rgba(239, 68, 68, 0.1)'
                  }}>{log.operation === 'INSERT' ? '➕ ADD NEW' : log.operation === 'UPDATE' ? '✏️ EDIT DATA' : '❌ REMOVE'}</span>
                </td>
                <td style={styles.tdPath}>{log.path}</td>
                <td style={styles.td}>
                  <button onClick={() => handleUndo(log.id)} style={styles.undoBtn}>↩ Cancel & Rewind</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  card: { background: '#1e293b', border: '1px solid #334155', padding: '20px', borderRadius: '8px' },
  title: { margin: '0 0 4px 0', fontSize: '1.1rem', fontWeight: '700', color: '#f8fafc' },
  desc: { fontSize: '12px', color: '#64748b', margin: '0 0 16px 0' },
  tableWrapper: { overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' },
  thRow: { borderBottom: '2px solid #334155' },
  th: { padding: '10px', color: '#64748b', fontWeight: '700', fontSize: '11px' },
  thAction: { padding: '10px', color: '#64748b', fontWeight: '700', fontSize: '11px', textAlign: 'right' },
  tr: { borderBottom: '1px solid #334155' },
  td: { padding: '10px', verticalAlign: 'middle' },
  tdTime: { padding: '10px', color: '#475569', fontFamily: 'monospace' },
  tdId: { padding: '10px', color: '#cbd5e1', fontFamily: 'monospace' },
  tdPath: { padding: '10px', color: '#e2e8f0', fontFamily: 'monospace' },
  tdShard: { padding: '10px' },
  shardBadge: { background: '#0f172a', padding: '2px 6px', border: '1px solid #334155', borderRadius: '4px', fontSize: '11px', color: '#f1f5f9', fontWeight: '600' },
  opBadge: { padding: '2px 6px', borderRadius: '4px', fontSize: '11px', fontWeight: '700' },
  undoBtn: { background: 'none', border: '1px solid #ef4444', color: '#ef4444', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: '600', float: 'right' }
};