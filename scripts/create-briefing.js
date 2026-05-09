/**
 * Script para criar um novo briefing no Firestore.
 *
 * Uso:
 *   node scripts/create-briefing.js "Nome do Cliente" "email@cliente.pt" "landing-page"
 *
 * Requer: GOOGLE_APPLICATION_CREDENTIALS configurado ou gcloud auth application-default login
 */

import { initializeApp, cert, applicationDefault } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { randomBytes } from 'crypto'

const app = initializeApp({
  credential: applicationDefault(),
  projectId: 'webazul'
})

const db = getFirestore(app)

const clientName = process.argv[2]
const clientEmail = process.argv[3]
const projectType = process.argv[4] || 'landing-page'

if (!clientName || !clientEmail) {
  console.error('Uso: node scripts/create-briefing.js "Nome" "email" ["tipo"]')
  process.exit(1)
}

const id = randomBytes(6).toString('hex')

const briefing = {
  clientName,
  clientEmail,
  projectType,
  status: 'pending',
  createdAt: new Date().toISOString(),
  submittedAt: null,
  responses: {}
}

await db.collection('briefings').doc(id).set(briefing)

console.log('\n✓ Briefing criado com sucesso!\n')
console.log(`  ID:    ${id}`)
console.log(`  Nome:  ${clientName}`)
console.log(`  Email: ${clientEmail}`)
console.log(`  Tipo:  ${projectType}`)
console.log(`\n  Link:  https://webazul.pt/briefing/${id}`)
console.log(`  Local: http://localhost:5173/briefing/${id}\n`)
