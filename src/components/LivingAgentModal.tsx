import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Play, RotateCcw, Bot, Terminal, Activity, Code, ExternalLink, 
  CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, Sparkles, 
  Layers, Database, Cpu
} from 'lucide-react';
import { ProjectItem, SimulationStep, SimulationPreset } from '../data/projects';

interface LivingAgentModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const LivingAgentModal: React.FC<LivingAgentModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  const [activeTab, setActiveTab] = useState<'sandbox' | 'architecture' | 'readme'>('sandbox');
  const [selectedPreset, setSelectedPreset] = useState<SimulationPreset>(project.presets[0]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [logs, setLogs] = useState<SimulationStep[]>([]);
  const consoleEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (project.presets.length > 0) {
      setSelectedPreset(project.presets[0]);
      setCustomPrompt(project.presets[0].userPrompt);
      resetSimulation(project.presets[0]);
    }
  }, [project]);

  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs, currentStepIndex]);

  const resetSimulation = (preset: SimulationPreset) => {
    setIsRunning(false);
    setCurrentStepIndex(-1);
    setLogs([]);
  };

  const handleSelectPreset = (preset: SimulationPreset) => {
    setSelectedPreset(preset);
    setCustomPrompt(preset.userPrompt);
    resetSimulation(preset);
  };

  const runSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setCurrentStepIndex(0);
    setLogs([]);

    const stepsToRun = selectedPreset.steps;

    stepsToRun.forEach((step, idx) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, step]);
        setCurrentStepIndex(idx);
        if (idx === stepsToRun.length - 1) {
          setIsRunning(false);
        }
      }, (idx + 1) * 1100);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div 
        className="relative w-full max-w-5xl h-[90vh] bg-[#030303] border border-white/10 rounded-2xl sm:rounded-3xl flex flex-col shadow-[0_0_80px_rgba(128,82,255,0.25)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Agent Status Bar */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/60">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-[#8052ff]/10 border border-[#8052ff]/30 text-[#8052ff]">
              <Bot className="w-5 h-5 animate-pulse" />
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#15846e] border-2 border-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-white font-semibold text-base sm:text-lg">{project.title}</h3>
                <span className="px-2.5 py-0.5 text-[10px] font-mono uppercase bg-[#8052ff]/20 text-[#8052ff] border border-[#8052ff]/40 rounded-full">
                  {project.badge}
                </span>
              </div>
              <p className="text-[#9a9a9a] text-xs font-mono">
                STATUS: <span className="text-[#15846e]">● AGENT READY</span> // FRAMEWORK: {project.techStack[0]}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white/80 transition-colors"
            >
              <Code className="w-3.5 h-3.5" />
              Repo en GitHub
              <ExternalLink className="w-3 h-3 ml-0.5 opacity-60" />
            </a>
            <button
              onClick={onClose}
              className="p-2 text-[#9a9a9a] hover:text-white hover:bg-white/10 rounded-full transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 border-b border-white/10 bg-black/40">
          <button
            onClick={() => setActiveTab('sandbox')}
            className={`py-3 px-4 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === 'sandbox'
                ? 'border-[#8052ff] text-white'
                : 'border-transparent text-[#9a9a9a] hover:text-white/80'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-[#8052ff]" />
            Live Sandbox / Ejecutar
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`py-3 px-4 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === 'architecture'
                ? 'border-[#ffb829] text-white'
                : 'border-transparent text-[#9a9a9a] hover:text-white/80'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-[#ffb829]" />
            Herramientas & Grafo
          </button>
          <button
            onClick={() => setActiveTab('readme')}
            className={`py-3 px-4 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === 'readme'
                ? 'border-[#15846e] text-white'
                : 'border-transparent text-[#9a9a9a] hover:text-white/80'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-[#15846e]" />
            README & Arquitectura
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#000000]">
          {activeTab === 'sandbox' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
              {/* Left Column: Preset Selector & Prompt Controller */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <div>
                  <label className="text-[11px] font-mono uppercase text-[#9a9a9a] tracking-wider mb-2 block flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#ffb829]" />
                    Casos de Uso & Flujos Preconfigurados
                  </label>
                  <div className="flex flex-col gap-2">
                    {project.presets.map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => handleSelectPreset(preset)}
                        className={`text-left p-3 rounded-xl border transition-all text-xs ${
                          selectedPreset.id === preset.id
                            ? 'bg-[#8052ff]/15 border-[#8052ff]/60 text-white shadow-[0_0_15px_rgba(128,82,255,0.2)]'
                            : 'bg-white/[0.02] border-white/5 text-[#9a9a9a] hover:bg-white/[0.05] hover:text-white'
                        }`}
                      >
                        <div className="font-semibold text-white flex items-center justify-between">
                          <span>{preset.label}</span>
                          {selectedPreset.id === preset.id && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#8052ff]" />
                          )}
                        </div>
                        <p className="text-[11px] text-[#bdbdbd] mt-1 font-light line-clamp-2">
                          {preset.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input Prompt Box */}
                <div className="flex flex-col gap-2 bg-white/[0.02] border border-white/10 p-3 rounded-2xl">
                  <label className="text-[11px] font-mono uppercase text-[#9a9a9a] tracking-wider">
                    Prompt de Entrada al Agente
                  </label>
                  <textarea
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    rows={3}
                    className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#8052ff] resize-none font-mono"
                    placeholder="Escribe un prompt para poner a prueba al agente..."
                  />
                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => resetSimulation(selectedPreset)}
                      className="px-3 py-1.5 text-xs text-[#9a9a9a] hover:text-white flex items-center gap-1.5 transition-colors font-mono"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Reiniciar
                    </button>
                    <button
                      onClick={runSimulation}
                      disabled={isRunning}
                      className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all ${
                        isRunning
                          ? 'bg-[#8052ff]/50 text-white/70 cursor-not-allowed'
                          : 'bg-[#8052ff] hover:bg-[#6c3cf0] text-white shadow-[0_0_20px_rgba(128,82,255,0.4)]'
                      }`}
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      {isRunning ? 'Ejecutando...' : 'Despertar & Ejecutar'}
                    </button>
                  </div>
                </div>

                {/* Langfuse Live Metrics Panel */}
                <div className="bg-[#050505] border border-white/10 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono uppercase text-[#8052ff] flex items-center gap-1.5 font-bold">
                      <Activity className="w-3.5 h-3.5 text-[#8052ff]" />
                      Langfuse Observability Live
                    </span>
                    <span className="text-[10px] font-mono text-[#15846e] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#15846e] animate-pulse" />
                      TRACING ACTIVE
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="bg-black/50 p-2 rounded-lg border border-white/5">
                      <span className="text-[10px] text-[#9a9a9a]">LATENCY P95</span>
                      <p className="text-white font-semibold">{project.metrics[1]?.value || '< 1.2s'}</p>
                    </div>
                    <div className="bg-black/50 p-2 rounded-lg border border-white/5">
                      <span className="text-[10px] text-[#9a9a9a]">SCHEMA VALIDATION</span>
                      <p className="text-[#ffb829] font-semibold">Pydantic ✓</p>
                    </div>
                    <div className="bg-black/50 p-2 rounded-lg border border-white/5">
                      <span className="text-[10px] text-[#9a9a9a]">VECTOR STORE</span>
                      <p className="text-white font-semibold">HNSW Index</p>
                    </div>
                    <div className="bg-black/50 p-2 rounded-lg border border-white/5">
                      <span className="text-[10px] text-[#9a9a9a]">TOOL CALLS</span>
                      <p className="text-[#8052ff] font-semibold">{project.capabilities[0]?.tools.length || 3} Tools Loaded</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Agent Console Execution Logs */}
              <div className="lg:col-span-7 flex flex-col h-[480px] lg:h-full bg-black rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                {/* Console Header */}
                <div className="px-4 py-2.5 bg-[#0a0a0a] border-b border-white/10 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2 text-[#9a9a9a]">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    <span className="ml-2 text-white/80">agent-runtime://{project.id}</span>
                  </div>
                  <span className="text-[10px] text-[#9a9a9a]">STDOUT / WEBSOCKET</span>
                </div>

                {/* Console Log Screen */}
                <div className="flex-1 overflow-y-auto p-4 font-mono text-xs space-y-4">
                  {logs.length === 0 && !isRunning && (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#9a9a9a]">
                      <Bot className="w-12 h-12 text-[#8052ff]/40 mb-3 animate-bounce" />
                      <p className="text-white font-semibold text-sm">Agente en Standby</p>
                      <p className="text-xs text-[#bdbdbd] max-w-sm mt-1 font-sans">
                        Haz clic en <span className="text-[#8052ff] font-semibold">"Despertar & Ejecutar"</span> para observar el flujo de Tool Calling, razonamiento y respuesta estructurada en tiempo real.
                      </p>
                    </div>
                  )}

                  {logs.map((log, idx) => (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-xl border animate-in fade-in duration-300 ${
                        log.actor === 'orchestrator'
                          ? 'bg-[#8052ff]/10 border-[#8052ff]/30 text-white'
                          : log.actor === 'tool'
                          ? 'bg-[#15846e]/10 border-[#15846e]/40 text-emerald-300'
                          : log.actor === 'agent'
                          ? 'bg-white/[0.04] border-white/20 text-white'
                          : 'bg-black border-white/10 text-[#bdbdbd]'
                      }`}
                    >
                      {/* Step Header */}
                      <div className="flex items-center justify-between pb-2 border-b border-white/5 mb-2">
                        <div className="flex items-center gap-2">
                          {log.actor === 'orchestrator' && (
                            <span className="px-2 py-0.5 text-[9px] uppercase bg-[#8052ff] text-white rounded font-bold">
                              ORCHESTRATOR
                            </span>
                          )}
                          {log.actor === 'tool' && (
                            <span className="px-2 py-0.5 text-[9px] uppercase bg-[#15846e] text-white rounded font-bold">
                              TOOL CALL
                            </span>
                          )}
                          {log.actor === 'agent' && (
                            <span className="px-2 py-0.5 text-[9px] uppercase bg-[#ffb829] text-black rounded font-bold">
                              SYNTHESIZED AGENT
                            </span>
                          )}
                          <span className="text-white/90 font-bold">{log.name}</span>
                        </div>
                        {log.metadata?.latencyMs && (
                          <span className="text-[10px] text-[#9a9a9a]">
                            ⏱ {log.metadata.latencyMs}ms
                          </span>
                        )}
                      </div>

                      {/* Step Content */}
                      <div className="text-xs whitespace-pre-line leading-relaxed font-sans">
                        {log.content}
                      </div>

                      {/* Tool Parameters & Results payload preview */}
                      {log.metadata?.params && (
                        <div className="mt-2 bg-black/70 p-2 rounded-lg border border-white/5 text-[11px] font-mono">
                          <span className="text-[#9a9a9a] block mb-1">ARGS:</span>
                          <pre className="text-emerald-400 overflow-x-auto">
                            {JSON.stringify(log.metadata.params, null, 2)}
                          </pre>
                        </div>
                      )}

                      {log.metadata?.result && (
                        <div className="mt-2 bg-black/70 p-2 rounded-lg border border-white/5 text-[11px] font-mono">
                          <span className="text-[#ffb829] block mb-1">EXECUTION RESULT:</span>
                          <pre className="text-white/80 overflow-x-auto">
                            {JSON.stringify(log.metadata.result, null, 2)}
                          </pre>
                        </div>
                      )}
                    </div>
                  ))}

                  {isRunning && (
                    <div className="flex items-center gap-2 text-xs text-[#8052ff] font-mono py-2">
                      <span className="w-2 h-2 rounded-full bg-[#8052ff] animate-ping" />
                      <span>Agente procesando grafo de estados & invocando tools...</span>
                    </div>
                  )}

                  <div ref={consoleEndRef} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                <h4 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-[#8052ff]" />
                  Resumen de Arquitectura del Agente
                </h4>
                <p className="text-sm text-[#bdbdbd] font-light leading-relaxed">
                  {project.architectureOverview}
                </p>
              </div>

              {/* Capabilities & Registered Tools */}
              <div>
                <h4 className="text-sm font-mono uppercase text-[#ffb829] tracking-wider mb-3">
                  Capacidades del Sistema & Registro de Tools
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.capabilities.map((cap, i) => (
                    <div key={i} className="bg-black border border-white/10 rounded-2xl p-5 hover:border-[#8052ff]/50 transition-colors">
                      <h5 className="text-white font-semibold text-sm mb-1">{cap.title}</h5>
                      <p className="text-xs text-[#bdbdbd] font-light mb-4">{cap.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {cap.tools.map((t, tidx) => (
                          <span key={tidx} className="px-2.5 py-1 text-[11px] font-mono bg-[#8052ff]/10 text-[#8052ff] border border-[#8052ff]/30 rounded-lg">
                            {t}()
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {project.metrics.map((m, idx) => (
                  <div key={idx} className="bg-white/[0.02] border border-white/10 p-4 rounded-xl">
                    <span className="text-[11px] text-[#9a9a9a] font-mono block uppercase">{m.name}</span>
                    <span className="text-lg font-bold text-white mt-1 block">{m.value}</span>
                    <span className="text-[10px] text-[#8052ff] font-mono">{m.tool}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'readme' && (
            <div className="space-y-6">
              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                <span className="text-xs font-mono uppercase text-[#ffb829] block mb-1">
                  PROBLEMA RESUELTO
                </span>
                <p className="text-sm text-white font-light leading-relaxed">
                  {project.readmeHighlights.problemSolved}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-black border border-white/10 rounded-2xl p-5">
                  <span className="text-xs font-mono uppercase text-[#8052ff] block mb-3 font-semibold flex items-center gap-1.5">
                    <Layers className="w-4 h-4" /> Módulos Principales
                  </span>
                  <ul className="space-y-2">
                    {project.readmeHighlights.keyModules.map((mod, i) => (
                      <li key={i} className="text-xs text-[#bdbdbd] flex items-start gap-2">
                        <span className="text-[#8052ff] mt-0.5 font-bold">›</span>
                        <span>{mod}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-black border border-white/10 rounded-2xl p-5">
                  <span className="text-xs font-mono uppercase text-[#15846e] block mb-3 font-semibold flex items-center gap-1.5">
                    <Database className="w-4 h-4" /> Pipeline de Datos
                  </span>
                  <p className="text-xs text-[#bdbdbd] leading-relaxed font-mono bg-white/[0.02] p-3 rounded-xl border border-white/5">
                    {project.readmeHighlights.dataPipeline}
                  </p>
                  
                  <span className="text-xs font-mono uppercase text-[#ffb829] block mt-4 mb-2 font-semibold">
                    Observabilidad & Trazabilidad
                  </span>
                  <p className="text-xs text-[#bdbdbd] leading-relaxed">
                    {project.readmeHighlights.observability}
                  </p>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#8052ff] hover:bg-[#6c3cf0] text-white text-xs uppercase font-semibold tracking-wider px-6 py-3 rounded-full flex items-center gap-2 shadow-[0_0_20px_rgba(128,82,255,0.4)]"
                >
                  <Code className="w-4 h-4" />
                  Ir al Repositorio Oficial en GitHub
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
