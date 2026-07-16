import { z } from "zod";

export const userTypes = [
  "artist",
  "producer",
  "songwriter",
  "label",
  "catalogueOwner",
] as const;

export const platforms = [
  "spotify",
  "appleMusic",
  "youtube",
  "tiktok",
  "amazonMusic",
  "other",
] as const;

export const rightsOrganizations = [
  "ascap",
  "bmi",
  "sesac",
  "mlc",
  "cmrra",
  "soundExchange",
] as const;

export const catalogueProblems = [
  "missingRoyalties",
  "ownershipConflict",
  "metadataProblems",
  "unregisteredWorks",
  "duplicateRegistrations",
] as const;

export const catalogueHealthCheckSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().min(7).max(40),
  userType: z.enum(userTypes),
  songCount: z.number().int().min(0).max(100000),
  recordingCount: z.number().int().min(0).max(100000),
  releaseYears: z.string().trim().min(4).max(80),
  platforms: z.array(z.enum(platforms)).min(1),
  rightsOrganizations: z.array(z.enum(rightsOrganizations)).min(1),
  problems: z.array(z.enum(catalogueProblems)).min(1),
  notes: z.string().trim().max(1200).optional().or(z.literal("")),
});

export type CatalogueHealthCheckInput = z.infer<
  typeof catalogueHealthCheckSchema
>;
