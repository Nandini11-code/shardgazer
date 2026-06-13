// src/components/statushub.jsx
import React from 'react';

export default function StatusHub({ metrics }) {
  return (
    <div style={styles.card}>
      <h3 style={styles.title}>📟 Operational Telemetry Feed</h3>
      <div style={styles.grid}>
        <div style={styles.metricBox}>
          <span style={styles.label}>CORE CPU LOAD</span>
          <div style={styles.valueRow}>
            <span style={styles.number}>{metrics.cpuUsage}%</span>
            <span style={{...styles.indicator, color: metrics.cpuUsage > 80 ? '#212529' : '#6c757d'}}>
              {metrics.cpuUsage > 80 ? '⚠️ HIGH' : '● NOMINAL'}
            </span>
          </div>
        </div>
        <div style={styles.metricBox}>
          <span style={styles.label}>NETWORK THROUGHPUT</span>
          <div style={styles.valueRow}>
            <span style={styles.number}>{metrics.networkIn} MB/s</span>
            <span style={styles.subtext}>Inbound Traffic</span>
          </div>
        </div>
        <div style={styles.metricBox}>
          <span style={styles.label}>ACTIVE DESK CHANNELS</span>
          <div style={styles.valueRow}>
            <span style={styles.number}>{metrics.activeConnections}</span>
            <span style={styles.subtext}>Live sessions</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: { background: '#ffffff', border: '1px solid #dee2e6', padding: '24px', borderRadius: '8px', width: '100%' },
  title: { margin: '0 0 20px 0', fontSize: '1.15rem', fontWeight: '800', color: '#212529', letterSpacing: '-0.02em' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' },
  metricBox: { background: '#f8f9fa', border: '1px solid #ced4da', padding: '16px', borderRadius: '6px' },
  label: { fontSize: '11px', fontWeight: '700', color: '#6c757d', letterSpacing: '0.05em' },
  valueRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '8px' },
  number: { fontSize: '1.6rem', fontWeight: '800', color: '#212529' },
  indicator: { fontSize: '11px', fontWeight: '700', fontFamily: 'monospace' },
  subtext: { fontSize: '12px', color: '#6c757d' }
};