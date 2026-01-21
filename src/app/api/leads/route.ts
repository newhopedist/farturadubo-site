import { supabase } from '@/lib/supabase'

export async function POST(req: Request) {
  try {
    const { name, email, whatsapp, page } = await req.json()
    if (!name || !email || !whatsapp) {
      return new Response(JSON.stringify({ ok: false, error: 'Dados obrigatórios ausentes' }), { status: 400 })
    }

    let stored = false
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const { error } = await supabase.from('leads').insert({
        name,
        email,
        whatsapp,
        page: page || 'unknown',
        created_at: new Date().toISOString(),
      })
      if (!error) stored = true
    }

    return new Response(JSON.stringify({ ok: true, stored }), { status: 200 })
  } catch (e) {
    return new Response(JSON.stringify({ ok: false }), { status: 500 })
  }
}

