"use server";

import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import {
  catalogueHealthCheckSchema,
  type CatalogueHealthCheckInput,
} from "./schema";
import { sendWhatsAppLeadNotification } from "./whatsapp";

export type CatalogueHealthCheckActionState = {
  ok: boolean;
  message: string;
  leadId?: string;
  errors?: Record<string, string[]>;
};

function formDataToInput(formData: FormData): CatalogueHealthCheckInput {
  return {
    fullName: String(formData.get("fullName") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    userType: String(formData.get("userType") ?? "") as CatalogueHealthCheckInput["userType"],
    songCount: Number(formData.get("songCount") ?? 0),
    recordingCount: Number(formData.get("recordingCount") ?? 0),
    releaseYears: String(formData.get("releaseYears") ?? ""),
    platforms: formData.getAll("platforms") as CatalogueHealthCheckInput["platforms"],
    rightsOrganizations: formData.getAll(
      "rightsOrganizations",
    ) as CatalogueHealthCheckInput["rightsOrganizations"],
    problems: formData.getAll("problems") as CatalogueHealthCheckInput["problems"],
    notes: String(formData.get("notes") ?? ""),
  };
}

async function persistLocalLead(lead: CatalogueHealthCheckInput) {
  const leadId = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  const dir = join(process.cwd(), "data", "leads");
  const file = join(dir, `${leadId}.json`);

  await mkdir(dir, { recursive: true });
  await writeFile(
    file,
    JSON.stringify(
      {
        id: leadId,
        type: "catalogue-health-check",
        createdAt,
        source: "website",
        status: "new",
        data: lead,
      },
      null,
      2,
    ),
    "utf8",
  );

  return leadId;
}

export async function submitCatalogueHealthCheck(
  _previousState: CatalogueHealthCheckActionState,
  formData: FormData,
): Promise<CatalogueHealthCheckActionState> {
  const parsed = catalogueHealthCheckSchema.safeParse(formDataToInput(formData));

  if (!parsed.success) {
    return {
      ok: false,
      message: "Validation failed.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const leadId = await persistLocalLead(parsed.data);
  const whatsapp = await sendWhatsAppLeadNotification(parsed.data);

  if (!whatsapp.ok) {
    return {
      ok: false,
      leadId,
      message: "Lead saved locally, but WhatsApp notification failed.",
    };
  }

  return {
    ok: true,
    leadId,
    message: whatsapp.message,
  };
}
