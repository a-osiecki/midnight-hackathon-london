import "dotenv/config";

export const CONFIG = {
  CLIENT_ID: process.env.STRAVA_CLIENT_ID!,
  CLIENT_SECRET: process.env.STRAVA_CLIENT_SECRET!,
  REDIRECT_URI: "http://localhost:3000/callback",
  STRAVA_BASE: "https://www.strava.com/api/v3",
};
