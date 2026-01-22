import { supabaseAdmin } from '@/lib/supabaseAdmin'

function toCsv(rows: any[]) {
  const headers = ['id', 'name', 'email', 'whatsapp', 'page', 'created_at']
  const escape = (v: any) => {
    if (v == null) return ''
    const s = String(v).replace(/"/g, '""')
    return `"${s}"`
  }
  const lines = [headers.join(',')]
  for (const r of rows) {
    lines.push(headers.map((h) => escape(r[h])).join(','))
  }
  return lines.join('\n')
}

export async function GET(req: Request) {
  const url = new URL(req.url)
  const token = url.searchParams.get('token') || req.headers.get('x-export-token') || ''
  if (!process.env.LEADS_EXPORT_TOKEN || token !== process.env.LEADS_EXPORT_TOKEN) {
    return new Response('Unauthorized', { status: 401 })
  }
  const { data, error } = await supabaseAdmin
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) {
    return new Response('Error', { status: 500 })
  }
  const csv = toCsv(data || [])
  return new Response(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="leads.csv"',
    },
  })
}

