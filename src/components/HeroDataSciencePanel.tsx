import React, { useState } from 'react';
import { BarChart3, TrendingUp, Compass, Activity, RefreshCw, Sparkles, ChevronRight } from 'lucide-react';

export const HeroDataSciencePanel: React.FC = () => {
  const [chartType, setChartType] = useState<'bars' | 'candlestick' | 'radar'>('bars');
  const [iterationSeed, setIterationSeed] = useState(1);

  const regenerateData = () => {
    setIterationSeed((prev) => prev + 1);
  };

  // Benchmark bar data
  const benchmarkData = [
    { label: 'RAG In-Memory (Chroma)', latency: 240, throughput: 145, precision: 99.4, color: '#8052ff' },
    { label: 'LangGraph State Graph', latency: 410, throughput: 110, precision: 98.8, color: '#ffb829' },
    { label: 'Heavy RAG (2.4k Págs)', latency: 720, throughput: 92, precision: 97.5, color: '#15846e' },
    { label: 'Multimodal OCR Vision', latency: 890, throughput: 65, precision: 99.1, color: '#38bdf8' },
    { label: 'Monte Carlo 5k Runs', latency: 195, throughput: 280, precision: 99.9, color: '#f43f5e' },
  ];

  // Candlestick simulation data (Financial / Token Cost Volatility)
  const candleData = [
    { period: 'Q1', open: 42, high: 68, low: 35, close: 58, volume: '1.2M Tok', isUp: true },
    { period: 'Q2', open: 58, high: 74, low: 52, close: 63, volume: '2.4M Tok', isUp: true },
    { period: 'Q3', open: 63, high: 65, low: 39, close: 44, volume: '1.8M Tok', isUp: false },
    { period: 'Q4 (Opt)', open: 44, high: 88, low: 40, close: 82, volume: '3.1M Tok', isUp: true },
  ];

  // Radar chart axes
  const radarAxes = [
    { axis: 'RAG & Vectores', val: 95, angle: 0 },
    { axis: 'LangGraph Grafos', val: 92, angle: 60 },
    { axis: 'Observabilidad', val: 96, angle: 120 },
    { axis: 'Modelado ML & Stats', val: 88, angle: 180 },
    { axis: 'Tool Calling / APIs', val: 94, angle: 240 },
    { axis: 'Esquemas Pydantic', val: 98, angle: 300 },
  ];

  const radarPoints = radarAxes.map((a) => {
    const rad = (a.angle - 90) * (Math.PI / 180);
    const r = (a.val / 100) * 85;
    const x = 110 + r * Math.cos(rad);
    const y = 110 + r * Math.sin(rad);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="bg-black/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-5 sm:p-6 shadow-[0_0_60px_rgba(0,0,0,0.9)] relative overflow-hidden flex flex-col justify-between">
      {/* Background scientific grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#8052ff 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }}
      />

      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#15846e] animate-pulse" />
            <span className="text-xs font-mono uppercase text-white font-semibold tracking-wider">
              Telemetry & Data Benchmarks
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-xl border border-white/5">
            <button
              onClick={() => setChartType('bars')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                chartType === 'bars' ? 'bg-[#8052ff] text-white shadow-sm' : 'text-[#9a9a9a] hover:text-white'
              }`}
              title="Gráfico de Barras / Latencia"
            >
              <BarChart3 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setChartType('candlestick')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                chartType === 'candlestick' ? 'bg-[#ffb829] text-black shadow-sm font-bold' : 'text-[#9a9a9a] hover:text-white'
              }`}
              title="Gráfico de Velas / Simulación Monte Carlo"
            >
              <TrendingUp className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setChartType('radar')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                chartType === 'radar' ? 'bg-[#15846e] text-white shadow-sm' : 'text-[#9a9a9a] hover:text-white'
              }`}
              title="Gráfico de Radar / Habilidades"
            >
              <Compass className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Dynamic Chart Display Area */}
        <div className="min-h-[220px] flex flex-col justify-center">
          {chartType === 'bars' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#9a9a9a]">
                <span>MÓDULO AGÉNTICO</span>
                <span>LATENCIA P95 (MS)</span>
              </div>
              {benchmarkData.map((item, i) => {
                const widthPercent = (item.latency / 900) * 100;
                return (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/90 font-mono text-[11px] truncate">{item.label}</span>
                      <span className="text-white font-mono font-semibold text-[11px]">{item.latency} ms</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden flex">
                      <div
                        className="h-full rounded-full transition-all duration-700 relative"
                        style={{
                          width: `${widthPercent}%`,
                          backgroundColor: item.color,
                          boxShadow: `0 0 10px ${item.color}80`
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {chartType === 'candlestick' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#ffb829]">
                <span>MONTE CARLO RISK VELAS (Q1-Q4)</span>
                <span>MÁRGEN % EBITDA</span>
              </div>

              {/* Candlestick SVG Rendering */}
              <div className="w-full h-[160px] bg-black/40 rounded-xl p-2 border border-white/5 flex items-end justify-around">
                {candleData.map((c, i) => {
                  const maxH = 120;
                  const top = maxH - (c.high / 100) * maxH;
                  const bottom = maxH - (c.low / 100) * maxH;
                  const bodyTop = maxH - (Math.max(c.open, c.close) / 100) * maxH;
                  const bodyBottom = maxH - (Math.min(c.open, c.close) / 100) * maxH;
                  const bodyHeight = Math.max(6, bodyBottom - bodyTop);

                  return (
                    <div key={i} className="flex flex-col items-center gap-1 group relative">
                      <div className="relative w-8 h-[120px] flex items-center justify-center">
                        {/* High-Low Wick Line */}
                        <div
                          className={`absolute w-[1.5px] ${c.isUp ? 'bg-emerald-400' : 'bg-rose-400'}`}
                          style={{
                            top: `${top}px`,
                            height: `${bottom - top}px`
                          }}
                        />
                        {/* Candlestick Body */}
                        <div
                          className={`absolute w-5 rounded-[2px] transition-all group-hover:scale-110 ${
                            c.isUp
                              ? 'bg-emerald-500/90 border border-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]'
                              : 'bg-rose-500/90 border border-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.5)]'
                          }`}
                          style={{
                            top: `${bodyTop}px`,
                            height: `${bodyHeight}px`
                          }}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-white/80">{c.period}</span>
                      <span className="text-[9px] font-mono text-[#9a9a9a]">{c.close}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {chartType === 'radar' && (
            <div className="flex flex-col items-center justify-center py-1">
              <svg viewBox="0 0 220 220" className="w-[185px] h-[185px] overflow-visible">
                {/* Background circles */}
                {[0.25, 0.5, 0.75, 1].map((ratio, idx) => (
                  <circle
                    key={idx}
                    cx="110"
                    cy="110"
                    r={85 * ratio}
                    fill="none"
                    stroke="rgba(255,255,255,0.08)"
                    strokeDasharray={idx < 3 ? '2 2' : 'none'}
                  />
                ))}

                {/* Radar Axis lines */}
                {radarAxes.map((a, idx) => {
                  const rad = (a.angle - 90) * (Math.PI / 180);
                  const x = 110 + 85 * Math.cos(rad);
                  const y = 110 + 85 * Math.sin(rad);
                  return (
                    <line
                      key={idx}
                      x1="110"
                      y1="110"
                      x2={x}
                      y2={y}
                      stroke="rgba(255,255,255,0.12)"
                    />
                  );
                })}

                {/* Filled polygon */}
                <polygon
                  points={radarPoints}
                  fill="rgba(128, 82, 255, 0.25)"
                  stroke="#8052ff"
                  strokeWidth="2"
                  className="transition-all duration-700"
                />

                {/* Data Points & Labels */}
                {radarAxes.map((a, idx) => {
                  const rad = (a.angle - 90) * (Math.PI / 180);
                  const r = (a.val / 100) * 85;
                  const x = 110 + r * Math.cos(rad);
                  const y = 110 + r * Math.sin(rad);
                  const labelX = 110 + 104 * Math.cos(rad);
                  const labelY = 110 + 104 * Math.sin(rad);

                  return (
                    <g key={idx}>
                      <circle cx={x} cy={y} r="3" fill="#ffb829" />
                      <text
                        x={labelX}
                        y={labelY + 3}
                        fontSize="7.5"
                        fill="#bdbdbd"
                        textAnchor="middle"
                        fontFamily="monospace"
                      >
                        {a.axis}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Bottom KPI Micro-Strip */}
      <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-3 gap-2 text-center font-mono">
        <div className="bg-black/50 p-2 rounded-xl border border-white/5">
          <span className="text-[9px] text-[#9a9a9a] block">ACCURACY</span>
          <span className="text-xs font-bold text-emerald-400">99.4%</span>
        </div>
        <div className="bg-black/50 p-2 rounded-xl border border-white/5">
          <span className="text-[9px] text-[#9a9a9a] block">TOKEN COST</span>
          <span className="text-xs font-bold text-[#ffb829]">-38% Opt</span>
        </div>
        <div className="bg-black/50 p-2 rounded-xl border border-white/5">
          <span className="text-[9px] text-[#9a9a9a] block">RAG SPEED</span>
          <span className="text-xs font-bold text-[#8052ff]">&lt; 5s P95</span>
        </div>
      </div>
    </div>
  );
};
