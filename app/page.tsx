export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 text-white">
      <nav className="border-b border-slate-800 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">FinanceAI Pro V2.0</h1>
          <div className="space-x-4">
            <a href="/auth/login" className="text-slate-400 hover:text-white">Login</a>
            <a href="/auth/signup" className="bg-orange-500 px-4 py-2 rounded hover:bg-orange-600">Sign Up</a>
          </div>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <h2 className="text-5xl font-bold mb-4">Premium Personal Finance for LATAM</h2>
        <p className="text-xl text-slate-400 mb-8">AI-powered debt management, receipt scanning, and intelligent recommendations</p>
        <button className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 font-semibold">
          Get Started Free
        </button>
      </section>
    </main>
  )
}
