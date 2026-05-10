import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function LoginPage() {
  const [email, setEmail] = React.useState('chadavertv@gmail.com');
  const [message, setMessage] = React.useState('');
  const { signInWithMagicLink, user, isAdmin, loading } = useAuth();

  if (!loading && user && isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await signInWithMagicLink(email);
    setMessage(result.error ?? 'Check your email for the magic link.');
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-xl items-center px-4">
      <form onSubmit={onSubmit} className="w-full rounded-[2rem] border border-white/10 bg-zinc-950/70 p-8 text-white">
        <div className="text-xs uppercase tracking-[0.24em] text-violet-300/80">Admin login</div>
        <h1 className="mt-2 text-3xl font-semibold">Secure the admin panel</h1>
        <p className="mt-3 text-sm leading-6 text-zinc-400">Only allowlisted admin accounts can access /admin. Use Supabase magic link login.</p>
        <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-6 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white" type="email" />
        <button className="mt-4 w-full rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-3 text-sm font-semibold text-white">Send magic link</button>
        <p className="mt-4 text-sm text-violet-200">{message}</p>
      </form>
    </div>
  );
}
