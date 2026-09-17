import React from 'react';
import { Bot, Code, ArrowUpRight, Sparkles, Cpu, Activity, Play } from 'lucide-react';
import { ProjectItem } from '../data/projects';

interface ProjectCardProps {
  project: ProjectItem;
  onAwakenAgent: (project: ProjectItem) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onAwakenAgent }) => {
  return (
    <div className="group relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.08] hover:border-[#8052ff]/50 transition-all duration-500 flex flex-col justify-between hover:shadow-[0_0_50px_rgba(128,82,255,0.15)]">
      {/* Top Header Badge & Category */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="px-3 py-1 text-[11px] font-mono uppercase bg-[#8052ff]/10 text-[#8052ff] border border-[#8052ff]/30 rounded-full font-semibold">
            {project.badge}
          </span>
          <span className="text-[11px] font-mono text-[#9a9a9a] uppercase">
            {project.category}
          </span>
        </div>

        {/* Monolithic Title */}
        <h3 className="text-xl sm:text-2xl font-normal tracking-[-0.03em] text-white group-hover:text-[#ffb829] transition-colors mb-3 leading-snug">
          {project.title}
        </h3>

        {/* Tagline & Summary */}
        <p className="text-xs sm:text-sm text-[#bdbdbd] font-extralight leading-relaxed mb-6">
          {project.summary}
        </p>

        {/* Live Metrics Strip */}
        <div className="grid grid-cols-2 gap-2 mb-6 p-3 rounded-2xl bg-black/60 border border-white/5 font-mono text-xs">
          <div>
            <span className="text-[10px] text-[#9a9a9a] block">OBSERVABILIDAD</span>
            <span className="text-white font-semibold text-xs">{project.metrics[0]?.value || 'Langfuse'}</span>
          </div>
          <div>
            <span className="text-[10px] text-[#9a9a9a] block">LATENCIA MEDIA</span>
            <span className="text-[#15846e] font-semibold text-xs">{project.metrics[1]?.value || '< 1.5s'}</span>
          </div>
        </div>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-1.5 mb-8">
          {project.techStack.map((tech, i) => (
            <span
              key={i}
              className="px-2.5 py-1 text-[11px] font-mono bg-white/[0.03] hover:bg-white/[0.08] text-[#9a9a9a] hover:text-white rounded-lg border border-white/5 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Action Footer Buttons */}
      <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono uppercase text-[#9a9a9a] hover:text-white flex items-center gap-1.5 transition-colors group/link"
        >
          <Code className="w-3.5 h-3.5 text-white/70" />
          <span>GitHub</span>
          <ArrowUpRight className="w-3 h-3 opacity-60 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
        </a>

        {/* The Signature Violet Pill: Awaken Agent */}
        <button
          onClick={() => onAwakenAgent(project)}
          className="relative bg-[#8052ff] hover:bg-[#6c3cf0] text-white text-xs uppercase font-semibold tracking-wider px-5 py-2.5 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(128,82,255,0.4)] hover:shadow-[0_0_30px_rgba(128,82,255,0.8)] flex items-center gap-2"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Despertar Agente</span>
        </button>
      </div>
    </div>
  );
};
