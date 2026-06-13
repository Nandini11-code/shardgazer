// src/components/datalocationmap.jsx
import React from 'react';

export default function DataLocationMap({ nodes }) {
  return (
    <div style={styles.card}>
      <h3 style={styles.title}>🏢 Warehouse Storage Floor Map</h3>
      <div style={styles.grid}>
        {nodes.map(node => {
          const pct = Math.round((node.storageUsed / node.storageTotal) * 100);
          return (
            <div key={node.id} style={styles.nodeBox}>
              <div style={styles.topRow}>
                <div>
                  <h4 style={styles.nodeName}>{node.name}</h4>
                  <span style={styles.region}>{node.region.toUpperCase()} REGION</span>
                </div>
                <span style={{ 
                  ...styles.badge, 
                  backgroundColor: node.status === 'Online' ? '#212529' : '#e9ecef',
                  color: node.status === 'Online' ? '#f8f9fa' : '#495057',
                  border: '1px solid #ced4da'
                }}>{node.status.toUpperCase()}</span>
              </div>
              
              <div style={styles.storageLabelRow}>
                <span>Shelf Weight Capacity</span>
                <span>{node.storageUsed}GB / {node.storageTotal}GB ({pct}%)</span>
              </div>
              <div style={styles.track}>
                <div style={{ ...styles.bar, width: `${pct}%`, backgroundColor: pct > 90 ? '#495057' : '#212529' }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  card: { background: '#ffffff', border: '1px solid #dee2e6', padding: '24px', borderRadius: '8px' },
  title: { margin: '0 0 20px 0', fontSize: '1.15rem', fontWeight: '800', color: '#212529' },
  grid: { display: 'flex', flexDirection: 'column', gap: '16px' },
  nodeBox: { background: '#f8f9fa', border: '1px solid #dee2e6', padding: '16px', borderRadius: '6px' },
  topRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' },
  nodeName: { margin: 0, fontSize: '1rem', fontWeight: '700', color: '#212529' },
  region: { fontSize: '11px', color: '#6c757d', fontWeight: '600' },
  badge: { padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '700', fontFamily: 'monospace' },
  storageLabelRow: { display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#495057', marginBottom: '8px', fontWeight: '500' },
  track: { height: '8px', width: '100%', background: '#e9ecef', borderRadius: '10px', overflow: 'hidden', border: '1px solid #ced4da' },
  bar: { height: '100%', borderRadius: '10px', transition: 'width 0.5s ease' }
};