import { TmdbApiService } from "../tmdbApiService";
import { ApiResponse } from "../types";
import {
  CreateSessionRequest,
  CreateSessionResponse,
  TokenResponse,
} from "./authTypes";

export class AuthService extends TmdbApiService {
  static async createRequestToken(): Promise<TokenResponse> {
    return this.get<TokenResponse>("/authentication/token/new");
  }

  static async createSession(
    sessionRequest: CreateSessionRequest,
  ): Promise<CreateSessionResponse> {
    return this.post<CreateSessionResponse>(
      "/authentication/session/new",
      sessionRequest,
    );
  }

  static async deleteSession(session_id: string): Promise<boolean> {
    return this.delete("/authentication/session", { session_id });
  }

  static async validateApiKey(): Promise<ApiResponse> {
    return this.get("/authentication");
  }
}
