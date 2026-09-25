import fs from 'fs';
import path from 'path';

export interface StoredLead {
  id: string;
  ticketId: string;
  timestamp: string;
  createdAt: number;
  formType: string;
  fullName?: string;
  email?: string;
  phone?: string;
  websiteUrl?: string;
  businessType?: string;
  primaryConcern?: string;
  message?: string;
  technicalDetails?: {
    overallScore?: number | string;
    grade?: string;
    issuesCount?: number;
    responseTimeMs?: number;
    rawDetails?: any;
  };
  clientIp?: string;
  userAgent?: string;
  emailStatus: {
    dispatchedToAdmin: boolean;
    provider?: string;
    adminEmail: string;
    dispatchedAt?: string;
    error?: string;
  };
  confirmationStatus?: {
    sentToUser: boolean;
    userEmail?: string;
    dispatchedAt?: string;
    error?: string;
  };
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');
const LEADS_LOG_FILE = path.join(DATA_DIR, 'leads.log');

// Ensure data directory exists
function ensureStorageReady() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(LEADS_FILE)) {
      fs.writeFileSync(LEADS_FILE, JSON.stringify([], null, 2), 'utf8');
    }
  } catch (err) {
    console.error('⚠️ [LeadStorage] Error initializing data directory:', err);
  }
}

// Read all leads safely
export function getAllStoredLeads(): StoredLead[] {
  ensureStorageReady();
  try {
    if (fs.existsSync(LEADS_FILE)) {
      const content = fs.readFileSync(LEADS_FILE, 'utf8');
      return JSON.parse(content || '[]');
    }
  } catch (err) {
    console.error('⚠️ [LeadStorage] Error reading leads file:', err);
  }
  return [];
}

// Save or append a new lead to disk
export function saveLeadToStorage(leadData: Omit<StoredLead, 'id' | 'createdAt' | 'timestamp'>): StoredLead {
  ensureStorageReady();

  const id = `LEAD-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const now = new Date();

  const newLead: StoredLead = {
    ...leadData,
    id,
    createdAt: now.getTime(),
    timestamp: now.toISOString(),
  };

  try {
    // 1. Atomic append to leads.log (JSON Lines for 100% crash resilience)
    fs.appendFileSync(LEADS_LOG_FILE, JSON.stringify(newLead) + '\n', 'utf8');

    // 2. Update leads.json array
    const currentLeads = getAllStoredLeads();
    currentLeads.unshift(newLead); // newest first

    // Keep max 10,000 leads in leads.json
    const trimmed = currentLeads.slice(0, 10000);
    fs.writeFileSync(LEADS_FILE, JSON.stringify(trimmed, null, 2), 'utf8');

    console.log(`💾 [LeadStorage] Lead guardado en disco con éxito. ID: ${id} | Origen: ${leadData.formType} | Email: ${leadData.email || 'N/A'}`);
  } catch (err) {
    console.error('❌ [LeadStorage] Error guardando lead en disco:', err);
  }

  return newLead;
}

// Update lead delivery status after email sending attempt
export function updateLeadDeliveryStatus(
  leadId: string,
  update: {
    emailStatus?: Partial<StoredLead['emailStatus']>;
    confirmationStatus?: Partial<NonNullable<StoredLead['confirmationStatus']>>;
  }
) {
  try {
    const leads = getAllStoredLeads();
    const index = leads.findIndex((l) => l.id === leadId);
    if (index !== -1) {
      if (update.emailStatus) {
        leads[index].emailStatus = { ...leads[index].emailStatus, ...update.emailStatus };
      }
      if (update.confirmationStatus) {
        leads[index].confirmationStatus = { ...leads[index].confirmationStatus, ...update.confirmationStatus };
      }
      fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf8');
    }
  } catch (err) {
    console.warn(`⚠️ [LeadStorage] Error updating delivery status for lead ${leadId}:`, err);
  }
}
