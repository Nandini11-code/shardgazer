// src/components/storagebalancer.jsx
import React, { useState } from 'react';

export default function StorageBalancer({ initialNodes }) {
  const [nodes, setNodes] = useState(initialNodes);
  const [isBalanced, setIsBalanced] = useState(false);

  const triggerRebalance = () => {
    const totalUsed = nodes.reduce((acc, n) => acc + n.storageUsed, 0);
    const averageUsed = Math.round(totalUsed / nodes.length);
    
    const balancedNodes = nodes.map(node => ({
      ...node,
      storageUsed: averageUsed,
      status: 'Online'
    }));

    setNodes(balancedNodes);
    setIsBalanced(true);
  };

  return (
    <div style={styles.card}>
      <div style={styles.headerRow}>
        <div>
          <h3 style={styles.title}>⚖️ Shared Shelf & Desk Weight Balancer</h3>
          <p style={styles.desc}>If one warehouse staff member has too many folders, run this task to share the load evenly.</p>
        </div>
        <button 
          onClick={triggerRebalance} 
          disabled={isBalanced}
          style={{ ...styles.balanceBtn, ...(isBalanced ? styles.disabledBtn : {}) }}
        >
          {isBalanced ? '✓ Weight Balanced' : '🔄 Shift & Balance Files'}
        </button>
      </div>

      <div style={styles.distributionContainer}>
        {nodes.map(node => {
          const loadPct = Math.round((node.storageUsed / node.storageTotal) * 100);
          return (
            <div key={node.id} style={styles.miniNodeRow}>
              <span style={styles.nodeLabel}>📍 Workspace Area: {node.name}</span>
              <div style={styles.barWrapper}>
                <div style={styles.track}>
                  <div style={{ 
                    ...styles.bar, 
                    width: `${loadPct}%`, 
                    backgroundColor: loadPct > 90 ? '#ef4444' : loadPct > 75 ? '#f59e0b' : '#10b981' 
                  }} />
                </div>
                <span style={styles.pctText}>{loadPct}% Shelving Full</span>
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
  headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', gap: '15px' },
  title: { margin: '0 0 4px 0', fontSize: '1.1rem', fontWeight: '700', color: '#f8fafc' },
  desc: { fontSize: '12px', color: '#64748b', margin: 0 },
  balanceBtn: { background: '#38bdf8', color: '#0f172a', border: 'none', padding: '10px 16px', borderRadius: '6px', fontWeight: '700', fontSize: '12px', cursor: 'pointer' },
  disabledBtn: { background: '#334155', color: '#64748b', cursor: 'not-allowed' },
  distributionContainer: { display: 'flex', flexDirection: 'column', gap: '12px' },
  miniNodeRow: { display: 'flex', flexDirection: 'column', gap: '6px', padding: '10px', background: '#0f172a', borderRadius: '6px', border: '1px solid #1e293b' },
  nodeLabel: { fontSize: '12px', fontWeight: '600', color: '#cbd5e1' },
  barWrapper: { display: 'flex', alignItems: 'center', gap: '12px' },
  track: { flexGrow: 1, height: '8px', background: '#334155', borderRadius: '4px', overflow: 'hidden' },
  bar: { height: '100%', transition: 'width 0.6s' },
  pctText: { fontSize: '12px', fontFamily: 'monospace', color: '#94a3b8', minWidth: '100px', textAlign: 'right' }
};