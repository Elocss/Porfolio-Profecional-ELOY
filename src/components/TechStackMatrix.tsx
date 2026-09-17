import React, { useState } from 'react';
import { profileData } from '../data/profile';
import { Terminal, Cpu, Database, Server, Sparkles, Layers, ShieldCheck } from 'lucide-react';

export const TechStackMatrix: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...profileData.skills.map((s) => s.category)];

  const filteredSkills = selectedCategory === 'All'
    ? profileData.skills
    : profileData.skills.filter((s) => s.category === selectedCategory);

  return (
    <section id="stack" className="py-24 sm:py-32 relative">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-mono uppercase text-[#ffb829] tracking-widest block mb-3 font-semibold flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-[#ffb829]" />
            CAPACIDADES TÉCNICAS & ARQUITECTURA
          </span>
          <h2 className="text-3xl sm:text-5xl font-normal tracking-[-0.04em] text-white leading-tight">
            Ecosistema de Herramientas, Modelos & Datos.
          </h2>
          <p className="text-sm sm:text-base text-[#bdbdbd] font-extralight mt-4 leading-relaxed">
            Especialización profunda en el ciclo de vida de agentes autónomos: orquestación de grafos con LangGraph, observabilidad y reducción de costos con Langfuse, y procesamiento de datos numéricos y relacionales.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase transition-all ${
                selectedCategory === cat
                  ? 'bg-[#8052ff] text-white shadow-[0_0_20px_rgba(128,82,255,0.4)]'
                  : 'bg-white/[0.03] text-[#9a9a9a] hover:text-white hover:bg-white/[0.08] border border-white/5'
              }`}
            >
              {cat === 'All' ? 'Todo el Stack' : cat}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredSkills.map((categoryGroup, idx) => (
            <div
              key={idx}
              className="bg-black/50 border border-white/10 rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:border-[#8052ff]/40 transition-colors"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-6 text-white font-semibold text-base">
                  {idx === 0 && <Cpu className="w-5 h-5 text-[#8052ff]" />}
                  {idx === 1 && <Database className="w-5 h-5 text-[#ffb829]" />}
                  {idx === 2 && <Server className="w-5 h-5 text-[#15846e]" />}
                  <span>{categoryGroup.category}</span>
                </div>

                <div className="space-y-4">
                  {categoryGroup.items.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-white font-medium">{skill.name}</span>
                        <span className="text-[#8052ff] font-mono">{skill.level}%</span>
                      </div>
                      
                      {/* Level Progress Bar */}
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#8052ff] to-[#ffb829] rounded-full transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>

                      {/* Tag badges */}
                      <div className="flex flex-wrap gap-1 pt-1">
                        {skill.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] font-mono text-[#9a9a9a] bg-white/[0.02] px-2 py-0.5 rounded border border-white/5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 text-[11px] font-mono text-[#9a9a9a] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#15846e]" />
                Verificado en entornos de producción
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
