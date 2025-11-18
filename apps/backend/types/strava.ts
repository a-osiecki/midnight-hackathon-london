export interface StravaTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_at: number;
}

export interface StravaActivity {
  id: number;
  name: string;
  start_date: string;
  distance: number;
}

export interface HRStreamResponse {
  heartrate?: {
    data: number[];
  };
}

export interface StravaAthleteInfo {
    sex: string;
    weight: number;
    country: string;
    profile: string;
}
