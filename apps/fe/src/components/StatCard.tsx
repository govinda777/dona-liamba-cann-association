import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
}

export function StatCard({ icon: Icon, title, subtitle }: StatCardProps) {
  return (
    <Card className="border-none shadow-lg bg-white/80 backdrop-blur hover:scale-105 transition-transform duration-300">
      <CardContent className="flex flex-col items-center justify-center p-8 text-center space-y-4">
        <div className="p-4 bg-primary-100 rounded-full text-primary-600 mb-2">
          <Icon className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-4xl font-bold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">{subtitle}</p>
        </div>
      </CardContent>
    </Card>
  );
}
