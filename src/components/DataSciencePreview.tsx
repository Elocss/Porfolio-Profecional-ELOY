import React from 'react';
import { upcomingDataScienceProjects } from '../data/projects';
import { Sparkles, TrendingUp, BarChart3, Clock, ArrowRight, Database } from 'lucide-react';

export const DataSciencePreview: React.FC = () => {
  return (
    <section id="datascience" className="py-24 sm:py-32 relative">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-mono uppercase text-[#ffb829] tracking-widest block mb-3 font-semibold flex items-center gap-2">
            <TrendingUp className="w-3.5 h-3.5 text-[#ffb829]" />
            DATA SCIENCE & REPORTES ESTADÍSTICOS
          </span>
          <h2 className="text-3xl sm:text-5xl font-normal tracking-[-0.04em] text-white leading-tight">
            Próximos Lanzamientos & Observatorios.
          </h2>
          <p className="text-sm sm:text-base text-[#bdbdbd] font-extralight mt-4 leading-relaxed">
            Módulos actualmente en fase final de modelado, benchmarking y visualización interactiva para toma de decisiones basadas en datos.
          </p>
        </div>

        {/* 2-Column Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {upcomingDataScienceProjects.map((project, idx) => (
            <div
              key={idx}
              className="relative bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10 rounded-3xl p-8 flex flex-col justify-between hover:border-[#ffb829]/50 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-3 py-1 text-[11px] font-mono uppercase bg-[#ffb829]/10 text-[#ffb829] border border-[#ffb829]/30 rounded-full font-semibold">
                    {project.status}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#9a9a9a]">
                    <Clock className="w-3.5 h-3.5 text-[#ffb829]" />
                    <span>{project.date}</span>
                  </div>
                </div>

                <h3 className="text-2xl font-normal text-white mb-2 group-hover:text-[#ffb829] transition-colors leading-snug">
                  {project.title}
                </h3>

                <p className="text-xs font-mono text-[#15846e] mb-4">
                  {project.organization}
                </p>

                <p className="text-xs sm:text-sm text-[#bdbdbd] font-extralight leading-relaxed mb-6">
                  {project.tagline}
                </p>

                <div className="space-y-2 mb-8 bg-black/60 p-4 rounded-2xl border border-white/5">
                  <span className="text-[11px] font-mono uppercase text-[#8052ff] block mb-2 font-semibold">
                    Alcance & Hitos Técnicos:
                  </span>
                  {project.features.map((feat, fIdx) => (
                    <div key={fIdx} className="text-xs text-[#bdbdbd] flex items-start gap-2">
                      <span className="text-[#ffb829] font-bold">›</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-[#9a9a9a]">
                  Entorno de Producción en Despliegue
                </span>
                <span className="text-xs font-mono text-[#ffb829] flex items-center gap-1">
                  En Construcción
                  <Sparkles className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
