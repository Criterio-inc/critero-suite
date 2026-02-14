/* ================================================================== */
/*  Upphandlingsakademin — Typ- och gränssnittsdefinitioner            */
/* ================================================================== */

/** De tre rollerna i upphandlingsakademin */
export type AcademyRole = "BESTALLARE" | "UPPHANDLARE" | "SYSTEMAGARE";

/* ---- Quiz / bedömning ---- */

export interface QuizOption {
  id: string;        // "a", "b", "c", "d"
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  explanation: string; // Visas efter svar
}

export interface ModuleQuiz {
  questions: QuizQuestion[];
  passingScore: number; // Antal rätt som krävs
}

/* ---- Scenariosimulering ---- */

export interface ScenarioChoice {
  id: string;
  text: string;
  isOptimal: boolean;
  feedback: string;
}

export interface ScenarioStep {
  situation: string;
  question: string;
  choices: ScenarioChoice[];
}

export interface Scenario {
  id: string;
  title: string;
  context: string;
  steps: ScenarioStep[];
  roleRelevance?: AcademyRole[];
}

/* ---- Rollfördjupning ---- */

export interface RoleDeepDive {
  role: AcademyRole;
  perspective: string;
  keyActions: string[];
  pitfalls: string[];
}

/* ---- Förbättrad modul ---- */

export interface EnhancedModule {
  id: string;

  title: string;

  /** Teorisektion — paragraftexter + nyckelpunkter */
  theory: {
    content: string[];
    keyPoints: string[];
  };

  /** Scenariosimulering (valfri — visas inte om undefined) */
  scenario?: Scenario;

  /** Rollfördjupning (valfri — visas inte om undefined) */
  roleDeepDives?: RoleDeepDive[];

  /** Reflektionsfråga */
  reflection: {
    question: string;
  };

  /** Quiz (valfri — visas inte om undefined) */
  quiz?: ModuleQuiz;
}

/* ---- Förbättrad kurs ---- */

export interface EnhancedCourse {
  id: string;
  title: string;
  icon: string;
  description: string;
  level: "Grundläggande" | "Medel" | "Avancerad";
  estimatedMinutes: number;
  tags: string[];
  modules: EnhancedModule[];
}

/* ---- Progressionsspårning (localStorage) ---- */

export interface ModuleProgress {
  theoryCompleted: boolean;
  scenarioCompleted: boolean;
  reflectionCompleted: boolean;
  quizCompleted: boolean;
  quizScore: number; // Antal rätt
}

export interface CourseProgress {
  modules: Record<string, ModuleProgress>;
}

export interface AcademyProgress {
  courses: Record<string, CourseProgress>;
}

/** Standardvärden för ny modulprogression */
export function createEmptyModuleProgress(): ModuleProgress {
  return {
    theoryCompleted: false,
    scenarioCompleted: false,
    reflectionCompleted: false,
    quizCompleted: false,
    quizScore: 0,
  };
}
