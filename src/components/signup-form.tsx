import { useState } from "react";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Sign up failed");
      setSuccess("Sign up successful! You can now sign in.");
      setEmail("");
      setPassword("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto bg-gray-900 p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
      {error && <div className="bg-red-500 text-white p-2 rounded">{error}</div>}
      {success && <div className="bg-green-500 text-white p-2 rounded">{success}</div>}
      <div>
        <label className="block mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white"
          required
        />
      </div>
      <div>
        <label className="block mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded"
        disabled={loading}
      >
        {loading ? "Signing up..." : "Sign Up"}
      </button>
    </form>
  );
} 