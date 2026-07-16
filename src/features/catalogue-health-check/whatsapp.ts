import type { CatalogueHealthCheckInput } from "./schema";

const PTY_AUDIO_WHATSAPP_NUMBER = "50765164741";

type WhatsAppPayload = {
  messaging_product: "whatsapp";
  to: string;
  type: "template" | "text";
  text?: {
    preview_url: false;
    body: string;
  };
};

export type WhatsAppResult = {
  ok: boolean;
  mode: "sent" | "simulated";
  message: string;
};

export function formatLeadNotification(
  lead: CatalogueHealthCheckInput,
): string {
  return [
    "New Catalogue Health Check lead",
    `Name: ${lead.fullName}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone}`,
    `Type: ${lead.userType}`,
    `Songs: ${lead.songCount}`,
    `Recordings: ${lead.recordingCount}`,
    `Release years: ${lead.releaseYears}`,
    `Platforms: ${lead.platforms.join(", ")}`,
    `Rights orgs: ${lead.rightsOrganizations.join(", ")}`,
    `Problems: ${lead.problems.join(", ")}`,
    `Notes: ${lead.notes || "None"}`,
  ].join("\n");
}

export async function sendWhatsAppLeadNotification(
  lead: CatalogueHealthCheckInput,
): Promise<WhatsAppResult> {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const apiVersion = process.env.WHATSAPP_API_VERSION ?? "v20.0";
  const body = formatLeadNotification(lead);

  const payload: WhatsAppPayload = {
    messaging_product: "whatsapp",
    to: PTY_AUDIO_WHATSAPP_NUMBER,
    type: "text",
    text: {
      preview_url: false,
      body,
    },
  };

  if (!phoneNumberId || !accessToken) {
    console.info("WhatsApp notification simulated", payload);
    return {
      ok: true,
      mode: "simulated",
      message: "WhatsApp env vars missing; notification simulated.",
    };
  }

  const response = await fetch(
    `https://graph.facebook.com/${apiVersion}/${phoneNumberId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  if (!response.ok) {
    const error = await response.text();
    return {
      ok: false,
      mode: "sent",
      message: error,
    };
  }

  return {
    ok: true,
    mode: "sent",
    message: "WhatsApp notification sent.",
  };
}
