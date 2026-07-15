import { trpc } from '../lib/trpc';

export default function Dashboard({ user }: { user: any }) {
  const { data: boaStatus } = trpc.boa.getStatus.useQuery();
  const { data: aletheiaStatus } = trpc.aletheia.getStatus.useQuery();
  const executeGoal = trpc.aletheia.executeGoal.useMutation();

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
            Aletheia Unified
          </h1>
          <p className="text-slate-300">Boa Daemon Orchestration + Agentic AI System</p>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Boa Status */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">🐍 Boa Daemon System</h2>
            <div className="space-y-2 text-slate-300">
              <p>Status: <span className="text-green-400 font-semibold">Online</span></p>
              <p>Last Heartbeat: {boaStatus?.lastHeartbeat || 'N/A'}</p>
              <p>Uptime: {Math.floor((boaStatus?.uptime || 0) / 60)}m</p>
            </div>
          </div>

          {/* Aletheia Status */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">🧠 Aletheia Agentic System</h2>
            <div className="space-y-2 text-slate-300">
              <p>Status: <span className="text-green-400 font-semibold">{aletheiaStatus?.status}</span></p>
              <p>Version: {aletheiaStatus?.version}</p>
              <p>Capabilities: {aletheiaStatus?.capabilities?.length || 0} active</p>
            </div>
          </div>
        </div>

        {/* Goal Execution */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Execute Agentic Goal</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              executeGoal.mutate({
                objective: formData.get('objective') as string,
                branches: 3,
              });
            }}
            className="space-y-4"
          >
            <input
              type="text"
              name="objective"
              placeholder="Enter your goal..."
              className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white placeholder-slate-400"
              required
            />
            <button
              type="submit"
              disabled={executeGoal.isPending}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 text-white px-6 py-2 rounded font-semibold"
            >
              {executeGoal.isPending ? 'Executing...' : 'Execute Goal'}
            </button>
          </form>

          {executeGoal.data && (
            <div className="mt-6 p-4 bg-slate-700 rounded">
              <p className="text-green-400 font-semibold mb-2">✓ Goal Executed Successfully</p>
              <pre className="text-slate-300 text-sm overflow-auto">
                {JSON.stringify(executeGoal.data, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
