import { NextResponse } from 'next/server'

// Fallback implementation without Supabase
export async function POST(req: Request) {
  try {
    const data = await req.json()
    
    // Log para desenvolvimento - pode ser substituído por integração com email ou outro serviço
    console.log('Formulário de contato recebido:', {
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      message: data.message,
      interest: data.interest,
      timestamp: new Date().toISOString()
    })

    // Simula sucesso - pode ser substituído por envio de email ou outro serviço
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 })
  }
}