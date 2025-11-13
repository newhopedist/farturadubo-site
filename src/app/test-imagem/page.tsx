export default function TestImagem() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Teste de Imagem</h1>
      <p className="mb-4">Abaixo está a imagem servida diretamente da pasta public:</p>
      <img src="/hero-Fart.webp" alt="Teste hero FARTURADUBO" className="w-full max-w-4xl border rounded" />
      <p className="mt-4 text-sm text-gray-600">Se você vê a imagem acima, o arquivo está acessível via /public.</p>
    </main>
  )
}