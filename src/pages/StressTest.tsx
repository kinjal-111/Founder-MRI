import { useState } from 'react';
import AppNav from '@/components/AppNav';
import KPICard from '@/components/KPICard';
import { mockRiskMetrics, computeStressTest, type StressTestParams } from '@/lib/mockData';
import { Slider } from '@/components/ui/slider';

const defaultParams: StressTestParams = {
  cpmIncrease: 0,
  refundIncrease: 0,
  platformFeeIncrease: 0,
  revenueDrop: 0,
};

const sliders: { key: keyof StressTestParams; label: string; max: number; unit: string }[] = [
  { key: 'revenueDrop', label: 'Revenue Drop', max: 80, unit: '%' },
  { key: 'cpmIncrease', label: 'Ad CPM Increase', max: 100, unit: '%' },
  { key: 'refundIncrease', label: 'Refund Increase', max: 100, unit: '%' },
  { key: 'platformFeeIncrease', label: 'Platform Fee Increase', max: 50, unit: '%' },
];

const StressTest = () => {
  const [params, setParams] = useState<StressTestParams>(defaultParams);
  const result = computeStressTest(mockRiskMetrics, params);
  const hasStress = Object.values(params).some((v) => v > 0);

  return (
    <div className="min-h-screen bg-background">
      <AppNav />
      <div className="container py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Stress Test Simulator</h1>
          <p className="text-sm text-muted-foreground">Simulate adverse market conditions and assess business resilience.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Sliders */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-sm font-semibold text-foreground mb-6">Scenario Parameters</h3>
              <div className="space-y-8">
                {sliders.map((s) => (
                  <div key={s.key}>
                    <div className="flex justify-between text-sm mb-3">
                      <span className="text-muted-foreground">{s.label}</span>
                      <span className={`font-mono font-semibold ${params[s.key] > 0 ? 'text-terminal-amber' : 'text-foreground'}`}>
                        {params[s.key]}{s.unit}
                      </span>
                    </div>
                    <Slider
                      value={[params[s.key]]}
                      onValueChange={([v]) => setParams((p) => ({ ...p, [s.key]: v }))}
                      max={s.max}
                      step={1}
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={() => setParams(defaultParams)}
                className="mt-6 w-full px-4 py-2 text-sm text-muted-foreground bg-surface-2 rounded-lg hover:bg-surface-3 transition-colors"
              >
                Reset to Baseline
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <KPICard
                label="New Risk Score"
                value={`${result.newRiskScore}`}
                subValue={hasStress ? `${result.riskScoreChange > 0 ? '-' : '+'}${Math.abs(result.riskScoreChange)} pts` : 'No change'}
                variant={result.newRiskScore >= 60 ? 'success' : result.newRiskScore >= 40 ? 'warning' : 'danger'}
              />
              <KPICard
                label="Cash Runway"
                value={`${result.cashRunway} mo`}
                subValue={hasStress ? `Was ${mockRiskMetrics.cashRunway} mo` : 'Baseline'}
                variant={result.cashRunway >= 6 ? 'success' : result.cashRunway >= 3 ? 'warning' : 'danger'}
              />
              <KPICard
                label="Survival Prob."
                value={`${result.survivalProbability}%`}
                subValue="12-month horizon"
                variant={result.survivalProbability >= 70 ? 'success' : result.survivalProbability >= 40 ? 'warning' : 'danger'}
              />
              <KPICard
                label="Score Change"
                value={`-${result.riskScoreChange}`}
                subValue="points"
                variant={result.riskScoreChange <= 5 ? 'success' : result.riskScoreChange <= 15 ? 'warning' : 'danger'}
              />
            </div>

            {/* Impact Analysis */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-sm font-semibold text-foreground mb-4">Impact Analysis</h3>
              {!hasStress ? (
                <p className="text-sm text-muted-foreground">Adjust the sliders to simulate stress scenarios and see their impact on the business.</p>
              ) : (
                <div className="space-y-4">
                  {params.revenueDrop > 0 && (
                    <ImpactRow
                      label="Revenue Contraction"
                      description={`A ${params.revenueDrop}% revenue drop would reduce monthly income to $${((mockRiskMetrics.monthlyRevenue * (1 - params.revenueDrop / 100)) / 1000).toFixed(0)}K.${params.revenueDrop > 30 ? ' This level of contraction significantly increases default probability.' : ''}`}
                      severity={params.revenueDrop > 40 ? 'danger' : params.revenueDrop > 20 ? 'warning' : 'info'}
                    />
                  )}
                  {params.cpmIncrease > 0 && (
                    <ImpactRow
                      label="Ad Cost Pressure"
                      description={`CPM increase of ${params.cpmIncrease}% would raise CAC by ~${(params.cpmIncrease * 0.6).toFixed(0)}%. Current ROAS of ${mockRiskMetrics.roas}x would decline to ~${(mockRiskMetrics.roas / (1 + params.cpmIncrease / 200)).toFixed(1)}x.`}
                      severity={params.cpmIncrease > 50 ? 'danger' : 'warning'}
                    />
                  )}
                  {params.refundIncrease > 0 && (
                    <ImpactRow
                      label="Refund Spike"
                      description={`Refund rate would increase from ${(mockRiskMetrics.refundRatio * 100).toFixed(1)}% to ${(mockRiskMetrics.refundRatio * (1 + params.refundIncrease / 100) * 100).toFixed(1)}%. This may trigger platform review thresholds.`}
                      severity={params.refundIncrease > 50 ? 'danger' : 'warning'}
                    />
                  )}
                  {params.platformFeeIncrease > 0 && (
                    <ImpactRow
                      label="Margin Compression"
                      description={`Platform fee increase of ${params.platformFeeIncrease}% would compress margins by ~${(params.platformFeeIncrease * 0.15).toFixed(1)} percentage points.`}
                      severity={params.platformFeeIncrease > 25 ? 'warning' : 'info'}
                    />
                  )}
                </div>
              )}
            </div>

            {/* Recommendation */}
            {hasStress && (
              <div className={`border rounded-xl p-6 ${
                result.survivalProbability >= 70 ? 'bg-success/5 border-success/20' :
                result.survivalProbability >= 40 ? 'bg-warning/5 border-warning/20' :
                'bg-danger/5 border-danger/20'
              }`}>
                <h3 className={`text-sm font-semibold mb-2 ${
                  result.survivalProbability >= 70 ? 'text-terminal-green' :
                  result.survivalProbability >= 40 ? 'text-terminal-amber' :
                  'text-terminal-red'
                }`}>
                  {result.survivalProbability >= 70 ? 'Resilient Under Stress' :
                   result.survivalProbability >= 40 ? 'Moderate Vulnerability' :
                   'Critical Risk Level'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {result.survivalProbability >= 70
                    ? 'The business demonstrates sufficient resilience under this stress scenario. Lending recommendation remains favorable with adjusted terms.'
                    : result.survivalProbability >= 40
                    ? 'This scenario reveals moderate vulnerabilities. Consider reduced loan amount or shorter tenure with performance covenants.'
                    : 'This stress scenario indicates critical business risk. Lending is not recommended under these market conditions without significant structural changes.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

function ImpactRow({ label, description, severity }: { label: string; description: string; severity: 'info' | 'warning' | 'danger' }) {
  const colorMap = { info: 'border-primary/20', warning: 'border-warning/20', danger: 'border-danger/20' };
  const dotMap = { info: 'bg-primary', warning: 'bg-warning', danger: 'bg-danger' };
  return (
    <div className={`border-l-2 ${colorMap[severity]} pl-4`}>
      <div className="flex items-center gap-2 mb-1">
        <span className={`w-1.5 h-1.5 rounded-full ${dotMap[severity]}`} />
        <span className="text-sm font-medium text-foreground">{label}</span>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

export default StressTest;
