export type EnneagramTypeId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface EnneagramType {
  id: EnneagramTypeId;
  name: string;
  tagline: string;
  color: string;
  shortSummary: string;
  longDescription: string;
  strengths: string[];
  growthEdge: string;
}

export const ENNEAGRAM_TYPES: Record<EnneagramTypeId, EnneagramType> = {
  1: {
    id: 1,
    name: "The Reformer",
    tagline: "Principled, purposeful, self-controlled",
    color: "#5B6E7A",
    shortSummary:
      "You are motivated by a desire to be good, right, and improve the world. Integrity and high standards guide your choices.",
    longDescription:
      "Ones are conscientious and ethical, with a strong sense of right and wrong. They strive to live up to their ideals and often feel a personal responsibility to make things better. At their best, they are wise, discerning, and inspiring examples of integrity. Their inner critic can be demanding, but it also fuels their commitment to growth and meaningful change.",
    strengths: ["Integrity", "Discipline", "Fairness", "Reliability"],
    growthEdge:
      "Practice self-compassion and accept that perfection is not required for things to be worthwhile.",
  },
  2: {
    id: 2,
    name: "The Helper",
    tagline: "Caring, generous, people-pleasing",
    color: "#C45C7A",
    shortSummary:
      "You are motivated by a desire to be loved and needed. You naturally tune into others and offer warmth and support.",
    longDescription:
      "Twos are empathetic, sincere, and deeply oriented toward relationships. They take pride in being helpful and often anticipate what others need before it is asked. At their best, they are genuinely nurturing and bring people together with warmth. They may struggle to acknowledge their own needs, but learning to receive care is part of their path to balance.",
    strengths: ["Empathy", "Generosity", "Warmth", "Encouragement"],
    growthEdge:
      "Honor your own needs and boundaries — giving from fullness, not from a need to be needed.",
  },
  3: {
    id: 3,
    name: "The Achiever",
    tagline: "Adaptable, driven, image-conscious",
    color: "#C9A227",
    shortSummary:
      "You are motivated by a desire to feel valuable and worthwhile. Success, accomplishment, and admiration matter to you.",
    longDescription:
      "Threes are energetic, pragmatic, and goal-oriented. They excel at presenting their best self and moving efficiently toward achievement. At their best, they are authentic role models who inspire others through real accomplishment. They can lose touch with their deeper feelings while chasing external validation, but reconnecting with inner truth brings lasting fulfillment.",
    strengths: ["Ambition", "Efficiency", "Confidence", "Adaptability"],
    growthEdge:
      "Slow down and connect with who you are beyond your achievements and image.",
  },
  4: {
    id: 4,
    name: "The Individualist",
    tagline: "Expressive, introspective, emotionally deep",
    color: "#7B5EA7",
    shortSummary:
      "You are motivated by a desire to find yourself and be understood. Authenticity and emotional depth are central to who you are.",
    longDescription:
      "Fours are self-aware, creative, and emotionally honest. They are drawn to what is meaningful and often feel a longing for something just out of reach. At their best, they transform personal experience into beauty and insight that resonates with others. They may dwell on what is missing, but embracing the present helps them appreciate their own unique gifts.",
    strengths: ["Creativity", "Depth", "Authenticity", "Sensitivity"],
    growthEdge:
      "Notice what is already good in your life rather than idealizing what is absent.",
  },
  5: {
    id: 5,
    name: "The Investigator",
    tagline: "Perceptive, cerebral, private",
    color: "#3D6FA8",
    shortSummary:
      "You are motivated by a desire to be capable and knowledgeable. Understanding the world deeply helps you feel secure.",
    longDescription:
      "Fives are alert, insightful, and independent thinkers. They prefer to observe before engaging and value competence above almost everything. At their best, they are visionary pioneers who contribute original ideas. They conserve energy by withdrawing, but sharing their knowledge and engaging with others enriches both their lives and the lives of those around them.",
    strengths: ["Curiosity", "Objectivity", "Focus", "Innovation"],
    growthEdge:
      "Step into life and connection — your insights grow richer when shared, not only stored.",
  },
  6: {
    id: 6,
    name: "The Loyalist",
    tagline: "Committed, vigilant, security-oriented",
    color: "#4A6FA5",
    shortSummary:
      "You are motivated by a desire for security and support. Trust, loyalty, and preparedness help you navigate uncertainty.",
    longDescription:
      "Sixes are responsible, engaging, and deeply loyal to people and causes they believe in. They anticipate problems and work hard to build reliable foundations. At their best, they are courageous team players who face fear with steady resolve. Their vigilance can tip into anxiety, but trusting their own inner guidance builds the confidence they seek.",
    strengths: ["Loyalty", "Responsibility", "Teamwork", "Preparedness"],
    growthEdge:
      "Trust your own judgment and take action even when certainty is not guaranteed.",
  },
  7: {
    id: 7,
    name: "The Enthusiast",
    tagline: "Spontaneous, versatile, pleasure-seeking",
    color: "#D4A017",
    shortSummary:
      "You are motivated by a desire to be satisfied and content. New experiences, freedom, and optimism keep you moving forward.",
    longDescription:
      "Sevens are enthusiastic, quick-thinking, and adventurous. They generate possibilities and bring energy to every room they enter. At their best, they are joyful contributors who help others see the bright side of life. They may avoid discomfort by staying busy, but learning to sit with difficult feelings deepens their joy into something more lasting.",
    strengths: ["Optimism", "Versatility", "Energy", "Vision"],
    growthEdge:
      "Stay present with discomfort — depth and meaning often live on the other side of avoidance.",
  },
  8: {
    id: 8,
    name: "The Challenger",
    tagline: "Self-confident, decisive, protective",
    color: "#B83232",
    shortSummary:
      "You are motivated by a desire to protect yourself and stay in control. Strength, directness, and justice define your approach.",
    longDescription:
      "Eights are self-reliant, assertive, and unafraid of confrontation. They take charge in difficult situations and stand up for the vulnerable. At their best, they are magnanimous leaders who use their power to uplift others. Their intensity can intimidate, but allowing vulnerability to show creates the genuine connection they secretly crave.",
    strengths: ["Leadership", "Courage", "Directness", "Protection"],
    growthEdge:
      "Let others in — true strength includes openness, not only force.",
  },
  9: {
    id: 9,
    name: "The Peacemaker",
    tagline: "Receptive, reassuring, conflict-averse",
    color: "#4A8C6F",
    shortSummary:
      "You are motivated by a desire to have inner stability and peace of mind. Harmony, comfort, and inclusion come naturally to you.",
    longDescription:
      "Nines are accepting, trusting, and steady. They see multiple perspectives and work to create calm in their environment. At their best, they are healing presences who bring people together without force. They may merge with others' priorities and defer their own, but claiming their voice and desires leads to a more fully lived life.",
    strengths: ["Patience", "Open-mindedness", "Stability", "Mediation"],
    growthEdge:
      "Speak up for what matters to you — your presence changes things when you show up fully.",
  },
};

export const ALL_TYPE_IDS: EnneagramTypeId[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];