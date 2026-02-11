// Questionnaire types for KMMP RPE FOOTBALL

export type QuestionType = 'scale' | 'text';

export interface ScaleConfig {
  min: number;
  max: number;
  minLabel: string;
  maxLabel: string;
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  scaleConfig?: ScaleConfig; // For scale questions
  required: boolean;
  category?: string; // e.g., "Physical", "Mental", "Recovery"
  createdAt: string;
}

export interface Questionnaire {
  id: string;
  title: string;
  description?: string;
  timing: 'pre_training' | 'post_training'; // When to use it
  questions: Question[];
  createdBy: string; // Coach ID
  teamId?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface QuestionnaireResponse {
  id: string;
  questionnaireId: string;
  playerId: string;
  trainingSessionId?: string; // Link to training session
  answers: Answer[];
  submittedAt: string;
  notes?: string;
}

export interface Answer {
  questionId: string;
  value: string | number; // Text or scale value
}

// Default questions for RPE assessment
export const DEFAULT_RPE_QUESTIONS: Question[] = [
  {
    id: 'rpe_fatigue',
    text: 'How tired are you?',
    type: 'scale',
    scaleConfig: {
      min: 0,
      max: 10,
      minLabel: 'Not tired at all',
      maxLabel: 'Extremely tired',
    },
    required: true,
    category: 'Physical',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'rpe_intensity',
    text: 'How would you rate the training intensity?',
    type: 'scale',
    scaleConfig: {
      min: 0,
      max: 10,
      minLabel: 'Very light',
      maxLabel: 'Maximum effort',
    },
    required: true,
    category: 'Training',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'rpe_soreness',
    text: 'How is your muscle soreness?',
    type: 'scale',
    scaleConfig: {
      min: 0,
      max: 10,
      minLabel: 'No soreness',
      maxLabel: 'Very sore',
    },
    required: true,
    category: 'Physical',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'rpe_sleep',
    text: 'How would you rate your sleep quality last night?',
    type: 'scale',
    scaleConfig: {
      min: 0,
      max: 10,
      minLabel: 'Very poor',
      maxLabel: 'Excellent',
    },
    required: false,
    category: 'Recovery',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'rpe_mood',
    text: 'How is your mood today?',
    type: 'scale',
    scaleConfig: {
      min: 0,
      max: 10,
      minLabel: 'Very bad',
      maxLabel: 'Excellent',
    },
    required: false,
    category: 'Mental',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'rpe_comments',
    text: 'Additional comments',
    type: 'text',
    required: false,
    category: 'General',
    createdAt: new Date().toISOString(),
  },
];
