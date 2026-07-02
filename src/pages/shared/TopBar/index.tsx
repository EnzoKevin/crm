import { Bell } from "lucide-react";

interface TopBarProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export default function TopBar({ title, subtitle, actions }: TopBarProps) {
  return (
    <div className="flex items-center justify-between px-8 py-5 bg-card border-b border-border">
      <div>
        <h1
          className="text-foreground text-xl font-semibold"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {title}
        </h1>
        {subtitle && <p className="text-muted-foreground text-sm mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        {actions}
        <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
          <Bell className="w-4 h-4 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#0EA47A] rounded-full" />
        </button>
      </div>
    </div>
  );
}
