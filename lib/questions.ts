import type { EnneagramTypeId } from "./types";

export interface Question {
  id: number;
  text: string;
  typeId: EnneagramTypeId;
}

export const QUESTIONS_PER_PAGE = 5;
export const TOTAL_PAGES = 9;

export const QUESTIONS: Question[] = [
  { id: 1, text: "I feel a strong need to do things the right way.", typeId: 1 },
  { id: 2, text: "I naturally sense what others need emotionally.", typeId: 2 },
  { id: 3, text: "I set ambitious goals and work hard to achieve them.", typeId: 3 },
  { id: 4, text: "I often feel different from others in ways that are hard to explain.", typeId: 4 },
  { id: 5, text: "I prefer to observe and understand before taking action.", typeId: 5 },
  { id: 6, text: "I tend to think through worst-case scenarios before acting.", typeId: 6 },
  { id: 7, text: "I like keeping my options open and avoid feeling trapped.", typeId: 7 },
  { id: 8, text: "I am comfortable taking charge in difficult situations.", typeId: 8 },
  { id: 9, text: "I go along with others to keep the peace.", typeId: 9 },
  { id: 10, text: "I notice mistakes and inefficiencies that others overlook.", typeId: 1 },
  { id: 11, text: "I find it hard to say no when someone asks for help.", typeId: 2 },
  { id: 12, text: "I care about how others perceive my success.", typeId: 3 },
  { id: 13, text: "I am drawn to deep emotional experiences and artistic expression.", typeId: 4 },
  { id: 14, text: "I need plenty of alone time to recharge.", typeId: 5 },
  { id: 15, text: "Loyalty and trust are extremely important to me in relationships.", typeId: 6 },
  { id: 16, text: "I gravitate toward fun, stimulating experiences.", typeId: 7 },
  { id: 17, text: "I speak my mind directly, even when it is uncomfortable.", typeId: 8 },
  { id: 18, text: "I find it easy to see multiple sides of an argument.", typeId: 9 },
  { id: 19, text: "I hold myself to high moral and ethical standards.", typeId: 1 },
  { id: 20, text: "I want people to feel cared for and appreciated.", typeId: 2 },
  { id: 21, text: "I adapt my image to fit what will impress people.", typeId: 3 },
  { id: 22, text: "I long for something authentic that feels uniquely mine.", typeId: 4 },
  { id: 23, text: "I enjoy diving deep into topics that interest me.", typeId: 5 },
  { id: 24, text: "I look to reliable systems or people for guidance when uncertain.", typeId: 6 },
  { id: 25, text: "I quickly move on when something becomes boring or painful.", typeId: 7 },
  { id: 26, text: "I protect the people I care about fiercely.", typeId: 8 },
  { id: 27, text: "I tend to put off decisions that might create conflict.", typeId: 9 },
  { id: 28, text: "I feel uncomfortable when things are disorganized or out of place.", typeId: 1 },
  { id: 29, text: "I sometimes put others' needs ahead of my own.", typeId: 2 },
  { id: 30, text: "I feel energized when I accomplish something noteworthy.", typeId: 3 },
  { id: 31, text: "I can become preoccupied with what I feel is missing in my life.", typeId: 4 },
  { id: 32, text: "I guard my time and energy carefully.", typeId: 5 },
  { id: 33, text: "I am vigilant about potential risks and threats.", typeId: 6 },
  { id: 34, text: "I enjoy planning exciting possibilities for the future.", typeId: 7 },
  { id: 35, text: "I dislike feeling controlled or vulnerable.", typeId: 8 },
  { id: 36, text: "I feel most at ease when my environment is calm and harmonious.", typeId: 9 },
  { id: 37, text: "I often feel responsible for improving the world around me.", typeId: 1 },
  { id: 38, text: "Being needed by others makes me feel valued.", typeId: 2 },
  { id: 39, text: "I prefer to focus on results rather than process.", typeId: 3 },
  { id: 40, text: "I value individuality over fitting in with the crowd.", typeId: 4 },
  { id: 41, text: "I feel most comfortable when I have sufficient knowledge about a situation.", typeId: 5 },
  { id: 42, text: "I value belonging to a group or community I can count on.", typeId: 6 },
  { id: 43, text: "I prefer to stay upbeat rather than dwell on negative feelings.", typeId: 7 },
  { id: 44, text: "I respect strength and honesty in others.", typeId: 8 },
  { id: 45, text: "I sometimes lose track of my own priorities while helping others.", typeId: 9 },
];

export function getQuestionsForPage(page: number): Question[] {
  const start = page * QUESTIONS_PER_PAGE;
  return QUESTIONS.slice(start, start + QUESTIONS_PER_PAGE);
}