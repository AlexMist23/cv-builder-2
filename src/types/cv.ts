export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  startDate: Date | null;
  endDate: Date | null;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  startDate: Date | null;
  endDate: Date | null;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  techStack: string[];
  demo?: string;
  repository?: string;
  description: string;
}

export interface Course {
  id: string;
  title: string;
  provider: string;
  date: Date | null;
  description: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
}

export type SkillCategory =
  | "programmingLanguages"
  | "backEndTech"
  | "frontEndTech"
  | "versionControl"
  | "developmentTools"
  | "databases";

export interface CVData {
  name: string;
  email: string;
  phone: string;
  summary?: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: string[] | Record<SkillCategory, string[]>;
  projects: Project[];
  courses: Course[];
  languages: Language[];
  image: string | null;
  personalWebsite?: string;
  linkedin?: string;
  github?: string;
}

export type CVSection =
  | "personalInfo"
  | "summary"
  | "workExperience"
  | "education"
  | "skills"
  | "projects"
  | "courses"
  | "languages";

export interface CVDesign {
  name: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  fontFamily: string;
}
