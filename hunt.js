import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'fs';

const serviceAccount = JSON.parse(fs.readFileSync('service-account.json', 'utf8'));

if (!getApps().length) {
  initializeApp({ credential: cert(serviceAccount) });
}

const db = getFirestore();

async function deleteGhost() {
  const ghostId = 'fundi-wa-simu-mpeketoni-';
  console.log(`Attempting to delete ghost document: ${ghostId}...`);
  
  try {
    await db.collection('directories').doc(ghostId).delete();
    console.log(`✅ Successfully deleted ${ghostId} from Firestore!`);
  } catch (error) {
    console.error(`❌ Failed to delete:`, error);
  }
}

deleteGhost();