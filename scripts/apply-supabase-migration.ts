import fs from 'node:fs/promises'
import path from 'node:path'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

// Assert environment variable types to satisfy strict TypeScript
const url: string | undefined = process.env.SUPABASE_URL
const serviceRoleKey: string | undefined = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !serviceRoleKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in env')
  process.exit(1)
}

async function main() {
  try {
    const filePath = path.resolve('supabase/migrations/create_contacts_products.sql')
    const sql = await fs.readFile(filePath, 'utf8')

    const endpoint = `${url}/postgres/v1/query`
    const headers: HeadersInit = {
      Authorization: `Bearer ${serviceRoleKey!}`,
      apikey: serviceRoleKey!,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }

    const res = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query: sql }),
    })

    if (!res.ok) {
      const text = await res.text()
      console.error('Migration failed:', res.status, res.statusText, text)
      process.exit(2)
    }

    const result = await res.json().catch(() => null)
    console.log('Migration applied successfully.', result || '')
    process.exit(0)
  } catch (e: any) {
    console.error('Runtime error:', e.message)
    process.exit(3)
  }
}

main()