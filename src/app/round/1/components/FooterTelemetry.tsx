'use client'

import React from 'react';
import { TeamState, PlayerId } from '../types';

interface FooterTelemetryProps {
  teamState: TeamState;
  activeView: 'HUB' | PlayerId | 5;
}

export const FooterTelemetry: React.FC<FooterTelemetryProps> = ({
  teamState,
  activeView,
}) => {
  const currentStageLabel =
    activeView === 'HUB'
      ? 'HUB / MAIN'
      : activeView === 5
      ? 'COMPLETED'
      : `SLOT 0${activeView}`;

  return (
    <footer className="mt-auto border-t border-white/5 py-4 px-4 sm:px-8 font-mono-ui text-[10px] uppercase tracking-widest text-zinc-600 select-none">
      <div className="max-w-xl mx-auto flex flex-wrap justify-between items-center gap-3">
        <div className="flex items-center gap-4 text-zinc-500">
          <span>TEAM: <strong className="text-zinc-300">{teamState.teamName}</strong></span>
          <span>STAGE: <strong className="text-[#d9ff52]">{currentStageLabel}</strong></span>
        </div>

        <div className="flex items-center gap-2 text-emerald-400 font-bold text-[9px]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          UPLINK ONLINE
        </div>
      </div>
    </footer>
  );
};
