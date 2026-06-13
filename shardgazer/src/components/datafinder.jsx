// src/components/datafinder.jsx
import React, { useState } from 'react';

export default function DataFinder({ records }) {
  const [query, setQuery] = useState('');

  const filtered = records.filter(rec => 
    rec.key.toLowerCase().includes(query.toLowerCase()) || 
    rec.shard.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>🔍 Granular Data Core Search</h3>
      <input 
        type="text" 
        placeholder="Filter by key index or shard..." 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={styles.input}
      />
      <div style={styles.list}>
        {filtered.length === 0 ? (
          <p style={styles.empty}>No isolated partitions found</p>
        ) : (
          filtered.map(rec => (
            <div key={rec.id} style={styles.row}>
              <div style={styles.info}>
                <span style={styles.key}>{rec.key}</span>
                <span style={styles.meta}>{rec.shard} • {rec.size}</span>
              </div>
              <span style={{
                ...styles.status,
                color: rec.status === 'Synced' ? '#10b981' : '#38bdf8'
              }}>{rec.status}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  card: { background: '#1e293b', border: '1px solid #334155', padding: '20px', borderRadius: '8px', height: '100%', display: 'flex', flexDirection: 'column' },
  title: { margin: '0 0 12px 0', fontSize: '1.1rem', fontWeight: '700', color: '#f8fafc' },
  input: { width: '100%', padding: '10px 12px', background: '#0f172a', border: '1px solid #334155', borderRadius: '6px', color: '#f8fafc', fontSize: '13px', outline: 'none', marginBottom: '14px' },
  list: { flexGrow: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' },
  row: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0f172a', padding: '10px 12px', borderRadius: '6px', border: '1px solid #1e293b' },
  info: { display: 'flex', flexDirection: 'column', gap: '2px' },
  key: { fontSize: '13px', fontFamily: 'monospace', color: '#f1f5f9' },
  meta: { fontSize: '11px', color: '#64748b' },
  status: { fontSize: '12px', fontWeight: '600' },
  empty: { fontSize: '13px', color: '#64748b', textAlign: 'center', marginTop: '20px' }
};