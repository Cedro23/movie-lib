export interface TokenResponse {
  success: boolean;
  expires_at: string;
  request_token: string;
}

export interface CreateSessionRequest {
  request_token: string;
}

export interface CreateSessionResponse {
  success: boolean;
  session_id: string;
}
