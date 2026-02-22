import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Lock, Calendar } from 'lucide-react';

interface PrescriptionCardProps {
  tokenId: number;
  doctor: string;
  date: string;
  status: 'ativa' | 'usada' | 'expirada';
  coOwners: number;
}

export function PrescriptionCard({ tokenId, doctor, date, status, coOwners }: PrescriptionCardProps) {
  const statusColors = {
    ativa: 'default',
    usada: 'secondary',
    expirada: 'destructive'
  } as const;

  return (
    <Card className="group hover:shadow-xl hover:border-primary-200 transition-all duration-300 border border-primary-100/50 overflow-hidden bg-white/50 backdrop-blur-sm">
      <CardHeader className="pb-3 space-y-3">
        <div className="flex items-center justify-between">
          <Badge variant={statusColors[status]} className="uppercase tracking-wider font-bold text-[10px]">
            {status.toUpperCase()}
          </Badge>
          <div className="flex items-center space-x-1 text-xs text-muted-foreground bg-primary-50 px-2 py-1 rounded-full">
            <Users className="w-3 h-3 text-primary-600" />
            <span className="font-medium text-primary-700">{coOwners} médicos</span>
          </div>
        </div>
        <div className="space-y-1">
          <h3 className="font-bold text-lg text-primary-900 group-hover:text-primary-600 transition-colors">
            Prescrição #{tokenId}
          </h3>
          <p className="text-sm font-medium text-gray-700">Dr(a). {doctor}</p>
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            <Calendar className="w-3 h-3 mr-1" />
            {new Date(date).toLocaleDateString('pt-BR')}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-dashed border-gray-100">
          <Button variant="outline" size="sm" className="flex-1 text-xs h-8 border-primary-200 hover:bg-primary-50 text-primary-700">
            Ver Dados <Lock className="w-3 h-3 ml-1" />
          </Button>
          <Button size="sm" className="flex-1 text-xs h-8 bg-primary-600 hover:bg-primary-700 shadow-sm disabled:opacity-50" disabled={status !== 'ativa'}>
            Comprar Agora
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
