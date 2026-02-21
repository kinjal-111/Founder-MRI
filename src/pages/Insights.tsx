import AppNav from '@/components/AppNav';
import { mockInsights, mockRiskMetrics, type InsightItem } from '@/lib/mockData';
import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';

const iconMap = {
  warning: AlertTriangle,
  danger: XCircle,
  success: CheckCircle,
  info: Info,
};

const colorMap = {
  warning: 'border-warning/30 bg-warning/5',
  danger: 'border-danger/30 bg-danger/5',
  success: 'border-success/30 bg-success/5',
  info: 'border-primary/30 bg-primary/5',
};

const iconColorMap = {
  warning: 'text-warning',
  danger: 'text-danger',
  success: 'text-success',
  info: 'text-primary',
};

function InsightCard({ insight }: { insight: InsightItem }) {
  const Icon = iconMap[insight.type];
  return (
    <div className={`border rounded-xl p-5 ${colorMap[insight.type]}`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${iconColorMap[insight.type]}`} />
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-1">{insight.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{insight.description}</p>
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Severity:</span>
            <div className="flex gap-0.5">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-sm ${
                    i < insight.severity
                      ? insight.type === 'danger' ? 'bg-danger' : insight.type === 'warning' ? 'bg-warning' : insight.type === 'success' ? 'bg-success' : 'bg-primary'
                      : 'bg-surface-3'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Insights = () => {
  const metrics = mockRiskMetrics;
  const sorted = [...mockInsights].sort((a, b) => b.severity - a.severity);
  const riskDrivers = sorted.filter((i) => i.type === 'danger' || i.type === 'warning').slice(0, 5);
  const positives = sorted.filter((i) => i.type === 'success');

  return (
    <div className="min-h-screen bg-background">
      <AppNav />
      <div className="container py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Underwriting Insights Report</h1>
          <p className="text-sm text-muted-foreground">AI-generated founder behavior analysis and risk intelligence.</p>
        </div>

        {/* Summary Banner */}
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Overall Assessment</p>
              <p className="text-lg font-bold text-terminal-cyan">Tier {metrics.riskTier} — Moderate Risk</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Risk Signals</p>
              <p className="text-lg font-bold text-terminal-amber">{riskDrivers.length} Identified</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Positive Signals</p>
              <p className="text-lg font-bold text-terminal-green">{positives.length} Identified</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Recommendation</p>
              <p className="text-lg font-bold text-foreground">Approve w/ Conditions</p>
            </div>
          </div>
        </div>

        {/* Insights Grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {sorted.map((insight, i) => (
            <InsightCard key={i} insight={insight} />
          ))}
        </div>

        {/* Executive Summary */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Executive Summary</h3>
          <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
            <p>
              The subject D2C business demonstrates a <strong className="text-foreground">moderate risk profile</strong> with a credit score of {metrics.creditScore}/100 and default probability of {metrics.defaultProbability}%. Revenue generation is consistent with a volatility coefficient of {metrics.revenueVolatility}, within acceptable parameters.
            </p>
            <p>
              Primary concerns center around <strong className="text-foreground">platform concentration risk</strong> ({(metrics.platformDependency * 100).toFixed(0)}% single-platform dependency) and aggressive scaling behavior detected in recent ad spend patterns. These factors are partially offset by strong unit economics (ROAS: {metrics.roas}x) and adequate cash runway ({metrics.cashRunway} months).
            </p>
            <p>
              <strong className="text-foreground">Recommendation:</strong> Approve lending at ${(metrics.recommendedLoan / 1000).toFixed(0)}K (3x average monthly net profit) with quarterly performance review covenants and platform diversification milestones.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
