
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((currentData) => ({ ...currentData, [name]: value }))
    setSubmitted(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
    console.log('Login submitted:', formData)
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#100b0d] px-4 py-12 text-white sm:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(239,68,68,0.28),_transparent_38%),radial-gradient(circle_at_bottom_right,_rgba(127,29,29,0.4),_transparent_42%)]" />
      <section className="relative w-full max-w-md rounded-3xl border border-red-200/15 bg-black/35 p-7 shadow-2xl shadow-red-950/40 backdrop-blur-xl sm:p-10">
        <div className="mb-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-red-300">Welcome back</p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Sign in to continue</h1>
          <p className="mt-3 text-sm leading-6 text-zinc-400">Pick up your conversations right where you left them.</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-200" htmlFor="login-email">Email address</label>
            <input className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-400 focus:ring-2 focus:ring-red-500/20" id="login-email" name="email" onChange={handleChange} placeholder="you@example.com" required type="email" value={formData.email} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-200" htmlFor="login-password">Password</label>
            <input className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-400 focus:ring-2 focus:ring-red-500/20" id="login-password" name="password" onChange={handleChange} placeholder="Enter your password" required type="password" value={formData.password} />
          </div>
          <button className="w-full rounded-xl bg-gradient-to-r from-red-500 to-rose-700 px-4 py-3.5 font-semibold shadow-lg shadow-red-950/40 transition hover:from-red-400 hover:to-rose-600 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2 focus:ring-offset-[#1a1012]" type="submit">Sign in</button>
        </form>

        {submitted && <p className="mt-5 rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-center text-sm text-emerald-300">Login details submitted successfully.</p>}
        <p className="mt-8 text-center text-sm text-zinc-400">New here? <Link className="font-semibold text-red-300 transition hover:text-red-200" to="/register">Create an account</Link></p>
      </section>
    </main>
  )
}

export default Login