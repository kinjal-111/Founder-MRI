interface RiskGaugeProps {
  score: number;
  label?: string;
  size?: 'sm' | 'lg';
}

function getScoreColor(score: number): string {
  if (score >= 75) return 'text-terminal-green';
  if (score >= 50) return 'text-terminal-amber';
  return 'text-terminal-red';
}

function getScoreLabel(score: number): string {
  if (score >= 75) return 'Low Risk';
  if (score >= 50) return 'Moderate';
  return 'High Risk';
}

function getStrokeColor(score: number): string {
  if (score >= 75) return 'hsl(152, 69%, 45%)';
  if (score >= 50) return 'hsl(38, 92%, 50%)';
  return 'hsl(0, 72%, 51%)';
}

const RiskGauge = ({ score, label = 'Credit Score', size = 'lg' }: RiskGaugeProps) => {
  const radius = size === 'lg' ? 70 : 40;
  const strokeWidth = size === 'lg' ? 8 : 5;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  const svgSize = (radius + strokeWidth) * 2;

  return (
    <div className="flex flex-col items-center relative">
      <svg width={svgSize} height={svgSize} className="-rotate-90">
        <circle
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          r={radius}
          fill="none"
          stroke="hsl(220, 16%, 18%)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          r={radius}
          fill="none"
          stroke={getStrokeColor(score)}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center" style={{ width: svgSize, height: svgSize }}>
        <span className={`font-mono font-bold ${size === 'lg' ? 'text-4xl' : 'text-xl'} ${getScoreColor(score)}`}>
          {score}
        </span>
        <span className="text-xs text-muted-foreground">{getScoreLabel(score)}</span>
      </div>
      <p className="text-xs text-muted-foreground mt-2 font-medium uppercase tracking-wider">{label}</p>
    </div>
  );
};

export default RiskGauge;
