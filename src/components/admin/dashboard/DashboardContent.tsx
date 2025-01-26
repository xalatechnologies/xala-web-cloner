import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DashboardContent() {
  return (
    <main className="flex-1 overflow-y-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-white font-chakra">Dashboard</h1>
      </div>

      <Card className="border-none bg-gradient-to-br from-gray-900/50 to-gray-800/50">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white font-chakra">Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white/70">Welcome to your dashboard.</p>
        </CardContent>
      </Card>
    </main>
  );
}