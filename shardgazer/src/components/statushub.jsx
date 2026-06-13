// src/components/statushub.jsx
import React from 'react';

export default function StatusHub({ metrics }) {
  if (!metrics) return null;

  return (
    <div style={styles.container}>
      <div style={styles.metricCard}>
        <span style={styles.label}>CPU LOAD</span>
        <div style={styles.valueRow}>
          <span style={styles.value}>{metrics.cpuUsage}%</span>
          <div style={styles.progressTrack}>
            <div style={{ ...styles.progressBar, width: `${metrics.cpuUsage}%`, backgroundColor: metrics.cpuUsage > 80 ? '#ef4444' : '#38bdf8' }} />
          </div>
        </div>
      </div>

      <div style={styles.metricCard}>
        <span style={styles.label}>MEMORY RESOURCE</span>
        <div style={styles.valueRow}>
          <span style={styles.value}>{metrics.memoryUsed} / {metrics.memoryTotal} GB</span>
          <div style={styles.progressTrack}>
            <div style={{ ...styles.progressBar, width: `${(metrics.memoryUsed / metrics.memoryTotal) * 100}%`, backgroundColor: '#818cf8' }} />
          </div>
        </div>
      </div>

      <div style={styles.metricCard}>
        <span style={styles.label}>NETWORK OUTFLOW</span>
        <div style={styles.valueRow}>
          <span style={styles.value}>↓{metrics.networkIn} Mb/s  ↑{metrics.networkOut} Mb/s</span>
        </div>
      </div>

      <div style={styles.metricCard}>
        <span style={styles.label}>ACTIVE LIVE PIPES</span>
        <div style={styles.valueRow}>
          <span style={{ ...styles.value, color: '#10b981' }}>{metrics.activeConnections.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', width: '100%' },
  metricCard: { background: '#1e293b', padding: '16px', borderRadius: '8px', border: '1px solid #334155', display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { fontSize: '11px', fontWeight: '700', color: '#94a3b8', letterSpacing: '0.05em' },
  valueRow: { display: 'flex', flexDirection: 'column', gap: '6px' },
  value: { fontSize: '1.25rem', fontWeight: '700', color: '#f8fafc' },
  progressTrack: { width: '100%', height: '6px', background: '#334155', borderRadius: '3px', overflow: 'hidden' },
  progressBar: { height: '100%', transition: 'width 0.4s ease' }
};