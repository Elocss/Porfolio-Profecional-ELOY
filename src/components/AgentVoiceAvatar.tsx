import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Bot, Radio, Sparkles } from 'lucide-react';

interface AgentVoiceAvatarProps {
  speechText?: string;
  isSpeaking: boolean;
  onToggleSpeech: () => void;
}

export const AgentVoiceAvatar: React.FC<AgentVoiceAvatarProps> = ({
  isSpeaking,
  onToggleSpeech,
}) => {
  return (
    <div className="flex items-center justify-between bg-gradient-to-r from-black/90 via-[#8052ff]/15 to-black/90 border border-white/10 hover:border-[#8052ff]/50 rounded-2xl p-3 sm:p-4 backdrop-blur-xl transition-all shadow-[0_0_30px_rgba(128,82,255,0.2)]">
      {/* Avatar & Identity */}
      <div className="flex items-center gap-3">
        {/* Holographic Glowing Orb */}
        <div className="relative flex items-center justify-center">
          <div
            className={`absolute w-12 h-12 rounded-full transition-all duration-700 ${
              isSpeaking
                ? 'bg-gradient-to-r from-[#8052ff] via-[#ffb829] to-[#15846e] animate-spin blur-md opacity-70 scale-125'
                : 'bg-[#8052ff]/30 blur-sm opacity-50'
            }`}
          />
          <div className="relative w-11 h-11 rounded-full bg-black border-2 border-[#8052ff] p-1 flex items-center justify-center shadow-[0_0_15px_rgba(128,82,255,0.7)]">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-[#8052ff]/40 to-[#15846e]/40 flex items-center justify-center">
              <Bot className={`w-5 h-5 text-white transition-all ${isSpeaking ? 'scale-110 text-[#ffb829]' : ''}`} />
            </div>
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#15846e] border-2 border-black flex items-center justify-center">
              <span className="w-1 h-1 rounded-full bg-white animate-ping" />
            </span>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase font-bold text-white tracking-wider flex items-center gap-1.5">
              <Radio className={`w-3 h-3 ${isSpeaking ? 'text-[#ffb829] animate-pulse' : 'text-[#15846e]'}`} />
              Agente Virtual Eloy AI
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#8052ff]/20 text-[#8052ff] border border-[#8052ff]/40">
              {isSpeaking ? 'HABLANDO AHORA' : 'VOZ LISTA'}
            </span>
          </div>
          <p className="text-[11px] text-[#bdbdbd] font-mono mt-0.5">
            {isSpeaking ? 'Transmisión de voz neural activa...' : 'Haz clic para escuchar la presentación'}
          </p>
        </div>
      </div>

      {/* Audio Waveform & Voice Play Button */}
      <div className="flex items-center gap-3">
        {/* Animated Audio Equalizer Bars */}
        <div className="hidden sm:flex items-center gap-1">
          {[35, 75, 100, 60, 95, 40, 85, 50].map((h, i) => (
            <span
              key={i}
              className={`w-1 rounded-full transition-all duration-200 ${
                isSpeaking
                  ? 'bg-gradient-to-t from-[#8052ff] to-[#ffb829] animate-pulse'
                  : 'bg-white/20'
              }`}
              style={{
                height: isSpeaking ? `${(h / 100) * 20}px` : '4px',
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>

        {/* Action Button */}
        <button
          onClick={onToggleSpeech}
          className={`px-4 py-2 rounded-full text-xs font-mono uppercase font-semibold flex items-center gap-2 transition-all duration-300 shadow-md ${
            isSpeaking
              ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-[0_0_20px_rgba(244,63,94,0.5)] animate-pulse'
              : 'bg-[#8052ff] hover:bg-[#6c3cf0] text-white shadow-[0_0_20px_rgba(128,82,255,0.4)] hover:shadow-[0_0_30px_rgba(128,82,255,0.7)]'
          }`}
        >
          {isSpeaking ? (
            <>
              <VolumeX className="w-4 h-4" />
              <span>Silenciar</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-[#ffb829]" />
              <span>Escuchar Agente</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
