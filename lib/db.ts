import fs from "fs";
import path from "path";
import {
  Grade,
  Subject,
  Textbook,
  Unit,
  Correction,
  User,
  PublicSubmission,
  StatsSummary,
  CorrectionCategory,
  SeverityLevel,
  ResearchStatus,
  PublicationStatus,
} from "./types";
import {
  initialGrades,
  initialSubjects,
  initialTextbooks,
  initialUnits,
  initialCorrections,
} from "./seed-data";

interface DatabaseSchema {
  users: User[];
  grades: Grade[];
  subjects: Subject[];
  textbooks: Textbook[];
  units: Unit[];
  corrections: Correction[];
  submissions: PublicSubmission[];
}

const DB_PATH = path.join(process.cwd(), "data", "textfix-db.json");

function ensureDb(): DatabaseSchema {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(DB_PATH)) {
    const initialDb: DatabaseSchema = {
      users: [],
      grades: initialGrades,
      subjects: initialSubjects,
      textbooks: initialTextbooks,
      units: initialUnits,
      corrections: initialCorrections,
      submissions: [
        {
          id: "sub-demo-01",
          textbook: "Ethiopian New Curriculum Grade 11 Biology Student Textbook",
          grade: "Grade 11",
          subject: "Biology",
          unit: "Unit 1: Biology and Technology",
          pageNumber: 12,
          originalStatement:
            "Electrophoresis separates DNA molecules solely based on their mass without electrical current.",
          issueReason:
            "Electrophoresis relies fundamentally on an applied electrical charge/field to migrate negatively charged phosphate backbones through an agarose matrix.",
          suggestedCorrection:
            "Electrophoresis separates DNA fragments based on size by applying an electric field through a gel matrix.",
          evidence:
            "Standard molecular biology protocols dictate that an electrical gradient is indispensable for gel electrophoresis.",
          submitterName: "Abebe T.",
          submitterEmail: "abebe.edu@example.com",
          status: "Pending",
          createdAt: new Date().toISOString(),
        },
      ],
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(initialDb, null, 2), "utf8");
    return initialDb;
  }

  try {
    const raw = fs.readFileSync(DB_PATH, "utf8");
    return JSON.parse(raw) as DatabaseSchema;
  } catch (err) {
    console.error("Error reading database file, re-initializing from memory:", err);
    return {
      users: [],
      grades: initialGrades,
      subjects: initialSubjects,
      textbooks: initialTextbooks,
      units: initialUnits,
      corrections: initialCorrections,
      submissions: [],
    };
  }
}

function saveDb(data: DatabaseSchema): void {
  const tempPath = `${DB_PATH}.tmp.${Date.now()}`;
  fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), "utf8");
  fs.renameSync(tempPath, DB_PATH);
}

export const db = {
  // Grades
  getGrades(): Grade[] {
    return ensureDb().grades.sort((a, b) => a.orderIndex - b.orderIndex);
  },
  getGradeBySlug(slug: string): Grade | undefined {
    return ensureDb().grades.find((g) => g.slug === slug || g.id === slug);
  },

  // Subjects
  getSubjects(): Subject[] {
    return ensureDb().subjects;
  },
  getSubjectBySlug(slug: string): Subject | undefined {
    return ensureDb().subjects.find((s) => s.slug === slug || s.id === slug);
  },

  // Textbooks
  getTextbooks(): Textbook[] {
    return ensureDb().textbooks;
  },
  getTextbookById(id: string): Textbook | undefined {
    return ensureDb().textbooks.find((t) => t.id === id);
  },
  getTextbooksByGrade(gradeId: string): Textbook[] {
    return ensureDb().textbooks.filter((t) => t.gradeId === gradeId);
  },
  getTextbooksByGradeAndSubject(gradeId: string, subjectId: string): Textbook | undefined {
    return ensureDb().textbooks.find(
      (t) => t.gradeId === gradeId && t.subjectId === subjectId
    );
  },

  // Units
  getUnits(): Unit[] {
    return ensureDb().units.sort((a, b) => a.unitNumber - b.unitNumber);
  },
  getUnitsByTextbook(textbookId: string): Unit[] {
    return ensureDb()
      .units.filter((u) => u.textbookId === textbookId)
      .sort((a, b) => a.unitNumber - b.unitNumber);
  },
  getUnitById(id: string): Unit | undefined {
    return ensureDb().units.find((u) => u.id === id);
  },
  getUnitBySlug(textbookId: string, slug: string): Unit | undefined {
    return ensureDb().units.find(
      (u) => u.textbookId === textbookId && (u.slug === slug || `unit-${u.unitNumber}` === slug)
    );
  },

  // Corrections
  getCorrections(filters?: {
    unitId?: string;
    pageNumber?: number;
    category?: CorrectionCategory;
    severity?: SeverityLevel;
    researchStatus?: ResearchStatus;
    publicationStatus?: PublicationStatus;
    query?: string;
    limit?: number;
    offset?: number;
  }): { items: Correction[]; total: number } {
    const data = ensureDb();
    let items = [...data.corrections];

    if (filters?.unitId) {
      items = items.filter((c) => c.unitId === filters.unitId);
    }
    if (filters?.pageNumber) {
      items = items.filter(
        (c) =>
          c.pageNumber === filters.pageNumber ||
          (c.affectedPages && c.affectedPages.includes(filters.pageNumber!))
      );
    }
    if (filters?.category) {
      items = items.filter((c) => c.category === filters.category);
    }
    if (filters?.severity) {
      items = items.filter((c) => c.severity === filters.severity);
    }
    if (filters?.researchStatus) {
      items = items.filter((c) => c.researchStatus === filters.researchStatus);
    }
    if (filters?.publicationStatus) {
      items = items.filter((c) => c.publicationStatus === filters.publicationStatus);
    }
    if (filters?.query) {
      const q = filters.query.toLowerCase().trim();
      items = items.filter((c) => {
        return (
          c.refCode.toLowerCase().includes(q) ||
          c.title.toLowerCase().includes(q) ||
          c.originalText.toLowerCase().includes(q) ||
          c.issue.toLowerCase().includes(q) ||
          c.suggestedCorrection.toLowerCase().includes(q) ||
          (c.evidence && c.evidence.toLowerCase().includes(q)) ||
          c.pageNumber.toString() === q ||
          (c.affectedPages && c.affectedPages.some((p) => p.toString() === q))
        );
      });
    }

    // Sort primarily by page number then refCode
    items.sort((a, b) => {
      if (a.pageNumber !== b.pageNumber) return a.pageNumber - b.pageNumber;
      return a.refCode.localeCompare(b.refCode);
    });

    const total = items.length;
    if (filters?.offset) {
      items = items.slice(filters.offset);
    }
    if (filters?.limit) {
      items = items.slice(0, filters.limit);
    }

    return { items, total };
  },

  getCorrectionById(id: string): Correction | undefined {
    return ensureDb().corrections.find((c) => c.id === id);
  },

  getCorrectionByRefCode(unitId: string, refCode: string): Correction | undefined {
    const code = refCode.toUpperCase();
    return ensureDb().corrections.find(
      (c) => c.unitId === unitId && c.refCode.toUpperCase() === code
    );
  },

  createCorrection(data: Omit<Correction, "id" | "createdAt" | "updatedAt">): Correction {
    const dbData = ensureDb();
    const now = new Date().toISOString();
    const newCorrection: Correction = {
      ...data,
      id: `c-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      createdAt: now,
      updatedAt: now,
    };
    dbData.corrections.push(newCorrection);
    saveDb(dbData);
    return newCorrection;
  },

  updateCorrection(id: string, updates: Partial<Correction>): Correction | null {
    const dbData = ensureDb();
    const idx = dbData.corrections.findIndex((c) => c.id === id);
    if (idx === -1) return null;

    dbData.corrections[idx] = {
      ...dbData.corrections[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    saveDb(dbData);
    return dbData.corrections[idx];
  },

  deleteCorrection(id: string): boolean {
    const dbData = ensureDb();
    const initialLen = dbData.corrections.length;
    dbData.corrections = dbData.corrections.filter((c) => c.id !== id);
    if (dbData.corrections.length !== initialLen) {
      saveDb(dbData);
      return true;
    }
    return false;
  },

  // Bulk Import
  bulkImportCorrections(
    unitId: string,
    newRecords: Array<Omit<Correction, "id" | "unitId" | "createdAt" | "updatedAt">>
  ): { imported: number; duplicatesSkipped: number; errors: string[] } {
    const dbData = ensureDb();
    let imported = 0;
    let duplicatesSkipped = 0;
    const errors: string[] = [];
    const now = new Date().toISOString();

    const existingRefCodes = new Set(
      dbData.corrections
        .filter((c) => c.unitId === unitId)
        .map((c) => c.refCode.toUpperCase())
    );

    for (const record of newRecords) {
      if (!record.refCode || !record.pageNumber || !record.originalText || !record.suggestedCorrection) {
        errors.push(`Record missing essential fields: refCode=${record.refCode || "UNKNOWN"}`);
        continue;
      }

      const upperRef = record.refCode.toUpperCase();
      if (existingRefCodes.has(upperRef)) {
        duplicatesSkipped++;
        continue;
      }

      existingRefCodes.add(upperRef);
      const newCorrection: Correction = {
        ...record,
        id: `c-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        unitId,
        createdAt: now,
        updatedAt: now,
      };
      dbData.corrections.push(newCorrection);
      imported++;
    }

    saveDb(dbData);
    return { imported, duplicatesSkipped, errors };
  },

  // Submissions
  getSubmissions(): PublicSubmission[] {
    return ensureDb().submissions.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },
  createSubmission(data: Omit<PublicSubmission, "id" | "createdAt" | "status">): PublicSubmission {
    const dbData = ensureDb();
    const newSubmission: PublicSubmission = {
      ...data,
      id: `sub-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };
    dbData.submissions.unshift(newSubmission);
    saveDb(dbData);
    return newSubmission;
  },
  updateSubmissionStatus(id: string, status: "Pending" | "Approved" | "Rejected"): boolean {
    const dbData = ensureDb();
    const sub = dbData.submissions.find((s) => s.id === id);
    if (sub) {
      sub.status = status;
      saveDb(dbData);
      return true;
    }
    return false;
  },

  // Users & Auth
  getUsers(): User[] {
    return ensureDb().users;
  },
  getUserByEmail(email: string): User | undefined {
    return ensureDb().users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  },
  getUserById(id: string): User | undefined {
    return ensureDb().users.find((u) => u.id === id);
  },
  createUser(userData: Omit<User, "id" | "createdAt">): User {
    const dbData = ensureDb();
    const newUser: User = {
      ...userData,
      id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
    };
    dbData.users.push(newUser);
    saveDb(dbData);
    return newUser;
  },

  // Stats
  getStats(): StatsSummary {
    const data = ensureDb();
    return {
      totalCorrections: data.corrections.length,
      publishedCorrections: data.corrections.filter((c) => c.publicationStatus === "Published").length,
      expertReviewedCorrections: data.corrections.filter((c) => c.researchStatus === "Expert Reviewed").length,
      needsReviewCorrections: data.corrections.filter((c) => c.researchStatus === "Needs Expert Review").length,
      unitsActive: data.units.filter((u) => u.isPublished).length,
      unitsUnderReview: data.units.filter((u) => !u.isPublished).length,
      gradesCount: data.grades.length,
      subjectsCount: data.subjects.length,
      highSchoolTextbooksCovered: data.textbooks.length,
    };
  },
};
