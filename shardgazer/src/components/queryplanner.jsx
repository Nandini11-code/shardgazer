// src/components/queryplanner.jsx
import React, { useState } from 'react';

export default function QueryPlanner() {
  const [selectedPlan, setSelectedPlan] = useState('optimal');

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>🧭 Delivery Route & Logistics Planner</h3>
      <p style={styles.desc}>Checks if your request paths are smart or if they introduce messy cross-office walking delays.</p>
      
      <div style={styles.toggleRow}>
        <button 
          onClick={() => setSelectedPlan('optimal')}
          style={{ ...styles.btn, ...(selectedPlan === 'optimal' ? styles.btnActive : {}) }}
        >
          🎯 Direct Route (Fastest)
        </button>
        <button 
          onClick={() => setSelectedPlan('scatter')}
          style={{ ...styles.btn, ...(selectedPlan === 'scatter' ? styles.btnDanger : {}) }}
        >
          ⚠️ Desk Hopping Delays (Slow)
        </button>
      </div>

      <div style={styles.planBox}>
        {selectedPlan === 'optimal' ? (
          <>
            <div style={styles.statusBannerSuccess}>⚡ ROUTE RATING: PERFECT DIRECT HIT</div>
            <div style={styles.codeText}>Action: File was indexed and located right away.</div>
            <ul style={styles.detailsList}>
              <li>• Target Location: <span style={{ color: '#38bdf8' }}>Alpha-West Main Desk</span></li>
              <li>• Office Walking Penalty: <span style={{ color: '#10b981' }}>0 seconds delay</span></li>
              <li>• Status: Clean execution</li>
            </ul>
          </>
        ) : (
          <>
            <div style={styles.statusBannerWarning}>🚨 WARNING: SEVERE TIMEOUT RISK</div>
            <div style={styles.codeText}>Action: Driver does not know the box number.</div>
            <ul style={styles.detailsList}>
              <li>• Target Action: <span style={{ color: '#f59e0b' }}>SEARCHING ALL GLOBAL DESKS</span></li>
              <li>• Desk Hopping Penalty: <span style={{ color: '#ef4444' }}>+142ms severe network drag</span></li>
              <li>• Fix: Provide an exact customer search parameter next time to avoid searching every desk.</li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  card: { background: '#1e293b', border: '1px solid #334155', padding: '20px', borderRadius: '8px' },
  title: { margin: '0 0 4px 0', fontSize: '1.1rem', fontWeight: '700', color: '#f8fafc' },
  desc: { fontSize: '12px', color: '#64748b', margin: '0 0 16px 0' },
  toggleRow: { display: 'flex', gap: '10px', marginBottom: '15px' },
  btn: { flex: 1, padding: '8px', border: '1px solid #334155', background: '#0f172a', color: '#64748b', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' },
  btnActive: { border: '1px solid #38bdf8', color: '#38bdf8', background: 'rgba(56, 189, 248, 0.1)' },
  btnDanger: { border: '1px solid #ef4444', color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)' },
  planBox: { background: '#0f172a', padding: '12px', borderRadius: '6px', border: '1px solid #1e293b' },
  statusBannerSuccess: { background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '6px', borderRadius: '4px', fontSize: '11px', fontWeight: '700', textAlign: 'center' },
  statusBannerWarning: { background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', padding: '6px', borderRadius: '4px', fontSize: '11px', fontWeight: '700', textAlign: 'center' },
  codeText: { background: '#1e293b', padding: '8px', borderRadius: '4px', fontSize: '12px', color: '#e2e8f0', borderLeft: '3px solid #38bdf8', margin: '10px 0', fontWeight: '500' },
  detailsList: { listStyle: 'none', padding: 0, margin: 0, fontSize: '12px', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '6px' }
};