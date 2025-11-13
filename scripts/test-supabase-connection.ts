import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

dotenv.config({ path: '.env.local' })

const url = process.env.SUPABASE_URL
const key = process.env.SUPABASE_ANON_KEY

if (!url || !key) {
  console.error('Missing SUPABASE_URL or SUPABASE_ANON_KEY in env')
  process.exit(1)
}

const supabase = createClient(url, key)

async function main() {
  try {
    const { data, error } = await supabase
      .from('contacts')
      .select('id')
      .limit(1)

    if (error) {
      const code = (error as any).code || ''
      const msg = (error as any).message || ''
      if (code === '42P01' || /does not exist|relation .* does not exist/i.test(msg)) {
        console.log('Conexão OK. Tabela contacts ainda não existe.')
        process.exit(0)
      }
      console.error('Query error:', error.message)
      process.exit(2)
    }

    console.log('Conexão OK. Retorno:', data)
    process.exit(0)
  } catch (e: any) {
    console.error('Runtime error:', e.message)
    process.exit(3)
  }
}

main()