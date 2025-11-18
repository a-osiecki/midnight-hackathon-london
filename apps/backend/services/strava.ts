import axios from "axios";
import { CONFIG } from "../config";
import {
  StravaTokenResponse,
  StravaActivity,
  HRStreamResponse,
  StravaAthleteInfo
} from "../types/strava";

class StravaService {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private expiresAt: number | null = null;

  getAuthUrl() {
    const params = new URLSearchParams({
      client_id: CONFIG.CLIENT_ID,
      response_type: "code",
      redirect_uri: CONFIG.REDIRECT_URI,
      scope: "read_all,activity:read_all"
    });

    return `https://www.strava.com/oauth/authorize?${params.toString()}`;
  }

  async exchangeToken(code: string): Promise<void> {
    const res = await axios.post<StravaTokenResponse>(
      "https://www.strava.com/oauth/token",
      {
        client_id: CONFIG.CLIENT_ID,
        client_secret: CONFIG.CLIENT_SECRET,
        code,
        grant_type: "authorization_code",
      }
    );

    this.setTokens(res.data);
  }

  private setTokens(t: StravaTokenResponse) {
    this.accessToken = t.access_token;
    this.refreshToken = t.refresh_token;
    this.expiresAt = t.expires_at;
  }

  private async ensureValidToken() {
    if (!this.expiresAt || Date.now() < this.expiresAt * 1000) return;

    const res = await axios.post<StravaTokenResponse>(
      "https://www.strava.com/oauth/token",
      {
        client_id: CONFIG.CLIENT_ID,
        client_secret: CONFIG.CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: this.refreshToken,
      }
    );

    this.setTokens(res.data);
  }

  private async authGet<T>(url: string) {
    await this.ensureValidToken();

    const res = await axios.get<T>(url, {
      headers: { Authorization: `Bearer ${this.accessToken}` },
    });

    return res.data;
  }

  async getActivities(): Promise<StravaActivity[]> {
    return this.authGet<StravaActivity[]>(`${CONFIG.STRAVA_BASE}/athlete/activities`);
  }

  async getAthleteInfo(): Promise<StravaAthleteInfo> {
    return this.authGet<StravaAthleteInfo>(`${CONFIG.STRAVA_BASE}/athlete`);
  }

  async getHRStream(activityId: number): Promise<number[]> {
    const res = await this.authGet<HRStreamResponse>(
      `${CONFIG.STRAVA_BASE}/activities/${activityId}/streams?keys=heartrate&key_by_type=true`
    );

    return res.heartrate?.data ?? [];
  }
}

export const stravaService = new StravaService();
