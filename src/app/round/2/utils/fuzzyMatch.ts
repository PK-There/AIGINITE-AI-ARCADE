'use client'

import { MysteryEntity } from '../types';

function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()'"?]/g, '')
    .replace(/\s+/g, ' ');
}

// Levenshtein distance for fuzzy tolerance
function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

/**
 * Validates player's guess against the secret mystery entity and its aliases
 */
export function checkGuessMatch(guess: string, entity: MysteryEntity): { isCorrect: boolean; matchedAs?: string } {
  if (!guess || !entity) return { isCorrect: false };

  const cleanGuess = normalizeString(guess);
  if (!cleanGuess) return { isCorrect: false };

  // 1. Direct name match
  const cleanName = normalizeString(entity.name);
  if (cleanGuess === cleanName) {
    return { isCorrect: true, matchedAs: entity.name };
  }

  // 2. Direct alias match
  for (const alias of entity.aliases) {
    const cleanAlias = normalizeString(alias);
    if (cleanGuess === cleanAlias) {
      return { isCorrect: true, matchedAs: alias };
    }
  }

  // 2.5 Word-level fuzzy matches (e.g. "walter" matches "Walter White")
  const guessWords = cleanGuess.split(/\s+/);
  const nameWords = cleanName.split(/\s+/);
  for (const gw of guessWords) {
    if (gw.length >= 3) {
      for (const nw of nameWords) {
        if (nw === gw || (nw.length >= 4 && levenshteinDistance(gw, nw) <= 1)) {
          return { isCorrect: true, matchedAs: entity.name };
        }
      }
      for (const alias of entity.aliases) {
        const aliasWords = normalizeString(alias).split(/\s+/);
        for (const aw of aliasWords) {
          if (aw === gw || (aw.length >= 4 && levenshteinDistance(gw, aw) <= 1)) {
            return { isCorrect: true, matchedAs: alias };
          }
        }
      }
    }
  }

  // 3. Substring match for substantial names (>= 5 chars)
  if (cleanName.length >= 5 && (cleanName.includes(cleanGuess) || cleanGuess.includes(cleanName))) {
    return { isCorrect: true, matchedAs: entity.name };
  }

  // 4. Check aliases with substring
  for (const alias of entity.aliases) {
    const cleanAlias = normalizeString(alias);
    if (cleanAlias.length >= 5 && (cleanAlias.includes(cleanGuess) || cleanGuess.includes(cleanAlias))) {
      return { isCorrect: true, matchedAs: alias };
    }
  }

  // 5. Fuzzy edit distance (distance <= 2 for words with length > 5, distance <= 1 for length > 3)
  const dist = levenshteinDistance(cleanGuess, cleanName);
  if ((cleanName.length > 5 && dist <= 2) || (cleanName.length > 3 && dist <= 1)) {
    return { isCorrect: true, matchedAs: entity.name };
  }

  for (const alias of entity.aliases) {
    const cleanAlias = normalizeString(alias);
    const aliasDist = levenshteinDistance(cleanGuess, cleanAlias);
    if ((cleanAlias.length > 5 && aliasDist <= 2) || (cleanAlias.length > 3 && aliasDist <= 1)) {
      return { isCorrect: true, matchedAs: alias };
    }
  }

  return { isCorrect: false };
}
