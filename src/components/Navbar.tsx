import React, { useState, useEffect } from 'react';
import { Bot, Terminal, Cpu, GraduationCap, FolderGit2, Sparkles, Menu, X, ArrowUpRight } from 'lucide-react';
import { profileData } from '../data/profile';

interface NavbarProps {
  onOpenAgentShowcase: () => void;
  onOpenCVModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAgentShowcase }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/85 backdrop-blur-md border-b border-white/[0.06] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo Lockup */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8052ff] to-[#15846e] p-[1.5px] transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-black rounded-[6px] flex items-center justify-center">
              <span className="text-[#8052ff] font-mono text-sm font-bold">EA</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-semibold text-sm tracking-wide group-hover:text-[#ffb829] transition-colors">
              {profileData.name.toUpperCase()}
            </span>
            <span className="text-[#9a9a9a] text-[11px] font-mono tracking-wider">
              AI ENGINEER // DATA SCIENTIST
            </span>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#agentes"
            className="text-xs uppercase tracking-[0.05em] font-semibold text-[#9a9a9a] hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Bot className="w-3.5 h-3.5 text-[#8052ff]" />
            Agentes Vivos
          </a>
          <a
            href="#arquitectura"
            className="text-xs uppercase tracking-[0.05em] font-semibold text-[#9a9a9a] hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Cpu className="w-3.5 h-3.5 text-[#ffb829]" />
            Arquitectura
          </a>
          <a
            href="#stack"
            className="text-xs uppercase tracking-[0.05em] font-semibold text-[#9a9a9a] hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Terminal className="w-3.5 h-3.5 text-[#15846e]" />
            Tech Stack
          </a>
          <a
            href="#datascience"
            className="text-xs uppercase tracking-[0.05em] font-semibold text-[#9a9a9a] hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#8052ff]" />
            Data Science
          </a>
          <a
            href="#trayectoria"
            className="text-xs uppercase tracking-[0.05em] font-semibold text-[#9a9a9a] hover:text-white transition-colors flex items-center gap-1.5"
          >
            <GraduationCap className="w-3.5 h-3.5 text-[#bdbdbd]" />
            CV & Trayectoria
          </a>
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={profileData.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-wider text-[#9a9a9a] hover:text-white transition-colors flex items-center gap-1 font-mono"
            title="Ver GitHub"
          >
            <FolderGit2 className="w-4 h-4 text-white/80" />
            GitHub
            <ArrowUpRight className="w-3 h-3 opacity-60" />
          </a>

          {/* Primary Action Violet Pill Button */}
          <button
            onClick={onOpenAgentShowcase}
            className="relative group bg-[#8052ff] hover:bg-[#6c3cf0] text-white text-xs uppercase font-semibold tracking-[0.03em] px-5 py-2.5 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(128,82,255,0.4)] hover:shadow-[0_0_30px_rgba(128,82,255,0.7)] flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-[#ffb829] animate-ping" />
            <span>Ejecutar Agentes</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white/80 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 border-b border-white/10 px-6 py-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <a
            href="#agentes"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-semibold uppercase tracking-wider text-white/80 hover:text-white py-2 flex items-center gap-2"
          >
            <Bot className="w-4 h-4 text-[#8052ff]" />
            Agentes Vivos
          </a>
          <a
            href="#arquitectura"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-semibold uppercase tracking-wider text-white/80 hover:text-white py-2 flex items-center gap-2"
          >
            <Cpu className="w-4 h-4 text-[#ffb829]" />
            Arquitectura
          </a>
          <a
            href="#stack"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-semibold uppercase tracking-wider text-white/80 hover:text-white py-2 flex items-center gap-2"
          >
            <Terminal className="w-4 h-4 text-[#15846e]" />
            Tech Stack
          </a>
          <a
            href="#datascience"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-semibold uppercase tracking-wider text-white/80 hover:text-white py-2 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#8052ff]" />
            Data Science
          </a>
          <a
            href="#trayectoria"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-semibold uppercase tracking-wider text-white/80 hover:text-white py-2 flex items-center gap-2"
          >
            <GraduationCap className="w-4 h-4 text-[#bdbdbd]" />
            CV & Trayectoria
          </a>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAgentShowcase();
              }}
              className="w-full bg-[#8052ff] text-white text-xs uppercase font-semibold tracking-wider py-3 rounded-full flex items-center justify-center gap-2"
            >
              <Bot className="w-4 h-4" />
              Ejecutar Agentes en Vivo
            </button>
            <a
              href={profileData.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center text-xs uppercase font-mono text-[#9a9a9a] py-2"
            >
              Ver Repositorios en GitHub →
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
