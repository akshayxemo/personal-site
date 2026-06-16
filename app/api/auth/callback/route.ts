import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");

  if (!code) {
    return new NextResponse("Missing code", {
      status: 400,
    });
  }

  const tokenResponse = await fetch(
    "https://github.com/login/oauth/access_token",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: new URLSearchParams({
        client_id: process.env.GITHUB_CLIENT_ID!,
        client_secret: process.env.GITHUB_CLIENT_SECRET!,
        code,
      }),
    }
  );

  const tokenData = await tokenResponse.json();

  return new NextResponse(`
    <script>
      window.opener.postMessage(
        'authorization:github:success:${tokenData.access_token}',
        '*'
      );
      window.close();
    </script>
  `, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}