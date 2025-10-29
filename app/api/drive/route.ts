import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    let fileId = searchParams.get("id");

    if (!fileId) {
      return NextResponse.json({ error: "No file ID provided" }, { status: 400 });
    }

    const match = fileId.match(/(?:id=)([-\w]+)/);
    if (match) fileId = match[1];

    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;

    if (!clientEmail || !privateKey) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    });

    const drive = google.drive({ version: "v3", auth });

    const response = await drive.files.get(
      { fileId, alt: "media" },
      { responseType: "stream" }
    );

    const chunks: Uint8Array[] = [];
    await new Promise<void>((resolve, reject) => {
      response.data.on("data", (chunk: Uint8Array) => chunks.push(chunk));
      response.data.on("end", () => resolve());
      response.data.on("error", reject);
    });

    const buffer = Buffer.concat(chunks);

    return new NextResponse(buffer, {
      status: 200,
      headers: { "Content-Type": "image/jpeg" },
    });
  } catch (err) {
    console.error("Drive API error:", err);
    return NextResponse.json({ error: "Failed to fetch image" }, { status: 500 });
  }
}
