import { useState } from 'react';
import { trpc } from './lib/trpc';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { data: user } = trpc.auth.me.useQuery();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      {user ? (
        <Dashboard user={user} />
      ) : (
        <Login onLogin={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
}
