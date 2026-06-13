// src/mockdata.js

// 1. Database Status Hub Metrics
export const systemMetrics = {
  cpuUsage: 42,
  memoryUsed: 6.8,
  memoryTotal: 16,
  networkIn: 124.5,
  networkOut: 89.2,
  activeConnections: 1420
};

// 2. Data Location Map Nodes (Storage Topology)
export const initialNodes = [
  { id: 'Node-A', name: 'Alpha-West Engine', status: 'Online', storageUsed: 640, storageTotal: 1024, region: 'us-west' },
  { id: 'Node-B', name: 'Beta-East Engine', status: 'Online', storageUsed: 890, storageTotal: 1024, region: 'us-east' },
  { id: 'Node-C', name: 'Gamma-EU Engine', status: 'Degraded', storageUsed: 980, storageTotal: 1024, region: 'eu-central' }
];

// 3. Data Finder Records (Search Core Tables)
export const mockRecords = [
  { id: 'rec-101', key: 'user_session_9402', shard: 'shard-1', size: '4.2KB', status: 'Synced' },
  { id: 'rec-102', key: 'txn_ledger_2026_06', shard: 'shard-3', size: '128.5KB', status: 'Synced' },
  { id: 'rec-103', key: 'clickstream_cache_tmp', shard: 'shard-3', size: '14.1MB', status: 'Replicating' },
  { id: 'rec-104', key: 'auth_audit_log_v2', shard: 'shard-2', size: '24.9KB', status: 'Synced' }
];

// 4. Real-time Database Commit History Stream
export const initialLogs = [
  { id: "tx-901", timestamp: "11:14:02", shard: "shard-1", operation: "INSERT", path: "users/profile", data: "{\"id\":702,\"user\":\"alpha\"}" },
  { id: "tx-902", timestamp: "11:15:20", shard: "shard-3", operation: "UPDATE", path: "metrics/clicks", data: "{\"count\":14201}" },
  { id: "tx-903", timestamp: "11:16:45", shard: "shard-5", operation: "DELETE", path: "auth/sessions", data: "{\"token\":\"0x7F2B\"}" },
];

// 5. Backup Organizer & Replication Queue Tasks
export const initialReplicationTasks = [
  { id: "rep-001", task: "Sync Shard-1 to Node-B (Backup)", status: "Pending", priority: "High", timeScheduled: "11:20:00" },
  { id: "rep-002", task: "Mirror Shard-4 to Node-C (Secondary)", status: "In-Progress", priority: "Critical", timeScheduled: "11:18:30" },
  { id: "rep-003", task: "Prune Cold Blocks Shard-2", status: "Completed", priority: "Low", timeScheduled: "11:05:00" },
];

// 6. Hotspot Weight Tracker Activity Metrics
export const activityMetrics = [
  { section: "shard-3 (Realtime Clickstream)", updatesPerMin: 1240, loadLevel: "Critical" },
  { section: "shard-1 (User Signups)", updatesPerMin: 450, loadLevel: "Moderate" },
  { section: "shard-2 (Invoices Archive)", updatesPerMin: 12, loadLevel: "Idle" },
  { section: "shard-4 (Product Catalog)", updatesPerMin: 8, loadLevel: "Idle" },
];