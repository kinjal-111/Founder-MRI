import { Link, useLocation } from 'react-router-dom';
import { Activity, BarChart3, Shield, FileText, Zap } from 'lucide-react';

const navItems = [
  { path: '/', label: 'Home', icon: Activity },
  { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  { path: '/stress-test', label: 'Stress Test', icon: Zap },
  { path: '/insights', label: 'Insights', icon: Shield },
];

const AppNav = () => {
  const location = useLocation();

  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container flex items-center justify-between h-14">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <FileText className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-foreground tracking-tight">Founder MRI</span>
        </Link>
        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default AppNav;
