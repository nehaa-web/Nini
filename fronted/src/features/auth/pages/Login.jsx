import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hook/useAuth";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleLogin } = useAuth();
    const navigate = useNavigate();

const user = useSelector((state) => state.auth.user);
const loading = useSelector((state) => state.auth.loading);


 async function handleSubmit(e) {
  e.preventDefault();

  const payload = {
    email,
    password,
  };

  const success = await handleLogin(payload);

  if (success) {
    navigate("/");
  }
}

if (loading) {
  return <div>Loading...</div>;
}

if (user) {
  return <Navigate to="/" replace />;
}

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#100b0d] px-4 py-12 text-white sm:px-6">
      <section className="w-full max-w-md rounded-3xl border border-[rgba(20,107,116,0.5)] bg-black/35 p-7 shadow-2xl shadow-[rgba(20,107,116,0.5)] backdrop-blur-xl sm:p-10">
        <div className="mb-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[rgba(20,107,116,0.5)]">
            Welcome back
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Sign in to continue
          </h1>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              className="mb-2 block text-sm font-medium text-zinc-200"
              htmlFor="login-email"
            >
              Email address
            </label>
            <input
              className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-[rgba(20,107,116,0.5)] focus:ring-2 focus:ring-[rgba(20,107,116,0.5)]"
              id="login-email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              type="email"
              value={email}
            />
          </div>
          <div>
            <label
              className="mb-2 block text-sm font-medium text-zinc-200"
              htmlFor="login-password"
            >
              Password
            </label>
            <input
              className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-[rgba(20,107,116,0.5)] focus:ring-2 focus:ring-[rgba(20,107,116,0.5)]"
              id="login-password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              type="password"
              value={password}
            />
          </div>
          <button
            className="w-full rounded-xl bg-[rgba(20,107,116,0.5)] px-4 py-3.5 font-semibold shadow-lg shadow-[rgba(20,107,116,0.5)] transition hover:bg-[rgba(20,107,116,0.7)] focus:outline-none focus:ring-2 focus:ring-[rgba(20,107,116,0.5)] focus:ring-offset-2 focus:ring-offset-[#1a1012]"
            type="submit"
          >
            Sign in
          </button>
        </form>

        
          {/* <p className="mt-5 rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-center text-sm text-emerald-300">
            Login details submitted successfully.
          </p> */}
      
        <p className="mt-8 text-center text-sm text-zinc-400">
          New here?{" "}
          <Link
            className="font-semibold text-[rgba(20,107,116,0.5)] transition hover:text-[rgba(20,107,116,0.7)]"
            to="/register"
          >
            Create an account
          </Link>
        </p>
      </section>
    </main>
  );
};

export default Login;
