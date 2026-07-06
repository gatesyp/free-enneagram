import { QUESTIONS } from "./questions";
import { ALL_TYPE_IDS, type EnneagramTypeId } from "./types";

export interface TestResult {
  primaryType: EnneagramTypeId;
  wing: EnneagramTypeId;
  scores: Record<EnneagramTypeId, number>;
  isTie: boolean;
  tiedTypes: EnneagramTypeId[];
  isWingTie: boolean;
  wingTiedTypes: EnneagramTypeId[];
  topScore: number;
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

export function getAdjacentTypes(
  type: EnneagramTypeId
): [EnneagramTypeId, EnneagramTypeId] {
  if (type === 1) return [9, 2];
  if (type === 9) return [8, 1];
  return [(type - 1) as EnneagramTypeId, (type + 1) as EnneagramTypeId];
}

export function getWingResult(
  primaryType: EnneagramTypeId,
  scores: Record<EnneagramTypeId, number>
): {
  wing: EnneagramTypeId;
  isWingTie: boolean;
  wingTiedTypes: EnneagramTypeId[];
} {
  const [left, right] = getAdjacentTypes(primaryType);

  if (scores[left] === scores[right]) {
    return { wing: left, isWingTie: true, wingTiedTypes: [left, right] };
  }

  const wing = scores[left] > scores[right] ? left : right;
  return { wing, isWingTie: false, wingTiedTypes: [wing] };
}

export function getWing(
  primaryType: EnneagramTypeId,
  scores: Record<EnneagramTypeId, number>
): EnneagramTypeId {
  return getWingResult(primaryType, scores).wing;
}

export function getPrimaryType(
  scores: Record<EnneagramTypeId, number>
): {
  type: EnneagramTypeId;
  isTie: boolean;
  tiedTypes: EnneagramTypeId[];
  topScore: number;
} {
  const maxScore = Math.max(...ALL_TYPE_IDS.map((id) => scores[id]));
  const tiedTypes = ALL_TYPE_IDS.filter((id) => scores[id] === maxScore);

  return {
    type: tiedTypes[0],
    isTie: tiedTypes.length > 1,
    tiedTypes,
    topScore: maxScore,
  };
}

export function calculateResults(answers: (number | null)[]): TestResult {
  const scores = tallyScores(answers);
  const { type: primaryType, isTie, tiedTypes, topScore } =
    getPrimaryType(scores);
  const { wing, isWingTie, wingTiedTypes } = getWingResult(
    primaryType,
    scores
  );

  return {
    primaryType,
    wing,
    scores,
    isTie,
    tiedTypes,
    isWingTie,
    wingTiedTypes,
    topScore,
  };
}