// src/components/activitysorter.jsx
import React from 'react';

export default function ActivitySorter({ activities }) {
  const sortedActivities = [...activities].sort((a, b) => b.updatesPerMin - a.updatesPerMin);

  return (
    <div style={styles.card}>
      <h3>🔥 Activity Sorter (Hotspot Tracker)</h3>
      <div style={{ marginTop: '15px' }}>
        {sortedActivities.map((act, index) => (
          <div key={index} style={styles.row}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={styles.rank}>#{index + 1}</span>
              <span>{act.section}</span>
            </div>
            <div>
              <span style={styles.rate}>{act.updatesPerMin} ops/m</span>
              <span style={{ 
                ...styles.statusDot, 
                backgroundColor: act.loadLevel === 'Critical' ? '#e74c3c' : act.loadLevel === 'Moderate' ? '#f1c40f' : '#2ecc71' 
              }} title={act.loadLevel} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  card: { background: '#2c3e50', color: '#fff', padding: '20px', borderRadius: '8px', marginBottom: '20px' },
  row: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#34495e', padding: '10px', marginBottom: '8px', borderRadius: '6px' },
  rank: { background: '#e67e22', padding: '2px 8px', borderRadius: '4px', marginRight: '10px', fontWeight: 'bold', fontSize: '12px' },
  rate: { background: '#2980b9', padding: '3px 8px', borderRadius: '4px', fontSize: '13px', marginRight: '10px' },
  statusDot: { display: 'inline-block', width: '12px', height: '12px', borderRadius: '50%' }
};