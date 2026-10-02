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
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900">
        <h1 className="animate-pulse font-poppins text-2xl font-medium tracking-widest text-white">
          Loading...
        </h1>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0C0E0F] px-4 py-12 text-[#FFFFFF] sm:px-6">
      <section className="w-full max-w-md rounded-3xl border border-[#C4C8D0]/10 bg-[#1A1D21] p-7 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-10">
        <div className="mb-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#21C0D0]">
            Welcome back
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-[#FFFFFF] sm:text-4xl">
            Sign in to continue
          </h1>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              className="mb-2 block text-sm font-medium text-[#C4C8D0]"
              htmlFor="login-email"
            >
              Email address
            </label>
            <input
              className="w-full rounded-xl border border-[#C4C8D0]/10 bg-[#121417] px-4 py-3 text-[#FFFFFF] outline-none transition placeholder:text-[#8E95A2] focus:border-[#21C0D0] focus:ring-2 focus:ring-[#21C0D0]/60"
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
              className="mb-2 block text-sm font-medium text-[#C4C8D0]"
              htmlFor="login-password"
            >
              Password
            </label>
            <input
              className="w-full rounded-xl border border-[#C4C8D0]/10 bg-[#121417] px-4 py-3 text-[#FFFFFF] outline-none transition placeholder:text-[#8E95A2] focus:border-[#21C0D0] focus:ring-2 focus:ring-[#21C0D0]/60"
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
            className="w-full rounded-xl bg-[#21C0D0] px-4 py-3.5 font-semibold text-[#000000] shadow-lg shadow-[#21C0D0]/20 transition hover:bg-[#4AD6E3] focus:outline-none focus:ring-2 focus:ring-[#21C0D0] focus:ring-offset-2 focus:ring-offset-[#0C0E0F]"
            type="submit"
          >
            Sign in
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-[#8E95A2]">
          New here?{" "}
          <Link
            className="font-semibold text-[#21C0D0] transition hover:text-[#4AD6E3]"
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
