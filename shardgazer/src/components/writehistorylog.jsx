// src/components/writehistorylog.jsx
import React, { useState } from 'react';

export default function WriteHistoryLog({ initialLogs }) {
  const [logs, setLogs] = useState(initialLogs);

  const handleRollback = (id) => {
    setLogs(prev => prev.filter(log => log.id !== id));
    alert(`Emergency Rollback Dispatched: Order Registry Entry [${id}] has been extracted and reverted.`);
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h3 style={styles.title}>📝 Order History Audit Ledger</h3>
        <span style={styles.sub}>Sequential Transaction Log Tape</span>
      </div>
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.thRow}>
              <th style={styles.th}>TIMESTAMP</th>
              <th style={styles.th}>PACKAGE ID</th>
              <th style={styles.th}>DESK BOX</th>
              <th style={styles.th}>OPERATION</th>
              <th style={styles.th}>TARGET MANIFEST PATH</th>
              <th style={styles.thAction}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(log => (
              <tr key={log.id} style={styles.tr}>
                <td style={styles.tdMono}>{log.timestamp}</td>
                <td style={styles.tdBold}>{log.id}</td>
                <td style={styles.td}><span style={styles.boxPill}>{log.shard}</span></td>
                <td style={styles.td}><span style={{...styles.opPill, backgroundColor: log.operation === 'INSERT' ? '#e9ecef' : '#ced4da'}}>{log.operation}</span></td>
                <td style={styles.tdMono}>{log.path}</td>
                <td style={styles.tdAction}>
                  <button onClick={() => handleRollback(log.id)} style={styles.rollbackBtn}>Undo Entry</button>
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
  card: { background: '#ffffff', border: '1px solid #dee2e6', padding: '24px', borderRadius: '8px', width: '100%' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '20px', borderBottom: '1px solid #dee2e6', paddingBottom: '12px' },
  title: { margin: 0, fontSize: '1.15rem', fontWeight: '800', color: '#212529' },
  sub: { fontSize: '12px', color: '#6c757d', fontWeight: '600', fontFamily: 'monospace' },
  tableWrapper: { overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left' },
  thRow: { borderBottom: '2px solid #ced4da', background: '#f8f9fa' },
  th: { padding: '12px 16px', fontSize: '11px', fontWeight: '700', color: '#6c757d', letterSpacing: '0.05em' },
  thAction: { padding: '12px 16px', fontSize: '11px', fontWeight: '700', color: '#6c757d', textAlign: 'right' },
  tr: { borderBottom: '1px solid #dee2e6', transition: 'background 0.2s' },
  td: { padding: '14px 16px', fontSize: '13.5px', color: '#495057' },
  tdBold: { padding: '14px 16px', fontSize: '13.5px', color: '#212529', fontWeight: '700', fontFamily: 'monospace' },
  tdMono: { padding: '14px 16px', fontSize: '13px', color: '#6c757d', fontFamily: 'monospace' },
  tdAction: { padding: '14px 16px', textAlign: 'right' },
  boxPill: { background: '#f8f9fa', border: '1px solid #ced4da', padding: '3px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '600' },
  opPill: { padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '700', color: '#212529', fontFamily: 'monospace' },
  rollbackBtn: { background: '#212529', color: '#f8f9fa', border: 'none', padding: '6px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }
};