import React, { useState } from 'react';
import { profileData } from '../data/profile';
import { 
  Mail, Phone, MessageSquare, FolderGit2, FileText, 
  ArrowUpRight, Check, Copy, Send, Sparkles 
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(profileData.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contacto" className="py-24 sm:py-32 relative bg-black border-t border-white/10">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Availability */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono uppercase text-[#8052ff] tracking-widest block font-semibold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#ffb829]" />
              INICIEMOS CONVERSACIÓN
            </span>
            <h2 className="text-3xl sm:text-5xl font-normal tracking-[-0.04em] text-white leading-tight">
              Construyamos el próximo ecosistema de agentes.
            </h2>
            <p className="text-sm sm:text-base text-[#bdbdbd] font-extralight leading-relaxed">
              Disponible para roles de **AI Engineer**, **Data Specialist**, consultoría técnica e implementación de arquitecturas multi-agente en producción.
            </p>

            {/* Quick Status Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-[#15846e] animate-pulse" />
              <span className="text-white">Disponible para contratación & proyectos remotos</span>
            </div>
          </div>

          {/* Right Column: Contact Action Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* WhatsApp Card */}
            <a
              href={profileData.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0a0a0a] hover:bg-[#111111] border border-white/10 hover:border-[#15846e] rounded-3xl p-6 flex flex-col justify-between transition-all group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-10 h-10 rounded-2xl bg-[#15846e]/15 border border-[#15846e]/30 flex items-center justify-center text-[#15846e]">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#9a9a9a] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <div>
                <span className="text-xs font-mono text-[#9a9a9a] block mb-1 uppercase">WhatsApp Directo</span>
                <span className="text-white font-medium text-sm">{profileData.contact.phone}</span>
                <p className="text-[11px] text-[#bdbdbd] mt-1 font-light">Respuesta inmediata</p>
              </div>
            </a>

            {/* Email Card with Copy Button */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-6">
                <div className="w-10 h-10 rounded-2xl bg-[#8052ff]/15 border border-[#8052ff]/30 flex items-center justify-center text-[#8052ff]">
                  <Mail className="w-5 h-5" />
                </div>
                <button
                  onClick={copyEmail}
                  className="p-2 text-[#9a9a9a] hover:text-white hover:bg-white/10 rounded-xl transition-colors text-xs flex items-center gap-1 font-mono"
                  title="Copiar email"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div>
                <span className="text-xs font-mono text-[#9a9a9a] block mb-1 uppercase">Email Profesional</span>
                <a
                  href={`mailto:${profileData.contact.email}`}
                  className="text-white font-medium text-xs sm:text-sm hover:text-[#ffb829] transition-colors break-all"
                >
                  {profileData.contact.email}
                </a>
                <p className="text-[11px] text-emerald-400 mt-1 font-mono">
                  {copied ? '¡Copiado al portapapeles!' : 'Clic para enviar mail'}
                </p>
              </div>
            </div>

            {/* GitHub Card */}
            <a
              href={profileData.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0a0a0a] hover:bg-[#111111] border border-white/10 hover:border-[#8052ff] rounded-3xl p-6 flex flex-col justify-between transition-all group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                  <FolderGit2 className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#9a9a9a] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <div>
                <span className="text-xs font-mono text-[#9a9a9a] block mb-1 uppercase">Repositorios & Código</span>
                <span className="text-white font-medium text-sm">github.com/Elocss</span>
                <p className="text-[11px] text-[#bdbdbd] mt-1 font-light">Código fuente abierto</p>
              </div>
            </a>

            {/* Download CV PDF Card */}
            <a
              href="/Eloy_Alcala_CV_Data_Engineering.pdf"
              download="Eloy_Alcala_CV_Data_Engineering.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#8052ff]/10 hover:bg-[#8052ff]/20 border border-[#8052ff]/40 hover:border-[#8052ff] rounded-3xl p-6 flex flex-col justify-between transition-all group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-10 h-10 rounded-2xl bg-[#8052ff] text-white flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <div>
                <span className="text-xs font-mono text-[#ffb829] block mb-1 uppercase font-semibold">Currículum Vitae PDF</span>
                <span className="text-white font-semibold text-sm">Descargar / Ver CV</span>
                <p className="text-[11px] text-[#bdbdbd] mt-1 font-light">Actualizado 2026 (PDF)</p>
              </div>
            </a>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#9a9a9a]">
          <p>© 2026 {profileData.name} — Data Science & AI Engineering Portfolio.</p>
          <div className="flex items-center gap-6">
            <span>LangGraph</span>
            <span>•</span>
            <span>MCP Protocol</span>
            <span>•</span>
            <span>Langfuse Observability</span>
          </div>
        </div>
      </div>
    </section>
  );
};
