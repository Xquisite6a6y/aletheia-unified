export default function Login({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-4">Aletheia</h1>
        <p className="text-xl text-slate-300 mb-8">Unified Boa + Agentic AI Platform</p>
        <button
          onClick={onLogin}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-3 rounded-lg font-semibold"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
