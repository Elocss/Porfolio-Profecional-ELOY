import React, { useState, useEffect, useRef } from 'react';
import { HeroConstellation } from './components/HeroConstellation';
import { Navbar } from './components/Navbar';
import { ProjectCard } from './components/ProjectCard';
import { LivingAgentModal } from './components/LivingAgentModal';
import { HeroDataSciencePanel } from './components/HeroDataSciencePanel';
import { ScientificDataWorkbench } from './components/ScientificDataWorkbench';
import { AgentVoiceAvatar } from './components/AgentVoiceAvatar';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { DataSciencePreview } from './components/DataSciencePreview';
import { ContactSection } from './components/ContactSection';
import { featuredProjects, ProjectItem } from './data/projects';
import { 
  Bot, ArrowDown, Sparkles, Terminal, Cpu, Layers, 
  CheckCircle2, ArrowRight, ShieldCheck, Database, FileText
} from 'lucide-react';

export function App() {
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);

  const fullSpeechText = "Agentes autónomos que piensan, razonan y ejecutan para producción, con sistemas de inteligencia artificial que transforman datos en acción autónoma. Diseño e implementación de ecosistemas multi-agente, arquitecturas RAG avanzadas con observabilidad en tiempo real con Langfuse, inferencia predictiva y validación estricta con Pydantic.";

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(fullSpeechText);
      utterance.lang = 'es-ES';
      utterance.rate = 1.0;
      utterance.pitch = 0.95;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      synthRef.current = utterance;
    }
  }, []);

  const handleToggleSpeech = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    if (synthRef.current) {
      const voices = window.speechSynthesis.getVoices();
      const spanishVoice = voices.find(
        (v) => v.lang.startsWith('es') || v.name.includes('Spanish') || v.name.includes('Google español')
      );
      if (spanishVoice) {
        synthRef.current.voice = spanishVoice;
      }

      window.speechSynthesis.speak(synthRef.current);
      setIsSpeaking(true);
    }
  };

  const handleOpenShowcase = () => {
    setActiveProject(featuredProjects[0]);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#8052ff] selection:text-white">
      {/* Top Navigation */}
      <Navbar onOpenAgentShowcase={handleOpenShowcase} />

      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
        {/* Interactive Neural Constellation Canvas */}
        <HeroConstellation />

        {/* Hero Content Container: Left = Telemetry / Right = Agent & Speech */}
        <div className="relative z-10 max-w-[1280px] w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Interactive Data Science & Telemetry Panel (Charts: Bars, Candlestick, Radar) */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <HeroDataSciencePanel />
          </div>

          {/* RIGHT COLUMN: The Living AI Agent Speaker & Core Monolithic Presentation */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            {/* Kicker Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono uppercase tracking-wider text-[#ffb829]">
              <span className="w-2 h-2 rounded-full bg-[#8052ff] animate-pulse" />
              <span>SISTEMAS AGÉNTICOS & CIENCIA DE DATOS</span>
            </div>

            {/* Futuristic AI Agent Speaker Trigger & Equalizer */}
            <AgentVoiceAvatar
              isSpeaking={isSpeaking}
              onToggleSpeech={handleToggleSpeech}
            />

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[62px] font-normal tracking-[-0.04em] leading-[1.04] text-white">
              Agentes autónomos que <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-[#8052ff]">piensan y razonan</span> para producción.
            </h1>

            {/* Sub-headline */}
            <h2 className="text-lg sm:text-xl text-[#ffb829] font-light tracking-[-0.02em]">
              Sistemas de IA que transforman datos en acción autónoma.
            </h2>

            {/* Light Body Text */}
            <p className="text-sm sm:text-base text-[#bdbdbd] font-extralight max-w-2xl leading-relaxed">
              Diseño e implementación de ecosistemas multi-agente, arquitecturas RAG avanzadas con observabilidad en tiempo real (Langfuse), inferencia predictiva y validación estricta con Pydantic.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={handleOpenShowcase}
                className="bg-[#8052ff] hover:bg-[#6c3cf0] text-white text-xs sm:text-sm uppercase font-semibold tracking-wider px-7 py-3.5 rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(128,82,255,0.45)] hover:shadow-[0_0_40px_rgba(128,82,255,0.75)] flex items-center gap-2.5"
              >
                <Bot className="w-4 h-4" />
                <span>Interactuar con los Agentes</span>
              </button>

              <a
                href="#agentes"
                className="px-6 py-3.5 rounded-full text-xs sm:text-sm uppercase font-mono tracking-wider text-white/80 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 transition-colors flex items-center gap-2"
              >
                <span>Explorar Repositorios</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </a>

              <a
                href="/Eloy_Alcala_CV_Data_Engineering.pdf"
                download="Eloy_Alcala_CV_Data_Engineering.pdf"
                className="text-xs uppercase font-mono tracking-wider text-[#9a9a9a] hover:text-[#ffb829] flex items-center gap-1.5 py-3 transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                Descargar CV (PDF)
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Main Feature Section: Living Multi-Agent Repositories */}
      <section id="agentes" className="py-24 sm:py-32 relative bg-black border-t border-white/5">
        <div className="max-w-[1280px] mx-auto px-6">
          {/* Section Heading Block */}
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono uppercase text-[#8052ff] tracking-widest block mb-3 font-semibold flex items-center gap-2">
              <Bot className="w-3.5 h-3.5 text-[#8052ff]" />
              REPOSITORIOS DE CÓDIGO AGÉNTICO EN VIVO
            </span>
            <h2 className="text-3xl sm:text-5xl font-normal tracking-[-0.04em] text-white leading-tight">
              Tus repositorios no son estáticos: cobran vida aquí.
            </h2>
            <p className="text-sm sm:text-base text-[#bdbdbd] font-extralight mt-4 leading-relaxed">
              Cada proyecto a continuación cuenta con un simulador interactivo donde puedes poner a prueba su flujo de Tool Calling, análisis multimodal, trazabilidad con Langfuse y orquestación con LangGraph.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onAwakenAgent={(p) => setActiveProject(p)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Overview Section */}
      <section id="arquitectura" className="py-24 sm:py-32 relative bg-gradient-to-b from-black via-[#040408] to-black border-t border-white/5">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono uppercase text-[#ffb829] tracking-widest block mb-3 font-semibold flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-[#ffb829]" />
              FILOSOFÍA DE ARQUITECTURA AGÉNTICA
            </span>
            <h2 className="text-3xl sm:text-5xl font-normal tracking-[-0.04em] text-white leading-tight">
              Ingeniería robusta desde el dato crudo hasta la acción autónoma.
            </h2>
          </div>

          {/* 3 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-black border border-white/10 rounded-3xl p-8 hover:border-[#8052ff]/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-[#8052ff]/15 border border-[#8052ff]/30 flex items-center justify-center text-[#8052ff] mb-6">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-normal text-white mb-2">1. Orquestación con LangGraph</h3>
              <p className="text-xs sm:text-sm text-[#bdbdbd] font-extralight leading-relaxed">
                Grafos de estado cíclicos y desacoplados con memoria semántica, checkpoints de persistencia y capacidad de interacción Human-in-the-Loop.
              </p>
            </div>

            <div className="bg-black border border-white/10 rounded-3xl p-8 hover:border-[#15846e]/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-[#15846e]/15 border border-[#15846e]/30 flex items-center justify-center text-[#15846e] mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-normal text-white mb-2">2. Esquemas Pydantic & MCP</h3>
              <p className="text-xs sm:text-sm text-[#bdbdbd] font-extralight leading-relaxed">
                Respuestas 100% tipadas y validadas mediante JSON Schema con reintentos autónomos. Estandarización de herramientas con Model Context Protocol.
              </p>
            </div>

            <div className="bg-black border border-white/10 rounded-3xl p-8 hover:border-[#ffb829]/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-[#ffb829]/15 border border-[#ffb829]/30 flex items-center justify-center text-[#ffb829] mb-6">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-normal text-white mb-2">3. Observabilidad con Langfuse</h3>
              <p className="text-xs sm:text-sm text-[#bdbdbd] font-extralight leading-relaxed">
                Auditoría continua de costos en tokens, latencias en percentil 95, trazas jerárquicas y evaluación continua de fidelidad de respuestas RAG.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Scientific Data & AI Workbench (Confusion Matrix, Scatter Plot, Sliders) */}
      <ScientificDataWorkbench />

      {/* Upcoming Data Science Projects */}
      <DataSciencePreview />

      {/* Education & Experience Timeline */}
      <ExperienceTimeline />

      {/* Contact Section & CV Download */}
      <ContactSection />

      {/* Interactive Living Agent Modal */}
      <LivingAgentModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </div>
  );
}

export default App;
