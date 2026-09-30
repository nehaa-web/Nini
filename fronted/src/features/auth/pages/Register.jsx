import { useAuth } from '../hook/useAuth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {

   const { handleRegister } = useAuth();

    const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      email,
      username,
      password
    }
    await handleRegister(payload);
    navigate("/");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0C0E0F] px-4 py-12 text-[#FFFFFF] sm:px-6">
      <section className="w-full max-w-md rounded-3xl border border-[#C4C8D0]/10 bg-[#1A1D21] p-7 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-10">
        <div className="mb-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[rgba(20,107,116,0.5)]">Join the conversation</p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Create your account</h1>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium text-[#C4C8D0]" htmlFor="register-username">Username</label>
            <input className="w-full rounded-xl border border-[#C4C8D0]/10 bg-[#121417] px-4 py-3 text-[#FFFFFF] outline-none transition placeholder:text-[#8E95A2] focus:border-[#21C0D0] focus:ring-2 focus:ring-[#21C0D0]/60"
             id="register-username" 
             name="username" 
             onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username" 
              required 
              type="text" 
              value={username} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-[#C4C8D0]" htmlFor="register-email">Email address</label>
            <input className="w-full rounded-xl border border-[#C4C8D0]/10 bg-[#121417] px-4 py-3 text-[#FFFFFF] outline-none transition placeholder:text-[#8E95A2] focus:border-[#21C0D0] focus:ring-2 focus:ring-[#21C0D0]/60" 
            id="register-email" 
            name="email" 
            onChange={(e) => setEmail(e.target.value)}
             placeholder="you@example.com" 
             required
              type="email"
               value={email} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-[#C4C8D0]" htmlFor="register-password">Password</label>
            <input className="w-full rounded-xl border border-[#C4C8D0]/10 bg-[#121417] px-4 py-3 text-[#FFFFFF] outline-none transition placeholder:text-[#8E95A2] focus:border-[#21C0D0] focus:ring-2 focus:ring-[#21C0D0]/60" 
            id="register-password" name="password"
             onChange={(e) => setPassword(e.target.value)} 
            placeholder="Create a password" 
            required
             type="password" 
             value={password} />
          </div>
          <button className="w-full rounded-xl bg-[#21C0D0] px-4 py-3.5 font-semibold text-[#000000] shadow-lg shadow-[#21C0D0]/20 transition hover:bg-[#4AD6E3] focus:outline-none focus:ring-2 focus:ring-[#21C0D0] focus:ring-offset-2 focus:ring-offset-[#0C0E0F]" type="submit">Create account</button>
        </form>

        <p className="mt-8 text-center text-sm text-[#8E95A2]">Already have an account? <Link className="font-semibold text-[#21C0D0] transition hover:text-[#4AD6E3]" to="/login">Sign in</Link></p>
      </section>
    </main>
  )
}

export default Register