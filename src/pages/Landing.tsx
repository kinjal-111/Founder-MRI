import { Link } from 'react-router-dom';
import { ArrowRight, Shield, BarChart3, Zap, FileText, TrendingUp, AlertTriangle } from 'lucide-react';

const features = [
  { icon: Shield, title: 'AI Risk Scoring', desc: 'Multi-dimensional credit scoring across revenue, operations, and behavior signals.' },
  { icon: BarChart3, title: 'Cash Flow Intelligence', desc: '6-month forward projections with confidence intervals and scenario modeling.' },
  { icon: AlertTriangle, title: 'Fraud Detection', desc: 'Anomaly detection across transactions, refunds, and ad spend patterns.' },
  { icon: Zap, title: 'Stress Testing', desc: 'Simulate market shocks, ad cost spikes, and revenue contractions in real-time.' },
  { icon: TrendingUp, title: 'Founder Behavior', desc: 'Behavioral cohort analysis comparing against 10,000+ D2C founder profiles.' },
  { icon: FileText, title: 'Underwriting Reports', desc: 'Institutional-grade PDF reports ready for credit committees and LPs.' },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="gradient-mesh absolute inset-0" />
        <div className="scanline absolute inset-0 pointer-events-none" />
        <div className="container relative pt-32 pb-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-2 border border-border text-xs font-mono text-muted-foreground mb-6">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse-slow" />
              AI-POWERED UNDERWRITING ENGINE
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-[1.05] tracking-tight">
              The Bloomberg Terminal for{' '}
              <span className="text-terminal-cyan">D2C Underwriting</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              Founder MRI ingests bank statements, platform sales, and ad data to generate institutional-grade credit risk analysis in seconds.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Launch Dashboard <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-surface-3 transition-colors"
              >
                How It Works
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { value: '< 30s', label: 'Analysis Time' },
              { value: '92%', label: 'Prediction Accuracy' },
              { value: '50+', label: 'Risk Signals' },
              { value: '$2.1B', label: 'Volume Assessed' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl sm:text-3xl font-bold font-mono text-terminal-cyan">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 border-t border-border">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground">Enterprise-Grade Risk Intelligence</h2>
            <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
              Purpose-built for fintech lenders, banks, and embedded capital platforms.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-foreground font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-border">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-foreground">Ready to underwrite smarter?</h2>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto">
            Start analyzing founder data in under 30 seconds. No integration required.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity"
          >
            Get Started <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container flex items-center justify-between text-xs text-muted-foreground">
          <span>© 2025 Founder MRI. All rights reserved.</span>
          <span className="font-mono">v1.0.0</span>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
