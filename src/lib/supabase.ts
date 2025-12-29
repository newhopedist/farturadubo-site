import { createClient } from '@supabase/supabase-js'

// Tenta pegar as variáveis com prefixo NEXT_PUBLIC_ (padrão Next.js)
// ou sem prefixo (padrão de algumas integrações de servidor)
// Usamos valores placeholder se não existirem para evitar que o createClient lance erro síncrono e derrube a aplicação.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || 'placeholder'

if (supabaseUrl === 'https://placeholder.supabase.co') {
  console.error('⚠️ AVISO: Variáveis de ambiente do Supabase não encontradas. Usando valores placeholder.')
  console.error('Verifique se NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY estão configuradas.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)