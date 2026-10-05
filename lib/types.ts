export type UserRole = "admin" | "researcher" | "user";

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: string;
}

export interface Grade {
  id: string;
  name: string;
  slug: string;
  orderIndex: number;
}

export interface Subject {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

export interface Textbook {
  id: string;
  title: string;
  gradeId: string;
  subjectId: string;
  curriculum: string;
  language: string;
  edition: string;
  publisher: string;
  status: "Active" | "Under Systematic Review" | "Scheduled";
  description?: string;
  coverImage?: string;
}

export interface Unit {
  id: string;
  textbookId: string;
  unitNumber: number;
  title: string;
  slug: string;
  description: string;
  pageRange: string;
  reviewStatus: "Research Completed" | "Under Review" | "Scheduled";
  pdfUrl?: string;
  isPublished: boolean;
}

export type CorrectionCategory =
  | "Grammar"
  | "Word Choice"
  | "Factual Error"
  | "Scientific Terminology"
  | "Conceptual/Definitional"
  | "Formatting"
  | "Consistency"
  | "Typo"
  | "Punctuation"
  | "Question/Assessment Error"
  | "Flag for expert verification"
  | "Other";

export type SeverityLevel = "Minor" | "Moderate" | "Critical";

export type ResearchStatus =
  | "Draft"
  | "Research Completed"
  | "Needs Expert Review"
  | "Under Expert Review"
  | "Expert Reviewed"
  | "Rejected"
  | "Withdrawn";

export type PublicationStatus = "Draft" | "Published" | "Archived";

export interface ExpertReviewInfo {
  reviewerName?: string;
  qualification?: string;
  subjectArea?: string;
  reviewDate?: string;
  reviewOutcome?: string;
  comments?: string;
  isAttributed?: boolean;
}

export interface Correction {
  id: string;
  refCode: string; // e.g. "P2-01", "P8-02", "P10-01"
  unitId: string;
  pageNumber: number;
  affectedPages?: number[]; // e.g. [9, 11, 13, 15, 17, 19] for recurring issues
  chapterSection?: string;
  category: CorrectionCategory;
  severity: SeverityLevel;
  title: string;
  originalText: string;
  issue: string;
  suggestedCorrection: string;
  evidence?: string;
  sources?: string[];
  researchStatus: ResearchStatus;
  publicationStatus: PublicationStatus;
  isRecurring?: boolean;
  relatedRefCodes?: string[]; // e.g. ["P4-01"]
  specialNotes?: string;
  expertReview?: ExpertReviewInfo;
  createdAt: string;
  updatedAt: string;
}

export interface PublicSubmission {
  id: string;
  textbook: string;
  grade: string;
  subject: string;
  unit: string;
  pageNumber: number;
  originalStatement: string;
  issueReason: string;
  suggestedCorrection: string;
  evidence?: string;
  submitterName?: string;
  submitterEmail?: string;
  status: "Pending" | "Approved" | "Rejected";
  createdAt: string;
}

export interface StatsSummary {
  totalCorrections: number;
  publishedCorrections: number;
  expertReviewedCorrections: number;
  needsReviewCorrections: number;
  unitsActive: number;
  unitsUnderReview: number;
  gradesCount: number;
  subjectsCount: number;
  highSchoolTextbooksCovered: number;
}
