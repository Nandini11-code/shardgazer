// src/components/datalocationmap.jsx
import React from 'react';

export default function DataLocationMap({ nodes }) {
  return (
    <div style={styles.card}>
      <h3 style={styles.title}>🏢 Warehouse Floor & Shelf Allocation Map</h3>
      <div style={styles.grid}>
        {nodes.map(node => {
          const pct = Math.round((node.storageUsed / node.storageTotal) * 100);
          return (
            <div key={node.id} style={styles.nodeBox}>
              <div style={styles.topRow}>
                <div>
                  <h4 style={styles.nodeName}>📍 Desk Location: {node.name}</h4>
                  <span style={styles.region}>REGIONAL STATION: {node.region.toUpperCase()}</span>
                </div>
                <span style={{ 
                  ...styles.badge, 
                  backgroundColor: node.status === 'Online' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                  color: node.status === 'Online' ? '#10b981' : '#f59e0b'
                }}>{node.status === 'Online' ? '🟢 Operational' : '⚠️ Overloaded'}</span>
              </div>
              
              <div style={styles.storageLabelRow}>
                <span>Shelf Storage Capacity Used</span>
                <span>{node.storageUsed} GB / {node.storageTotal} GB ({pct}% Full)</span>
              </div>
              <div style={styles.track}>
                <div style={{ ...styles.bar, width: `${pct}%`, backgroundColor: pct > 90 ? '#ef4444' : '#38bdf8' }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  card: { background: '#1e293b', border: '1px solid #334155', padding: '20px', borderRadius: '8px' },
  title: { margin: '0 0 16px 0', fontSize: '1.1rem', fontWeight: '700', color: '#f8fafc' },
  grid: { display: 'flex', flexDirection: 'column', gap: '14px' },
  nodeBox: { background: '#0f172a', border: '1px solid #1e293b', padding: '14px', borderRadius: '6px' },
  topRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' },
  nodeName: { margin: 0, fontSize: '0.95rem', fontWeight: '600', color: '#f1f5f9' },
  region: { fontSize: '10px', color: '#64748b', fontWeight: '700', fontFamily: 'monospace' },
  badge: { padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '700' },
  storageLabelRow: { display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' },
  track: { width: '100%', height: '6px', background: '#334155', borderRadius: '3px', overflow: 'hidden' },
  bar: { height: '100%', transition: 'width 0.4s' }
};