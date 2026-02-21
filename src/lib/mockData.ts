// Mock data and scoring logic for Founder MRI

export interface UploadedFile {
  name: string;
  platform: 'bank' | 'shopify' | 'amazon' | 'meta_ads' | 'google_ads';
  rows: number;
  status: 'uploaded' | 'processing' | 'ready' | 'error';
}

export interface RiskMetrics {
  creditScore: number;
  defaultProbability: number;
  fraudRisk: 'Low' | 'Medium' | 'High';
  riskTier: 'A' | 'B' | 'C' | 'D';
  recommendedLoan: number;
  monthlyRevenue: number;
  avgMonthlyProfit: number;
  burnRate: number;
  cashRunway: number;
  revenueVolatility: number;
  refundRatio: number;
  platformDependency: number;
  cacTrend: number;
  roas: number;
  adSpendVolatility: number;
}

export interface CashFlowForecast {
  month: string;
  revenue: number;
  expenses: number;
  netCashFlow: number;
  cumulative: number;
}

export interface StressTestParams {
  cpmIncrease: number;
  refundIncrease: number;
  platformFeeIncrease: number;
  revenueDrop: number;
}

export interface StressTestResult {
  cashRunway: number;
  survivalProbability: number;
  riskScoreChange: number;
  newRiskScore: number;
}

export interface InsightItem {
  type: 'warning' | 'danger' | 'success' | 'info';
  title: string;
  description: string;
  severity: number;
}

export const mockRiskMetrics: RiskMetrics = {
  creditScore: 72,
  defaultProbability: 8.3,
  fraudRisk: 'Low',
  riskTier: 'B',
  recommendedLoan: 285000,
  monthlyRevenue: 142000,
  avgMonthlyProfit: 95000,
  burnRate: 47000,
  cashRunway: 8.2,
  revenueVolatility: 0.18,
  refundRatio: 0.034,
  platformDependency: 0.67,
  cacTrend: 24.5,
  roas: 3.8,
  adSpendVolatility: 0.22,
};

export const mockCashFlowForecast: CashFlowForecast[] = [
  { month: 'Mar 2025', revenue: 142000, expenses: 98000, netCashFlow: 44000, cumulative: 44000 },
  { month: 'Apr 2025', revenue: 148000, expenses: 101000, netCashFlow: 47000, cumulative: 91000 },
  { month: 'May 2025', revenue: 155000, expenses: 105000, netCashFlow: 50000, cumulative: 141000 },
  { month: 'Jun 2025', revenue: 139000, expenses: 108000, netCashFlow: 31000, cumulative: 172000 },
  { month: 'Jul 2025', revenue: 162000, expenses: 112000, netCashFlow: 50000, cumulative: 222000 },
  { month: 'Aug 2025', revenue: 170000, expenses: 115000, netCashFlow: 55000, cumulative: 277000 },
];

export const mockMonthlyRevenue = [
  { month: 'Sep', revenue: 98000 },
  { month: 'Oct', revenue: 112000 },
  { month: 'Nov', revenue: 134000 },
  { month: 'Dec', revenue: 158000 },
  { month: 'Jan', revenue: 128000 },
  { month: 'Feb', revenue: 142000 },
];

export const mockRefundData = [
  { month: 'Sep', refunds: 2800, orders: 820 },
  { month: 'Oct', refunds: 3100, orders: 940 },
  { month: 'Nov', refunds: 4200, orders: 1120 },
  { month: 'Dec', refunds: 5100, orders: 1340 },
  { month: 'Jan', refunds: 3800, orders: 1060 },
  { month: 'Feb', refunds: 4100, orders: 1180 },
];

export const mockPlatformRevenue = [
  { name: 'Shopify', value: 67, color: 'hsl(199, 89%, 48%)' },
  { name: 'Amazon', value: 22, color: 'hsl(38, 92%, 50%)' },
  { name: 'Direct', value: 11, color: 'hsl(152, 69%, 45%)' },
];

export const mockFeatureImportance = [
  { feature: 'Revenue Volatility', importance: 0.23, direction: 'negative' as const },
  { feature: 'Cash Runway', importance: 0.19, direction: 'positive' as const },
  { feature: 'Platform Dependency', importance: 0.16, direction: 'negative' as const },
  { feature: 'ROAS Trend', importance: 0.14, direction: 'positive' as const },
  { feature: 'Refund Ratio', importance: 0.11, direction: 'negative' as const },
  { feature: 'CAC Trend', importance: 0.09, direction: 'negative' as const },
  { feature: 'Ad Spend Pattern', importance: 0.05, direction: 'neutral' as const },
  { feature: 'Revenue Growth', importance: 0.03, direction: 'positive' as const },
];

export const mockInsights: InsightItem[] = [
  {
    type: 'warning',
    title: 'High Platform Concentration Risk',
    description: 'Revenue dependency on a single platform (Shopify: 67%) creates significant channel risk. Diversification to 3+ channels would reduce concentration risk tier from High to Low.',
    severity: 7,
  },
  {
    type: 'danger',
    title: 'Aggressive Scaling Behavior Detected',
    description: 'Ad spend increased 42% month-over-month in December without proportional revenue growth. This pattern correlates with 2.3x higher default probability in our cohort analysis.',
    severity: 8,
  },
  {
    type: 'success',
    title: 'Healthy Revenue Stability',
    description: 'Monthly revenue coefficient of variation is 0.18, below the 0.25 threshold. Revenue trend shows consistent upward trajectory with manageable seasonal dips.',
    severity: 3,
  },
  {
    type: 'info',
    title: 'Settlement Cycle Optimization Available',
    description: 'Average settlement delay is 4.2 days. Switching to daily payouts could improve cash runway by 0.8 months and reduce short-term liquidity risk.',
    severity: 5,
  },
  {
    type: 'warning',
    title: 'Refund Spike Pattern Detected',
    description: 'Refund spike pattern in November matches high-risk cohort behavior (correlation: 0.72). Pattern suggests potential product quality issues or aggressive promotion tactics.',
    severity: 6,
  },
  {
    type: 'success',
    title: 'Strong Unit Economics',
    description: 'LTV:CAC ratio of 3.8x indicates healthy customer acquisition efficiency. Payback period of 2.1 months is well within industry benchmarks.',
    severity: 2,
  },
];

export function computeStressTest(
  baseMetrics: RiskMetrics,
  params: StressTestParams
): StressTestResult {
  const revenueFactor = 1 - params.revenueDrop / 100;
  const costIncrease = (params.cpmIncrease / 100) * 0.3 + (params.platformFeeIncrease / 100) * 0.2;
  const refundImpact = (params.refundIncrease / 100) * baseMetrics.monthlyRevenue * 0.05;

  const adjustedRevenue = baseMetrics.monthlyRevenue * revenueFactor;
  const adjustedExpenses = (baseMetrics.monthlyRevenue - baseMetrics.avgMonthlyProfit) * (1 + costIncrease) + refundImpact;
  const adjustedProfit = adjustedRevenue - adjustedExpenses;

  const cashRunway = adjustedProfit > 0
    ? Math.max(0, (baseMetrics.cashRunway * adjustedProfit) / baseMetrics.avgMonthlyProfit)
    : Math.max(0, baseMetrics.cashRunway * 0.3);

  const riskScoreChange = Math.round(
    (params.revenueDrop * 0.4 + params.cpmIncrease * 0.2 + params.refundIncrease * 0.25 + params.platformFeeIncrease * 0.15) * 0.3
  );

  const newRiskScore = Math.max(0, Math.min(100, baseMetrics.creditScore - riskScoreChange));
  const survivalProbability = Math.max(5, Math.min(99, 100 - riskScoreChange * 1.5 - (params.revenueDrop > 30 ? 20 : 0)));

  return { cashRunway: Math.round(cashRunway * 10) / 10, survivalProbability: Math.round(survivalProbability), riskScoreChange, newRiskScore };
}
