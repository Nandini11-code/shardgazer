// src/Dashboard.jsx
import React, { useState, useEffect } from 'react';

import StatusHub from './components/statushub';
import DataLocationMap from './components/datalocationmap';
import DataFinder from './components/datafinder';
import ActivitySorter from './components/activitysorter';
import BackupOrganizer from './components/backuporganizer';
import QueryPlanner from './components/queryplanner';
import StorageBalancer from './components/storagebalancer';
import WriteHistoryLog from './components/writehistorylog';

import { 
  initialNodes, 
  mockRecords, 
  systemMetrics as baselineMetrics, 
  initialLogs as baselineLogs, 
  initialReplicationTasks, 
  activityMetrics 
} from './mockdata.js';

export default function Dashboard() {
  const [currentView, setCurrentView] = useState('landing');
  
  // ⚡ LIVE SIMULATOR STATES
  const [liveMetrics, setLiveMetrics] = useState(baselineMetrics);
  const [liveLogs, setLiveLogs] = useState(baselineLogs);
  const [liveNodes, setLiveNodes] = useState(initialNodes);

  // 🔄 BACKGROUND OPERATIONS ENGINE SIMULATOR
  useEffect(() => {
    const liveInterval = setInterval(() => {
      
      setLiveMetrics(prev => ({
        ...prev,
        cpuUsage: Math.min(100, Math.max(15, prev.cpuUsage + Math.floor(Math.random() * 11) - 5)),
        networkIn: parseFloat((prev.networkIn + (Math.random() * 10 - 5)).toFixed(1)),
        networkOut: parseFloat((prev.networkOut + (Math.random() * 8 - 4)).toFixed(1)),
        activeConnections: prev.activeConnections + Math.floor(Math.random() * 7) - 3
      }));

      if (Math.random() > 0.6) {
        const now = new Date();
        const timeStr = now.toTimeString().split(' ')[0];
        const randomId = `tx-${Math.floor(100 + Math.random() * 900)}`;
        const boxes = ['shard-1', 'shard-2', 'shard-3', 'shard-4'];
        const operations = ['INSERT', 'UPDATE'];
        const paths = ['orders/fulfillment', 'inventory/shelving', 'shipping/manifest'];

        const newLog = {
          id: randomId,
          timestamp: timeStr,
          shard: boxes[Math.floor(Math.random() * boxes.length)],
          operation: operations[Math.floor(Math.random() * operations.length)],
          path: paths[Math.floor(Math.random() * paths.length)]
        };

        setLiveLogs(prevLogs => [newLog, ...prevLogs.slice(0, 14)]);

        setLiveNodes(prevNodes => prevNodes.map(node => {
          if (node.id === 'Node-A' && Math.random() > 0.5 && node.storageUsed < node.storageTotal) {
            return { ...node, storageUsed: node.storageUsed + 1 };
          }
          return node;
        }));
      }

    }, 2000);

    return () => clearInterval(liveInterval);
  }, []);

  const enterConsole = (viewKey) => {
    setCurrentView(viewKey);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={styles.landingContainer}>
      
      {/* 🧭 TOP BRAND NAVIGATION BAR */}
      <header style={styles.topNavbar}>
        <div style={styles.brandGroup} onClick={() => setCurrentView('landing')}>
          <span style={styles.brandIcon}>📦</span>
          <span style={styles.brandName}>ShardGazer</span>
        </div>
        
        <nav style={styles.centerLinks}>
          <button onClick={() => setCurrentView('landing')} style={{...styles.navTextLink, ...(currentView === 'landing' ? styles.activeTextLink : {})}}>Home Platform</button>
          <button onClick={() => enterConsole('status')} style={{...styles.navTextLink, ...(currentView !== 'landing' ? styles.activeTextLink : {})}}>Operations Console</button>
          <a href="#features-section" style={styles.navTextLink}>Product Features</a>
        </nav>

        <div style={styles.navRightGroup}>
          <span style={styles.systemPill}>● LIVE STREAMING</span>
          <button onClick={() => enterConsole('status')} style={styles.ctaButtonPrimary}>Launch Console</button>
        </div>
      </header>

      {/* 🏡 DYNAMIC VIEW ROUTER */}
      {currentView === 'landing' ? (
        <div style={styles.landingBody}>
          
          {/* 🚀 HERO SECTION */}
          <section style={styles.heroSection}>
            <div style={styles.heroBadge}>ENTERPRISE DATA UTILITY</div>
            <h1 style={styles.heroHeadline}>Your Global Shard Logistics Engine, Simplified.</h1>
            <p style={styles.heroSubhead}>
              ShardGazer organizes multi-region database infrastructure into an elegant visual map. 
              Track inventory packages, balance storage shelves, and monitor cluster speeds without the dense jargon.
            </p>
            <div style={styles.heroActions}>
              <button onClick={() => enterConsole('status')} style={styles.heroCtaMain}>Enter Control Console →</button>
              <a href="#live-preview-section" style={styles.heroCtaSec}>View Live Snapshot Data</a>
            </div>
          </section>

          {/* 📊 INTERACTIVE LIVE SNAPSHOT BOX */}
          <section id="live-preview-section" style={styles.previewSection}>
            <div style={styles.sectionHeaderBox}>
              <span style={styles.sectionLabel}>REAL-TIME LIVE REPORT FEED</span>
              <h2 style={styles.sectionTitle}>Global Data Center Telemetry</h2>
              <p style={styles.sectionText}>This embedded window updates automatically every 2 seconds simulating constant workspace traffic.</p>
            </div>
            <div style={styles.embeddedWidgetCard}>
              <StatusHub metrics={liveMetrics} />
            </div>
          </section>

          {/* 🧱 FEATURE INDEX SECTION */}
          <section id="features-section" style={styles.featuresGridSection}>
            <div style={styles.sectionHeaderBox}>
              <span style={styles.sectionLabel}>BUILT-IN MANAGEMENT SOLUTIONS</span>
              <h2 style={styles.sectionTitle}>Fully Integrated Operations Decks</h2>
              <p style={styles.sectionText}>Click any management workspace below to open up its real-time control console parameters.</p>
            </div>

            <div style={styles.featuresGrid}>
              <div style={styles.featureCard} onClick={() => enterConsole('topology')}>
                <div style={styles.featIcon}>🏢</div>
                <h3 style={styles.featTitle}>Warehouse Floor Map</h3>
                <p style={styles.featDesc}>Monitor physical server desks across your global regions and check storage loads.</p>
                <span style={styles.featLink}>Open Node Deck →</span>
              </div>

              <div style={styles.featureCard} onClick={() => enterConsole('history')}>
                <div style={styles.featIcon}>📝</div>
                <h3 style={styles.featTitle}>Order History Ledger</h3>
                <p style={styles.featDesc}>An audit trail tracking file updates. Use the recovery switch to easily undo user slip-ups.</p>
                <span style={styles.featLink}>Open Audit Log →</span>
              </div>

              <div style={styles.featureCard} onClick={() => enterConsole('backup')}>
                <div style={styles.featIcon}>⏳</div>
                <h3 style={styles.featTitle}>Safety Copy Queue</h3>
                <p style={styles.featDesc}>Keep track of automatic replication data streams ensuring information is safely mirrored.</p>
                <span style={styles.featLink}>Open Backup Engine →</span>
              </div>

              <div style={styles.featureCard} onClick={() => enterConsole('finder')}>
                <div style={styles.featIcon}>🔍</div>
                <h3 style={styles.featTitle}>Package Tracker</h3>
                <p style={styles.featDesc}>Locate any isolated profile key instantly to see exactly which shelf box it is stored in.</p>
                <span style={styles.featLink}>Open Tracker Search →</span>
              </div>

              <div style={styles.featureCard} onClick={() => enterConsole('planner')}>
                <div style={styles.featIcon}>🧭</div>
                <h3 style={styles.featTitle}>Route Efficiency Optimizer</h3>
                <p style={styles.featDesc}>Audit query execution pathways to verify quick data deliveries and eliminate lagging hops.</p>
                <span style={styles.featLink}>Open Route Maps →</span>
              </div>

              <div style={styles.featureCard} onClick={() => enterConsole('balancer')}>
                <div style={styles.featIcon}>⚖️</div>
                <h3 style={styles.featTitle}>Desk Weight Balancer</h3>
                <p style={styles.featDesc}>Redistribute data files across crowded shelves evenly so single server points don't break down.</p>
                <span style={styles.featLink}>Open Balancing Module →</span>
              </div>
            </div>
          </section>

          <footer style={styles.corporateFooter}>
            <p>© 2026 ShardGazer Systems International. Running production tier cluster mesh node operations.</p>
          </footer>

        </div>
      ) : (
        /* --- ACTIVE CONSOLE SUB-PAGE INNER CANVAS --- */
        <div style={styles.consoleContainer}>
          
          <div style={styles.consoleBreadcrumb}>
            <button onClick={() => setCurrentView('landing')} style={styles.backToHomeBtn}>← Return to Main Landing Page</button>
            <div style={styles.quickJumpRow}>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#6c757d', letterSpacing: '0.05em' }}>QUICK SWITCH WORKSPACE:</span>
              <button onClick={() => setCurrentView('status')} style={{...styles.miniTabBtn, ...(currentView === 'status' ? styles.miniTabBtnActive : {})}}>Health Hub</button>
              <button onClick={() => setCurrentView('topology')} style={{...styles.miniTabBtn, ...(currentView === 'topology' ? styles.miniTabBtnActive : {})}}>Floor Map</button>
              <button onClick={() => setCurrentView('history')} style={{...styles.miniTabBtn, ...(currentView === 'history' ? styles.miniTabBtnActive : {})}}>Order History</button>
              <button onClick={() => setCurrentView('backup')} style={{...styles.miniTabBtn, ...(currentView === 'backup' ? styles.miniTabBtnActive : {})}}>Safety Copies</button>
              <button onClick={() => setCurrentView('finder')} style={{...styles.miniTabBtn, ...(currentView === 'finder' ? styles.miniTabBtnActive : {})}}>Package Finder</button>
              <button onClick={() => setCurrentView('planner')} style={{...styles.miniTabBtn, ...(currentView === 'planner' ? styles.miniTabBtnActive : {})}}>Route Maps</button>
              <button onClick={() => setCurrentView('balancer')} style={{...styles.miniTabBtn, ...(currentView === 'balancer' ? styles.miniTabBtnActive : {})}}>Weight Balancer</button>
            </div>
          </div>

          <main style={styles.consoleContentBody}>
            {currentView === 'status' && (
              <div style={styles.focusedPage}>
                <div style={styles.pageHeader}><h2 style={styles.pageTitle}>📟 System Telemetry: Network Speed & Health</h2><p style={styles.pageSubtitle}>Real-time streaming dashboard tracking overall hardware utilization ceilings.</p></div>
                <StatusHub metrics={liveMetrics} />
              </div>
            )}
            {currentView === 'topology' && (
              <div style={styles.focusedPage}>
                <div style={styles.pageHeader}><h2 style={styles.pageTitle}>🏢 Facility Overview: Warehouse Floor Map</h2><p style={styles.pageSubtitle}>High level layout map visualizing active system storage node distributions.</p></div>
                <DataLocationMap nodes={liveNodes} />
              </div>
            )}
            {currentView === 'history' && (
              <div style={styles.focusedPage}>
                <div style={styles.pageHeader}><h2 style={styles.pageTitle}>📝 Audit Registry: Order History & Undo Tape</h2><p style={styles.pageSubtitle}>Chronological receipt logger tracking active structural system transaction sets.</p></div>
                <WriteHistoryLog initialLogs={liveLogs} />
              </div>
            )}
            {currentView === 'backup' && (
              <div style={styles.focusedPage}>
                <div style={styles.pageHeader}><h2 style={styles.pageTitle}>⏳ Redundancy Tasks: Safety Copy Queue</h2><p style={styles.pageSubtitle}>Verification ledger supervising global automated file mirroring pipelines.</p></div>
                <BackupOrganizer tasks={initialReplicationTasks} />
              </div>
            )}
            {currentView === 'finder' && (
              <div style={styles.focusedPageLimited}>
                <div style={styles.pageHeader}><h2 style={styles.pageTitle}>🔍 Inventory Lookup: Package Tracker Search</h2><p style={styles.pageSubtitle}>Fast index searching to trace custom row targets to parent shards.</p></div>
                <DataFinder records={mockRecords} />
              </div>
            )}
            {currentView === 'planner' && (
              <div style={styles.focusedPageLimited}>
                <div style={styles.pageHeader}><h2 style={styles.pageTitle}>🧭 Efficiency Map: Delivery Route Planner</h2><p style={styles.pageSubtitle}>Simulates network latency variables to verify single shard transaction speeds.</p></div>
                <QueryPlanner />
              </div>
            )}
            {currentView === 'balancer' && (
              <div style={styles.focusedPage}>
                <div style={styles.pageHeader}><h2 style={styles.pageTitle}>⚖️ Load Optimization: Desk Weight Balancer</h2><p style={styles.pageSubtitle}>Automation suite balancing multi-node storage variables to guard performance spikes.</p></div>
                <StorageBalancer initialNodes={liveNodes} />
              </div>
            )}
          </main>
        </div>
      )}

    </div>
  );
}

const styles = {
  landingContainer: { minHeight: '100vh', width: '100vw', background: '#f8f9fa', color: '#495057', fontFamily: 'system-ui, sans-serif', display: 'flex', flexDirection: 'column' },
  topNavbar: { height: '70px', width: '100%', background: '#212529', borderBottom: '1px solid #343a40', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 40px', position: 'sticky', top: 0, zIndex: 100 },
  brandGroup: { display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' },
  brandIcon: { fontSize: '1.4rem' },
  brandName: { fontSize: '1.2rem', fontWeight: '800', color: '#f8f9fa', letterSpacing: '-0.025em' },
  centerLinks: { display: 'flex', gap: '25px' },
  navTextLink: { background: 'none', border: 'none', color: '#adb5bd', fontSize: '14px', fontWeight: '600', cursor: 'pointer', textDecoration: 'none', transition: 'color 0.2s' },
  activeTextLink: { color: '#f8f9fa' },
  navRightGroup: { display: 'flex', alignItems: 'center', gap: '20px' },
  systemPill: { background: '#343a40', color: '#dee2e6', border: '1px solid #495057', padding: '4px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: '700', fontFamily: 'monospace', letterSpacing: '0.05em' },
  ctaButtonPrimary: { background: '#f8f9fa', color: '#212529', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' },
  
  landingBody: { width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#f8f9fa' },
  heroSection: { maxWidth: '850px', padding: '90px 20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  heroBadge: { background: '#e9ecef', border: '1px solid #ced4da', color: '#495057', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '700', letterSpacing: '0.05em', marginBottom: '24px' },
  heroHeadline: { fontSize: '3.2rem', fontWeight: '900', color: '#212529', margin: '0 0 20px 0', letterSpacing: '-0.03em', lineHeight: '1.15' },
  heroSubhead: { fontSize: '1.15rem', color: '#6c757d', margin: '0 0 35px 0', lineHeight: '1.6', maxWidth: '700px' },
  heroActions: { display: 'flex', gap: '15px' },
  heroCtaMain: { background: '#212529', color: '#f8f9fa', border: 'none', padding: '14px 28px', borderRadius: '6px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' },
  heroCtaSec: { background: '#e9ecef', border: '1px solid #ced4da', color: '#343a40', padding: '14px 28px', borderRadius: '6px', fontWeight: '600', fontSize: '14px', cursor: 'pointer', textDecoration: 'none' },
  
  previewSection: { width: '100%', maxWidth: '1200px', padding: '40px 20px 60px 20px' },
  sectionHeaderBox: { textAlign: 'center', marginBottom: '35px' },
  sectionLabel: { fontSize: '11px', fontWeight: '700', color: '#6c757d', letterSpacing: '0.05em' },
  sectionTitle: { fontSize: '1.9rem', fontWeight: '800', color: '#212529', margin: '6px 0 10px 0' },
  sectionText: { fontSize: '14px', color: '#6c757d', margin: 0 },
  embeddedWidgetCard: { background: '#ffffff', padding: '12px', borderRadius: '12px', border: '1px solid #dee2e6', boxShadow: '0 15px 30px rgba(33,37,41,0.06)' },
  
  featuresGridSection: { width: '100%', maxWidth: '1200px', padding: '60px 20px 90px 20px', borderTop: '1px solid #dee2e6' },
  featuresGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '25px', marginTop: '40px' },
  featureCard: { background: '#ffffff', border: '1px solid #dee2e6', padding: '30px', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s ease', textAlign: 'left', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' },
  featIcon: { fontSize: '2rem', marginBottom: '16px' },
  featTitle: { fontSize: '1.25rem', fontWeight: '700', color: '#212529', margin: '0 0 10px 0' },
  featDesc: { fontSize: '13.5px', color: '#6c757d', margin: '0 0 20px 0', lineHeight: '1.5' },
  featLink: { fontSize: '12px', fontWeight: '700', color: '#343a40', borderBottom: '2px solid #ced4da' },
  corporateFooter: { width: '100%', borderTop: '1px solid #dee2e6', padding: '40px', textAlign: 'center', fontSize: '12px', color: '#adb5bd', background: '#212529' },
  
  consoleContainer: { width: '100%', display: 'flex', flexDirection: 'column', flexGrow: 1, background: '#e9ecef' },
  consoleBreadcrumb: { background: '#ffffff', borderBottom: '1px solid #dee2e6', padding: '15px 40px', display: 'flex', flexDirection: 'column', gap: '12px' },
  backToHomeBtn: { background: 'none', border: 'none', color: '#212529', fontSize: '13px', fontWeight: '700', cursor: 'pointer', textAlign: 'left', padding: 0 },
  quickJumpRow: { display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' },
  miniTabBtn: { background: '#f8f9fa', border: '1px solid #ced4da', color: '#495057', padding: '6px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' },
  miniTabBtnActive: { background: '#212529', border: '1px solid #212529', color: '#f8f9fa' },
  consoleContentBody: { flexGrow: 1, padding: '40px', display: 'flex', justifyContent: 'center', background: '#e9ecef' },
  focusedPage: { width: '100%', maxWidth: '1200px', display: 'flex', flexDirection: 'column' },
  focusedPageLimited: { width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column' },
  pageHeader: { marginBottom: '25px', borderBottom: '1px solid #ced4da', paddingBottom: '16px' },
  pageTitle: { fontSize: '1.6rem', fontWeight: '800', color: '#212529', margin: 0 },
  pageSubtitle: { fontSize: '13px', color: '#6c757d', margin: '4px 0 0 0' }
};