import React, { useState } from 'react';
import { 
  BarChart3, Activity, Layers, Cpu, Database, 
  Sparkles, ShieldCheck, Binary, Sliders, CheckCircle2, 
  HelpCircle, RefreshCw, ScatterChart as ScatterIcon
} from 'lucide-react';
import { profileData } from '../data/profile';

export const ScientificDataWorkbench: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'matrix' | 'scatter' | 'stack' | 'distribution'>('matrix');
  const [temperature, setTemperature] = useState<number>(0.2);
  const [chunkSize, setChunkSize] = useState<number>(512);

  // Multi-Class Confusion Matrix Data for Enterprise Routing (HR, IT, Finance, Legal)
  const confusionClasses = ['HR Ops', 'IT Support', 'Finance', 'Legal Compliance'];
  const confusionMatrix = [
    [485, 4, 1, 2],    // True HR
    [3, 512, 5, 1],    // True IT
    [2, 3, 440, 4],    // True Finance
    [1, 1, 3, 396],    // True Legal
  ];

  const totalSamples = confusionMatrix.flat().reduce((a, b) => a + b, 0);
  const correctPredictions = confusionMatrix[0][0] + confusionMatrix[1][1] + confusionMatrix[2][2] + confusionMatrix[3][3];
  const accuracy = ((correctPredictions / totalSamples) * 100).toFixed(1);

  // 2D Scatter Plot Data (Latency ms vs Accuracy % vs Token Cost)
  const scatterPoints = [
    { name: 'Gemelo Inmobiliario (Front)', x: 410, y: 99.4, radius: 14, color: '#8052ff', type: 'Multi-Agent StateGraph' },
    { name: 'Multimodal Legal Auditor', x: 780, y: 99.1, radius: 18, color: '#38bdf8', type: 'OCR + Vision LLM' },
    { name: 'Simulador Monte Carlo CFO', x: 195, y: 99.9, radius: 12, color: '#ffb829', type: 'NumPy Vectorized' },
    { name: 'RAG Industrial 2.4k Págs', x: 620, y: 98.6, radius: 16, color: '#15846e', type: 'Qdrant Dense Rerank' },
    { name: 'Router MCP Departamental', x: 140, y: 98.7, radius: 10, color: '#f43f5e', type: 'Fast Classifier' },
  ];

  return (
    <section id="stack" className="py-24 sm:py-32 relative bg-[#020202] border-t border-white/5">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase text-[#ffb829] tracking-widest block mb-3 font-semibold flex items-center gap-2">
              <Binary className="w-3.5 h-3.5 text-[#ffb829]" />
              DATA SCIENCE & AI SCIENTIFIC WORKBENCH
            </span>
            <h2 className="text-3xl sm:text-5xl font-normal tracking-[-0.04em] text-white leading-tight">
              Modelado, Inferencia & Validación Estadística.
            </h2>
            <p className="text-sm sm:text-base text-[#bdbdbd] font-extralight mt-4 leading-relaxed">
              Transformamos la evaluación empírica de agentes en un laboratorio cuantitativo: matrices de confusión enrutadas con MCP, curvas de distribución de inferencia y optimización matemática de costos.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-white/[0.03] p-1.5 rounded-2xl border border-white/10 font-mono text-xs">
            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'matrix'
                  ? 'bg-[#8052ff] text-white shadow-[0_0_15px_rgba(128,82,255,0.4)]'
                  : 'text-[#9a9a9a] hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              Matriz de Confusión
            </button>
            <button
              onClick={() => setActiveTab('scatter')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'scatter'
                  ? 'bg-[#ffb829] text-black font-semibold shadow-[0_0_15px_rgba(255,184,41,0.4)]'
                  : 'text-[#9a9a9a] hover:text-white'
              }`}
            >
              <ScatterIcon className="w-3.5 h-3.5" />
              Dispersión (Latencia vs Precisión)
            </button>
            <button
              onClick={() => setActiveTab('distribution')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'distribution'
                  ? 'bg-[#15846e] text-white shadow-[0_0_15px_rgba(21,132,110,0.4)]'
                  : 'text-[#9a9a9a] hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              Parámetros de Inferencia
            </button>
            <button
              onClick={() => setActiveTab('stack')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'stack'
                  ? 'bg-white text-black font-semibold'
                  : 'text-[#9a9a9a] hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Frameworks & Librerías
            </button>
          </div>
        </div>

        {/* Workbench Card Display */}
        <div className="bg-black/70 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Background scientific grid */}
          <div 
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* TAB 1: Confusion Matrix */}
          {activeTab === 'matrix' && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                    <Activity className="w-5 h-5 text-[#8052ff]" />
                    Matriz de Confusión — Clasificador Multi-Agente MCP
                  </h3>
                  <p className="text-xs text-[#bdbdbd] font-light mt-1">
                    Evaluación de clasificación de intenciones sobre 1,860 consultas corporativas reales.
                  </p>
                </div>

                <div className="flex items-center gap-3 font-mono text-xs">
                  <div className="bg-[#8052ff]/15 px-3.5 py-1.5 rounded-xl border border-[#8052ff]/40 text-[#8052ff] font-bold">
                    ACCURACY GLOBAL: {accuracy}%
                  </div>
                  <div className="bg-[#15846e]/15 px-3.5 py-1.5 rounded-xl border border-[#15846e]/40 text-emerald-400 font-bold">
                    F1-SCORE: 0.986
                  </div>
                </div>
              </div>

              {/* Confusion Matrix Table */}
              <div className="overflow-x-auto">
                <div className="min-w-[600px] flex flex-col items-center">
                  <span className="text-[11px] font-mono text-[#ffb829] uppercase tracking-widest mb-3 font-semibold">
                    ← ETIQUETA PREDICHA POR EL AGENTE →
                  </span>

                  <div className="grid grid-cols-5 gap-2 text-center font-mono text-xs">
                    {/* Header Row */}
                    <div className="p-3 text-[10px] text-[#9a9a9a] uppercase flex items-center justify-center">
                      REAL \ PRED
                    </div>
                    {confusionClasses.map((cls, i) => (
                      <div key={i} className="p-3 bg-white/5 rounded-xl text-white font-semibold text-[11px] border border-white/5">
                        {cls}
                      </div>
                    ))}

                    {/* Data Rows */}
                    {confusionMatrix.map((row, rIdx) => (
                      <React.Fragment key={rIdx}>
                        {/* True label header */}
                        <div className="p-3 bg-white/5 rounded-xl text-white font-semibold text-[11px] flex items-center justify-center border border-white/5">
                          {confusionClasses[rIdx]}
                        </div>

                        {/* Cells */}
                        {row.map((val, cIdx) => {
                          const isDiagonal = rIdx === cIdx;
                          const intensity = isDiagonal ? 'bg-[#8052ff]/40 text-white font-bold border-[#8052ff]/60 shadow-[0_0_15px_rgba(128,82,255,0.3)]' : val > 0 ? 'bg-rose-500/10 text-rose-300 border-rose-500/20' : 'bg-black/50 text-[#9a9a9a] border-white/5';

                          return (
                            <div
                              key={cIdx}
                              className={`p-4 rounded-xl border flex flex-col items-center justify-center transition-transform hover:scale-105 ${intensity}`}
                            >
                              <span className="text-base font-bold">{val}</span>
                              <span className="text-[9px] opacity-70">
                                {isDiagonal ? '✓ Correcto' : '✗ Desvío'}
                              </span>
                            </div>
                          );
                        })}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>

              {/* Statistical Metrics Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-4 font-mono text-xs">
                <div className="bg-black/50 p-4 rounded-2xl border border-white/5">
                  <span className="text-[10px] text-[#9a9a9a] uppercase block">Precision Media</span>
                  <span className="text-xl font-bold text-white mt-1 block">98.9%</span>
                  <span className="text-[10px] text-emerald-400">TP / (TP + FP)</span>
                </div>
                <div className="bg-black/50 p-4 rounded-2xl border border-white/5">
                  <span className="text-[10px] text-[#9a9a9a] uppercase block">Recall / Sensibilidad</span>
                  <span className="text-xl font-bold text-white mt-1 block">98.4%</span>
                  <span className="text-[10px] text-[#ffb829]">TP / (TP + FN)</span>
                </div>
                <div className="bg-black/50 p-4 rounded-2xl border border-white/5">
                  <span className="text-[10px] text-[#9a9a9a] uppercase block">Muestras de Test</span>
                  <span className="text-xl font-bold text-white mt-1 block">{totalSamples.toLocaleString()}</span>
                  <span className="text-[10px] text-[#8052ff]">Hold-out Validation</span>
                </div>
                <div className="bg-black/50 p-4 rounded-2xl border border-white/5">
                  <span className="text-[10px] text-[#9a9a9a] uppercase block">Latencia Media Clasif.</span>
                  <span className="text-xl font-bold text-emerald-400 mt-1 block">140 ms</span>
                  <span className="text-[10px] text-[#9a9a9a]">MCP Zero-Shot</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: 2D Scatter Plot (Latency vs Accuracy) */}
          {activeTab === 'scatter' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                    <ScatterIcon className="w-5 h-5 text-[#ffb829]" />
                    Frontera de Pareto: Latencia (ms) vs Precisión Estructurada (%)
                  </h3>
                  <p className="text-xs text-[#bdbdbd] font-light mt-1">
                    Cada nodo representa un agente en producción. El cuadrante superior-izquierdo optimiza máxima precisión con mínima latencia.
                  </p>
                </div>
              </div>

              {/* Visual 2D Canvas / SVG Scatter */}
              <div className="relative w-full h-[320px] bg-black/60 rounded-2xl border border-white/10 p-6 flex flex-col justify-between">
                {/* Quadrant Background Tints */}
                <div className="absolute top-6 left-12 right-6 bottom-12 grid grid-cols-2 grid-rows-2 opacity-10 pointer-events-none">
                  <div className="bg-emerald-500 rounded-tl-xl border-r border-b border-white" />
                  <div className="bg-yellow-500 rounded-tr-xl border-b border-white" />
                  <div className="bg-rose-500 rounded-bl-xl border-r border-white" />
                  <div className="bg-purple-500 rounded-br-xl" />
                </div>

                {/* SVG Points */}
                <svg className="absolute inset-0 w-full h-full">
                  {/* Grid Lines */}
                  <line x1="60" y1="260" x2="95%" y2="260" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                  <line x1="60" y1="30" x2="60" y2="260" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                  <line x1="60" y1="145" x2="95%" y2="145" stroke="rgba(255,255,255,0.06)" strokeDasharray="4" />

                  {/* Scatter Dots */}
                  {scatterPoints.map((pt, i) => {
                    // Map x (100 to 900 ms) -> (80 to 90% width)
                    const cx = 80 + ((pt.x - 100) / 800) * 750;
                    // Map y (97 to 100 %) -> (240 to 50 px)
                    const cy = 250 - ((pt.y - 97) / 3) * 200;

                    return (
                      <g key={i} className="cursor-pointer group">
                        <circle
                          cx={cx}
                          cy={cy}
                          r={pt.radius}
                          fill={pt.color}
                          fillOpacity="0.4"
                          stroke={pt.color}
                          strokeWidth="2"
                          className="transition-all duration-300 group-hover:scale-125"
                        />
                        <circle cx={cx} cy={cy} r="3" fill="#ffffff" />
                        <text
                          x={cx + 12}
                          y={cy - 8}
                          fill="#ffffff"
                          fontSize="11"
                          fontFamily="monospace"
                          fontWeight="bold"
                        >
                          {pt.name}
                        </text>
                        <text
                          x={cx + 12}
                          y={cy + 6}
                          fill="#9a9a9a"
                          fontSize="9"
                          fontFamily="monospace"
                        >
                          {pt.x}ms | {pt.y}%
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Axis Labels */}
                <div className="absolute bottom-2 left-16 text-[10px] font-mono text-[#9a9a9a]">
                  LATENCIA DE INFERENCIA (MS) → [100ms a 900ms]
                </div>
                <div className="absolute top-4 left-4 -rotate-90 origin-top-left text-[10px] font-mono text-[#ffb829]">
                  PRECISIÓN (%) → [97% a 100%]
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Interactive Inference Sliders */}
          {activeTab === 'distribution' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                    <Sliders className="w-5 h-5 text-[#15846e]" />
                    Simulador Teórico de Hiperparámetros de Inferencia
                  </h3>
                  <p className="text-xs text-[#bdbdbd] font-light mt-1">
                    Ajusta los parámetros para observar el trade-off estocástico entre creatividad y determinismo.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Controls */}
                <div className="space-y-6 bg-black/50 p-6 rounded-2xl border border-white/5 font-mono">
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-white">Temperature (Determinismo vs Creatividad)</span>
                      <span className="text-[#8052ff] font-bold">{temperature}</span>
                    </div>
                    <input
                      type="range"
                      min="0.0"
                      max="1.0"
                      step="0.05"
                      value={temperature}
                      onChange={(e) => setTemperature(parseFloat(e.target.value))}
                      className="w-full accent-[#8052ff] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-[#9a9a9a] mt-1">
                      <span>0.0 (Strict Pydantic / SQL)</span>
                      <span>1.0 (Creative Exploratory)</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-white">RAG Chunk Size (Tokens por Fragmento)</span>
                      <span className="text-[#ffb829] font-bold">{chunkSize} tokens</span>
                    </div>
                    <input
                      type="range"
                      min="128"
                      max="1024"
                      step="64"
                      value={chunkSize}
                      onChange={(e) => setChunkSize(parseInt(e.target.value))}
                      className="w-full accent-[#ffb829] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-[#9a9a9a] mt-1">
                      <span>128 (Fine-grained lookup)</span>
                      <span>1024 (Broad context)</span>
                    </div>
                  </div>
                </div>

                {/* Live Simulated Impact */}
                <div className="bg-black/60 p-6 rounded-2xl border border-white/10 font-mono space-y-4">
                  <span className="text-xs text-[#15846e] uppercase tracking-wider block font-semibold">
                    IMPACTO TEÓRICO EN EL SISTEMA:
                  </span>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between p-2 rounded-lg bg-white/[0.02]">
                      <span className="text-[#9a9a9a]">Tasa de Alucinación Estimada:</span>
                      <span className={`font-bold ${temperature < 0.3 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {(temperature * 1.8).toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between p-2 rounded-lg bg-white/[0.02]">
                      <span className="text-[#9a9a9a]">Velocidad de Recuperación RAG:</span>
                      <span className="text-white font-bold">
                        {Math.round(180 + (chunkSize / 1024) * 120)} ms
                      </span>
                    </div>
                    <div className="flex justify-between p-2 rounded-lg bg-white/[0.02]">
                      <span className="text-[#9a9a9a]">Reranking Top-K Coverage:</span>
                      <span className="text-[#ffb829] font-bold">
                        {chunkSize >= 512 ? '99.2% (Óptimo)' : '94.5% (Fragmentado)'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Frameworks & Libraries Detailed Grid */}
          {activeTab === 'stack' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {profileData.skills.map((categoryGroup, idx) => (
                <div
                  key={idx}
                  className="bg-black/50 border border-white/10 rounded-2xl p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-4 text-white font-semibold text-sm">
                      {idx === 0 && <Cpu className="w-4 h-4 text-[#8052ff]" />}
                      {idx === 1 && <Database className="w-4 h-4 text-[#ffb829]" />}
                      {idx === 2 && <Binary className="w-4 h-4 text-[#15846e]" />}
                      <span>{categoryGroup.category}</span>
                    </div>

                    <div className="space-y-3">
                      {categoryGroup.items.map((skill, sIdx) => (
                        <div key={sIdx} className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-white">{skill.name}</span>
                            <span className="text-[#8052ff] font-mono">{skill.level}%</span>
                          </div>
                          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#8052ff] to-[#ffb829] rounded-full"
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
