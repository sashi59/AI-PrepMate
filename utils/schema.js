import { pgTable, serial, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const MockInterview = pgTable("mockInterview", {
  id: serial("id").primaryKey(),
  jsonMockResponse: text("jsonMockResponse").notNull(),
  jobPosition: varchar("jobPosition").notNull(),
  jobDescription: varchar("jobDescription").notNull(),
  jobExperience: varchar("jobExperience").notNull(),
  createdAt: timestamp("createdAt").default("now()"), // Use string "now()" for default
  updatedAt: timestamp("updatedAt").default("now()"),
  createdBy: varchar("createdBy").notNull(),
  mockId: varchar("mockId").notNull(),
  // Add any additional fields you need for your table here.
});

export const userAnswerTable = pgTable("userAnswerTable", {
  id: serial("id").primaryKey(),
  mockIdRef: varchar("mockId").notNull(),
  question: varchar("question").notNull(),
  correctAns: text("correctAns").notNull(),
  userAns: text("userAns").notNull(),
  rating: text("rating").notNull(),
  feedback: text("feedback").notNull(),
  userEmail: text("userEmail").notNull(),
  createdAt: timestamp("createdAt").default("now()"), // Use string "now()" for default
  updatedAt: timestamp("updatedAt").default("now()"),
  // Add any additional fields you need for your table here.
})
