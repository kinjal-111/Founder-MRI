import { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart,
} from 'recharts';
import AppNav from '@/components/AppNav';
import KPICard from '@/components/KPICard';
import RiskGauge from '@/components/RiskGauge';
import DataUploadPanel from '@/components/DataUploadPanel';
import {
  mockRiskMetrics, mockCashFlowForecast, mockMonthlyRevenue,
  mockRefundData, mockPlatformRevenue, mockFeatureImportance,
  type UploadedFile,
} from '@/lib/mockData';

const Dashboard = () => {
  const [files, setFiles] = useState<Record<string, UploadedFile | null>>({});
  const [analyzed, setAnalyzed] = useState(true); // Start with demo data

  const metrics = mockRiskMetrics;

  return (
    <div className="min-h-screen bg-background">
      <AppNav />
      <div className="container py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Risk Analysis Dashboard</h1>
            <p className="text-sm text-muted-foreground">Demo analysis · Last updated: Feb 21, 2025</p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-success/10 text-terminal-green border border-success/20">
            TIER {metrics.riskTier}
          </span>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <KPICard label="Credit Score" value={`${metrics.creditScore}`} subValue="out of 100" variant="primary" />
          <KPICard label="Default Probability" value={`${metrics.defaultProbability}%`} subValue="12-month horizon" variant="success" />
          <KPICard label="Fraud Risk" value={metrics.fraudRisk} variant="success" />
          <KPICard label="Recommended Loan" value={`$${(metrics.recommendedLoan / 1000).toFixed(0)}K`} subValue="3x avg net profit" variant="primary" />
          <KPICard label="Cash Runway" value={`${metrics.cashRunway} mo`} subValue={`Burn: $${(metrics.burnRate / 1000).toFixed(0)}K/mo`} variant="warning" />
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left column - Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Revenue Chart */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-sm font-semibold text-foreground mb-4">Monthly Revenue Trend</h3>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={mockMonthlyRevenue}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 18%)" />
                  <XAxis dataKey="month" tick={{ fill: 'hsl(215, 15%, 55%)', fontSize: 12 }} axisLine={false} />
                  <YAxis tick={{ fill: 'hsl(215, 15%, 55%)', fontSize: 12 }} axisLine={false} tickFormatter={(v) => `$${v / 1000}K`} />
                  <Tooltip
                    contentStyle={{ background: 'hsl(220, 18%, 10%)', border: '1px solid hsl(220, 16%, 18%)', borderRadius: 8, fontSize: 12 }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="hsl(199, 89%, 48%)" fill="url(#revGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Cash Flow Forecast */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-sm font-semibold text-foreground mb-4">6-Month Cash Flow Forecast</h3>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={mockCashFlowForecast}>
                  <defs>
                    <linearGradient id="cfGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(152, 69%, 45%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(152, 69%, 45%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 18%)" />
                  <XAxis dataKey="month" tick={{ fill: 'hsl(215, 15%, 55%)', fontSize: 12 }} axisLine={false} />
                  <YAxis tick={{ fill: 'hsl(215, 15%, 55%)', fontSize: 12 }} axisLine={false} tickFormatter={(v) => `$${v / 1000}K`} />
                  <Tooltip
                    contentStyle={{ background: 'hsl(220, 18%, 10%)', border: '1px solid hsl(220, 16%, 18%)', borderRadius: 8, fontSize: 12 }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                  />
                  <Area type="monotone" dataKey="cumulative" stroke="hsl(152, 69%, 45%)" fill="url(#cfGrad)" strokeWidth={2} name="Cumulative" />
                  <Line type="monotone" dataKey="netCashFlow" stroke="hsl(199, 89%, 48%)" strokeWidth={2} dot={false} name="Net Cash Flow" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Refund + Platform row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-sm font-semibold text-foreground mb-4">Refund Volume</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={mockRefundData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 18%)" />
                    <XAxis dataKey="month" tick={{ fill: 'hsl(215, 15%, 55%)', fontSize: 12 }} axisLine={false} />
                    <YAxis tick={{ fill: 'hsl(215, 15%, 55%)', fontSize: 12 }} axisLine={false} />
                    <Tooltip contentStyle={{ background: 'hsl(220, 18%, 10%)', border: '1px solid hsl(220, 16%, 18%)', borderRadius: 8, fontSize: 12 }} />
                    <Bar dataKey="refunds" fill="hsl(38, 92%, 50%)" radius={[4, 4, 0, 0]} name="Refunds ($)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-sm font-semibold text-foreground mb-4">Revenue by Platform</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={mockPlatformRevenue}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      strokeWidth={0}
                    >
                      {mockPlatformRevenue.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: 'hsl(220, 18%, 10%)', border: '1px solid hsl(220, 16%, 18%)', borderRadius: 8, fontSize: 12 }} formatter={(v: number) => [`${v}%`, '']} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-4 mt-2">
                  {mockPlatformRevenue.map((p) => (
                    <div key={p.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                      {p.name} ({p.value}%)
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Risk Gauge */}
            <div className="bg-card border border-border rounded-xl p-6 flex flex-col items-center">
              <div className="relative">
                <RiskGauge score={metrics.creditScore} />
              </div>
              <div className="w-full mt-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Risk Tier</span>
                  <span className="font-mono font-semibold text-foreground">Tier {metrics.riskTier}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Default Prob.</span>
                  <span className="font-mono font-semibold text-foreground">{metrics.defaultProbability}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Fraud Risk</span>
                  <span className="font-mono font-semibold text-terminal-green">{metrics.fraudRisk}</span>
                </div>
              </div>
            </div>

            {/* Feature Importance */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-sm font-semibold text-foreground mb-4">Risk Feature Importance</h3>
              <div className="space-y-3">
                {mockFeatureImportance.map((f) => (
                  <div key={f.feature}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">{f.feature}</span>
                      <span className={`font-mono ${f.direction === 'positive' ? 'text-terminal-green' : f.direction === 'negative' ? 'text-terminal-red' : 'text-muted-foreground'}`}>
                        {(f.importance * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-surface-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          f.direction === 'positive' ? 'bg-success' : f.direction === 'negative' ? 'bg-danger' : 'bg-muted-foreground'
                        }`}
                        style={{ width: `${f.importance * 100 * 4}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upload Panel */}
            <DataUploadPanel
              files={files}
              onUpload={(p, f) => setFiles((prev) => ({ ...prev, [p]: f }))}
              onRemove={(p) => setFiles((prev) => ({ ...prev, [p]: null }))}
              onAnalyze={() => setAnalyzed(true)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
