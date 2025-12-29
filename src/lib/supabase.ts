import { createClient } from '@supabase/supabase-js'

// Tenta pegar as variáveis com prefixo NEXT_PUBLIC_ (padrão Next.js)
// ou sem prefixo (padrão de algumas integrações de servidor)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  // Em tempo de build ou se as variáveis não estiverem configuradas, logamos o erro.
  // Não lançamos erro fatal para não derrubar a aplicação inteira (Erro 500).
  console.error('❌ Erro Crítico: Variáveis de ambiente do Supabase não encontradas.')
  console.error('Verifique se NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY estão configuradas no painel da Vercel.')
}

// Cria o cliente mesmo com strings vazias para evitar crash no import.
// As chamadas subsequentes falharão, mas o site carregará.
export const supabase = createClient(supabaseUrl, supabaseAnonKey)