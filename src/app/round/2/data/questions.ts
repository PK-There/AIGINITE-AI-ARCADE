'use client'

import { QuestionDefinition, MysteryEntity } from '../types';

export const QUESTION_BANK: QuestionDefinition[] = [
  {
    id: 'q_fictional',
    text: 'Is it a fictional character or creation?',
    attributeKey: 'isFictional',
    categoryHint: 'Identity',
    evaluate: (entity: MysteryEntity) => !!entity.attributes.isFictional,
  },
  {
    id: 'q_real_person',
    text: 'Is it a real-world person in history or modern day?',
    attributeKey: 'isRealPerson',
    categoryHint: 'Identity',
    evaluate: (entity: MysteryEntity) => !!entity.attributes.isRealPerson,
  },
  {
    id: 'q_movie_related',
    text: 'Is it directly featured in or as a movie?',
    attributeKey: 'isMovieCharacter',
    categoryHint: 'Media',
    evaluate: (entity: MysteryEntity) => !!(entity.attributes.isMovieCharacter || entity.attributes.isMovie),
  },
  {
    id: 'q_indian',
    text: 'Is the person or entity of Indian origin?',
    attributeKey: 'isIndian',
    categoryHint: 'Origin',
    evaluate: (entity: MysteryEntity) => !!entity.attributes.isIndian,
  },
  {
    id: 'q_marvel',
    text: 'Is it a Marvel character or universe entity?',
    attributeKey: 'isMarvel',
    categoryHint: 'Franchise',
    evaluate: (entity: MysteryEntity) => !!entity.attributes.isMarvel,
  },
  {
    id: 'q_superhero',
    text: 'Is it a superhero who fights crime or evil?',
    attributeKey: 'isSuperhero',
    categoryHint: 'Role',
    evaluate: (entity: MysteryEntity) => !!entity.attributes.isSuperhero,
  },
  {
    id: 'q_dc',
    text: 'Is it from the DC Comics universe?',
    attributeKey: 'isDC',
    categoryHint: 'Franchise',
    evaluate: (entity: MysteryEntity) => !!entity.attributes.isDC,
  },
  {
    id: 'q_tech_personality',
    text: 'Is it a founder, CEO, or leader in the tech industry?',
    attributeKey: 'isTechnologyPersonality',
    categoryHint: 'Domain',
    evaluate: (entity: MysteryEntity) => !!entity.attributes.isTechnologyPersonality,
  },
  {
    id: 'q_ai_related',
    text: 'Is it closely associated with AI, robotics, or cutting-edge tech?',
    attributeKey: 'associatedWithAI',
    categoryHint: 'Technology',
    evaluate: (entity: MysteryEntity) => !!(entity.attributes.associatedWithAI || entity.attributes.isTechRelated),
  },
  {
    id: 'q_celebrity',
    text: 'Is it a mainstream entertainment or sports celebrity?',
    attributeKey: 'isCelebrity',
    categoryHint: 'Fame',
    evaluate: (entity: MysteryEntity) => !!entity.attributes.isCelebrity,
  },
  {
    id: 'q_internet',
    text: 'Is it famous primarily as an Internet / YouTube / Social creator?',
    attributeKey: 'isInternetPersonality',
    categoryHint: 'Domain',
    evaluate: (entity: MysteryEntity) => !!entity.attributes.isInternetPersonality,
  },
  {
    id: 'q_superpowers',
    text: 'Does it possess magical, supernatural, or superhuman abilities?',
    attributeKey: 'hasSuperpowers',
    categoryHint: 'Abilities',
    evaluate: (entity: MysteryEntity) => !!entity.attributes.hasSuperpowers,
  },
  {
    id: 'q_armor_costume',
    text: 'Does this entity wear a signature costume, suit, or armor?',
    attributeKey: 'wearsArmorOrCostume',
    categoryHint: 'Appearance',
    evaluate: (entity: MysteryEntity) => !!entity.attributes.wearsArmorOrCostume,
  },
  {
    id: 'q_object',
    text: 'Is it an inanimate physical object or artifact (not a person)?',
    attributeKey: 'isObject',
    categoryHint: 'Nature',
    evaluate: (entity: MysteryEntity) => !!(entity.attributes.isObject || entity.attributes.isMovie),
  }
];

/**
 * Returns a randomized subset of exactly 6 unique questions suitable for gameplay.
 * Prioritizes high-entropy questions for maximum deduction fun.
 */
export function generateQuestionPool(seedQuestionsCount = 6, excludeIds: string[] = []): QuestionDefinition[] {
  const eligible = QUESTION_BANK.filter(q => !excludeIds.includes(q.id));
  
  // Shuffle array using Fisher-Yates
  const shuffled = [...eligible];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled.slice(0, Math.min(seedQuestionsCount, shuffled.length));
}
