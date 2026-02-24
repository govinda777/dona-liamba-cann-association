'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="mb-12">
      <Card className="overflow-hidden border-primary-200 shadow-lg">
        {!isPlaying ? (
          <div className="aspect-video bg-slate-900 flex items-center justify-center relative group cursor-pointer" onClick={() => setIsPlaying(true)}>
            {/* Placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-900/50 to-slate-900/80 group-hover:opacity-90 transition-opacity"></div>
            <Button size="lg" className="relative z-10 rounded-full w-20 h-20 bg-white hover:bg-white/90 text-primary-700 shadow-xl transition-transform group-hover:scale-110">
              <Play className="w-10 h-10 ml-1 fill-current" />
            </Button>
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="font-bold text-lg">Cannabis Medicinal Legal: Guia Completo 2024</h3>
              <p className="text-sm opacity-90">⏱ 3:45 minutos</p>
            </div>
          </div>
        ) : (
          <div className="aspect-video bg-slate-900 relative overflow-hidden">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/SEU_VIDEO_ID?autoplay=1"
              title="Cannabis Medicinal Legal: Guia Completo 2024"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
        <CardContent className="p-6 bg-white">
          <p className="text-slate-600 text-sm">
            Entenda como funciona o processo legal, quais condições podem ser tratadas e os passos para iniciar seu tratamento com segurança.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
