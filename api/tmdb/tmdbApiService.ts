import { tmdbAxios } from "./tmdbConfig";

export class TmdbApiService {
  protected static async get<T>(
    endpoint: string,
    params: Record<string, any> = {},
  ): Promise<T> {
    try {
      const response = await tmdbAxios.get<T>(endpoint, { params });
      return response.data;
    } catch (error) {
      console.error("Error calling the API:", error);
      throw error;
    }
  }

  protected static async post<T>(
    endpoint: string,
    data: Record<string, any> = {},
  ): Promise<T> {
    try {
      const response = await tmdbAxios.post<T>(endpoint, data);
      return response.data;
    } catch (error) {
      console.error("Error calling the API:", error);
      throw error;
    }
  }

  protected static async delete<T>(
    endpoint: string,
    params: Record<string, any> = {},
  ): Promise<T> {
    try {
      const response = await tmdbAxios.delete<T>(endpoint, { params });
      return response.data;
    } catch (error) {
      console.error("Error calling the API:", error);
      throw error;
    }
  }
}
