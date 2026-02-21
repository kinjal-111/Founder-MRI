interface KPICardProps {
  label: string;
  value: string;
  subValue?: string;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'primary';
}

const variantStyles = {
  default: 'border-border',
  success: 'border-success/30 glow-success',
  warning: 'border-warning/30 glow-warning',
  danger: 'border-danger/30 glow-danger',
  primary: 'border-primary/30 glow-primary',
};

const valueStyles = {
  default: 'text-foreground',
  success: 'text-terminal-green',
  warning: 'text-terminal-amber',
  danger: 'text-terminal-red',
  primary: 'text-terminal-cyan',
};

const KPICard = ({ label, value, subValue, variant = 'default' }: KPICardProps) => (
  <div className={`bg-card border rounded-xl p-5 ${variantStyles[variant]}`}>
    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">{label}</p>
    <p className={`text-2xl font-bold font-mono ${valueStyles[variant]}`}>{value}</p>
    {subValue && <p className="text-xs text-muted-foreground mt-1">{subValue}</p>}
  </div>
);

export default KPICard;
