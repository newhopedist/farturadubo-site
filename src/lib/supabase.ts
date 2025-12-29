import { createClient } from '@supabase/supabase-js'

// Tenta pegar as variáveis com prefixo NEXT_PUBLIC_ (padrão Next.js)
// ou sem prefixo (padrão de algumas integrações de servidor)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  // Em tempo de build, isso pode causar erro se as variáveis não estiverem definidas.
  // Vamos logar um aviso claro.
  console.error('❌ Erro Crítico: Variáveis de ambiente do Supabase não encontradas.')
  console.error('Verifique se NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY estão configuradas.')
  
  // Para evitar crash total no import, lançamos erro apenas se for usado
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Supabase URL e Anon Key são obrigatórios para produção.')
  }
}

export const supabase = createClient(supabaseUrl!, supabaseAnonKey!)