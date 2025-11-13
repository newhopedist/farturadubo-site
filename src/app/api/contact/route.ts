import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const data = await req.json()

    const { error } = await supabase
      .from('contacts')
      .insert([{
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        message: data.message,
        interest: data.interest,
        created_at: new Date().toISOString()
      }])

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 400 })
    }

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 })
  }
}