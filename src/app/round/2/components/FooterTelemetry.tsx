'use client'

import React from 'react';
import { TeamState, PlayerId, PLAYER_CODES } from '../types-r1';

interface FooterTelemetryProps {
  teamState: TeamState;
  activeView: 'HUB' | PlayerId | 5;
}

export const FooterTelemetry: React.FC<FooterTelemetryProps> = ({
  teamState,
  activeView,
}) => {
  const currentUserStr =
    activeView === 'HUB'
      ? `${teamState.teamId}_CAPTAIN`
      : activeView === 5
      ? `${teamState.teamId}_COMPLETED`
      : `${PLAYER_CODES[activeView]}_PLAYER_${activeView}`;

  return (
    <footer className="mt-8 border-t border-[#00F0FF]/20 pt-4 pb-4 px-4 sm:px-8 text-[10px] font-mono uppercase tracking-widest text-[#00F0FF]/70 select-none">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-3">
        <div className="flex flex-wrap gap-4 sm:gap-6 opacity-75">
          <span>OS: ARCADIA_v4.2</span>
          <span>NODE: 001-ALPHA</span>
          <span>USER: {currentUserStr}</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-[#39FF14] font-bold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39FF14] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#39FF14]" />
            </span>
            LIVE UPLINK ACTIVE
          </div>
        </div>
      </div>
    </footer>
  );
};
