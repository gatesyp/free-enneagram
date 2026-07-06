import { QUESTIONS } from "./questions";
import { ALL_TYPE_IDS, type EnneagramTypeId } from "./types";

export interface TestResult {
  primaryType: EnneagramTypeId;
  wing: EnneagramTypeId;
  scores: Record<EnneagramTypeId, number>;
  isTie: boolean;
  tiedTypes: EnneagramTypeId[];
}

function emptyScores(): Record<EnneagramTypeId, number> {
  return { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
}

export function tallyScores(
  answers: (number | null)[]
): Record<EnneagramTypeId, number> {
  const scores = emptyScores();

  QUESTIONS.forEach((question, index) => {
    const value = answers[index];
    if (value !== null) {
      scores[question.typeId] += value;
    }
  });

  return scores;
}

function getAdjacentTypes(
  type: EnneagramTypeId
): [EnneagramTypeId, EnneagramTypeId] {
  if (type === 1) return [9, 2];
  if (type === 9) return [8, 1];
  return [(type - 1) as EnneagramTypeId, (type + 1) as EnneagramTypeId];
}

export function getWing(
  primaryType: EnneagramTypeId,
  scores: Record<EnneagramTypeId, number>
): EnneagramTypeId {
  const [left, right] = getAdjacentTypes(primaryType);
  return scores[left] >= scores[right] ? left : right;
}

export function getPrimaryType(
  scores: Record<EnneagramTypeId, number>
): { type: EnneagramTypeId; isTie: boolean; tiedTypes: EnneagramTypeId[] } {
  const maxScore = Math.max(...ALL_TYPE_IDS.map((id) => scores[id]));
  const tiedTypes = ALL_TYPE_IDS.filter((id) => scores[id] === maxScore);

  return {
    type: tiedTypes[0],
    isTie: tiedTypes.length > 1,
    tiedTypes,
  };
}

export function calculateResults(answers: (number | null)[]): TestResult {
  const scores = tallyScores(answers);
  const { type: primaryType, isTie, tiedTypes } = getPrimaryType(scores);
  const wing = getWing(primaryType, scores);

  return { primaryType, wing, scores, isTie, tiedTypes };
}