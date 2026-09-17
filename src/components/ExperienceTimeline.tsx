import React from 'react';
import { profileData } from '../data/profile';
import { GraduationCap, Award, Calendar, CheckCircle, Sparkles, Building2 } from 'lucide-react';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="trayectoria" className="py-24 sm:py-32 relative bg-black">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-mono uppercase text-[#8052ff] tracking-widest block mb-3 font-semibold flex items-center gap-2">
            <GraduationCap className="w-3.5 h-3.5 text-[#8052ff]" />
            TRAYECTORIA & FORMACIÓN ACADÉMICA
          </span>
          <h2 className="text-3xl sm:text-5xl font-normal tracking-[-0.04em] text-white leading-tight">
            Formación Especializada & Proyectos de Impacto.
          </h2>
          <p className="text-sm sm:text-base text-[#bdbdbd] font-extralight mt-4 leading-relaxed">
            Especialización continua en ingeniería de inteligencia artificial, arquitecturas multi-agente, modelado predictivo y ciencia de datos aplicada.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="relative border-l border-white/10 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {profileData.education.map((item, index) => (
            <div key={index} className="relative group">
              {/* Timeline Bullet */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-black border-2 border-[#8052ff] group-hover:scale-125 group-hover:bg-[#ffb829] group-hover:border-black transition-all" />

              {/* Card Container */}
              <div className="bg-gradient-to-b from-white/[0.03] to-transparent border border-white/[0.08] rounded-3xl p-6 sm:p-8 hover:border-[#8052ff]/40 transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="px-3 py-1 text-[11px] font-mono uppercase bg-[#8052ff]/15 text-[#8052ff] rounded-full border border-[#8052ff]/30 font-semibold">
                    {item.tag}
                  </span>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#9a9a9a]">
                    <Calendar className="w-3.5 h-3.5 text-[#ffb829]" />
                    <span>{item.date}</span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-normal text-white mb-1">
                  {item.degree}
                </h3>

                <div className="flex items-center gap-2 text-xs font-mono text-[#15846e] mb-5 font-semibold">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{item.institution}</span>
                </div>

                <ul className="space-y-2.5">
                  {item.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} className="text-xs sm:text-sm text-[#bdbdbd] font-extralight flex items-start gap-2.5">
                      <span className="text-[#8052ff] font-bold mt-0.5">›</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
