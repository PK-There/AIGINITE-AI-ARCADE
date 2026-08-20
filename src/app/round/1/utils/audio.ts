'use client'

// Web Audio API Retro Arcade Synthesizer

class SoundEngine {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = false;
  public volume: number = 0.3;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playTone(freq: number, type: OscillatorType = 'sine', duration = 0.1, gainVal = 0.2) {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainVal * this.volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio context might fail silently if user hasn't interacted
    }
  }

  public playKeypress() {
    this.playTone(880, 'triangle', 0.04, 0.08);
  }

  public playTick() {
    this.playTone(1200, 'sine', 0.03, 0.05);
  }

  public playCountdownUrgent() {
    this.playTone(1760, 'sawtooth', 0.08, 0.15);
  }

  public playCorrect() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          this.playTone(freq, 'sine', 0.15, 0.25);
        }, idx * 60);
      });
    } catch {}
  }

  public playWrong() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      this.playTone(220, 'sawtooth', 0.25, 0.3);
      setTimeout(() => {
        this.playTone(146.83, 'sawtooth', 0.35, 0.35);
      }, 100);
    } catch {}
  }

  public playSuccessFanfare() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const fanfare = [
        { f: 523.25, d: 0.1 },
        { f: 659.25, d: 0.1 },
        { f: 783.99, d: 0.1 },
        { f: 1046.5, d: 0.3 },
      ];
      fanfare.forEach((n, i) => {
        setTimeout(() => {
          this.playTone(n.f, 'triangle', n.d, 0.3);
        }, i * 110);
      });
    } catch {}
  }

  public playLock() {
    this.playTone(300, 'square', 0.12, 0.15);
  }

  public playWordleFlip(state: 'correct' | 'present' | 'absent') {
    if (state === 'correct') {
      this.playTone(784, 'sine', 0.12, 0.2);
    } else if (state === 'present') {
      this.playTone(587.33, 'triangle', 0.12, 0.15);
    } else {
      this.playTone(330, 'sawtooth', 0.08, 0.1);
    }
  }
}

export const soundFx = new SoundEngine();
