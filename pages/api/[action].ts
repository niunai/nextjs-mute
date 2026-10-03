import type { NextApiRequest, NextApiResponse } from "next";

const actions = new Set(["mute", "unmute"]);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const action = req.query.action;
  const apiServerUrl = process.env.NEXT_PUBLIC_MUTE_SERVER_API_URL;

  if (typeof action !== "string" || !actions.has(action)) {
    return res.status(404).json({ error: "Unknown action" });
  }

  if (!apiServerUrl) {
    return res.status(500).json({ error: "Mute API URL is not configured" });
  }

  try {
    const upstream = await fetch(
      `${apiServerUrl.replace(/\/+$/, "")}/${action}`
    );
    const data = await upstream.json();
    return res.status(upstream.status).json(data);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Mute API request failed";
    console.error(`Mute API ${action} request failed:`, error);
    return res.status(502).json({ error: message });
  }
}
