"use server";
export const fetchData = async <T>(
  url: string,
  method: string = "GET",
  headers: Record<string, string> = {},
  body?: T,
  token?: string
) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  console.log("body", body);

  if (!baseUrl) {
    throw new Error("API base URL is not defined");
  }

  const fullUrl = `${baseUrl}${url}`;

  try {
    const response = await fetch(fullUrl, {
      method: method,
      headers: new Headers({
        "Content-Type": "application/json",
        "x-agent-key": process.env.NEXT_PUBLIC_X_AGENT_KEY || "",
        Authorization: token ? `Bearer ${token}` : "",
        ...headers,
      }),
      body:
        method === "POST" || method === "PUT"
          ? JSON.stringify(body)
          : undefined,
    });

    return await response.json();
  } catch (error) {
    console.log("API request error:", error);
    throw error;
  }
};
