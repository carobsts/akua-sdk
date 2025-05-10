import { TokenManager } from './auth';
import { createApiClient } from './http';
import { ENVIRONMENTS } from './config';
import { AkuaError, ApiErrorCodes } from './errors';

export class AkuaClient {
  constructor({ clientId, clientSecret, environment = 'sandbox' }) {
    const baseUrl = ENVIRONMENTS[environment];
    if (!baseUrl) throw new Error(`Unknown environment: ${environment}`);

    this.tokenManager = new TokenManager({ clientId, clientSecret, baseUrl });
    this.api = createApiClient(this.tokenManager);
  }

  async send(command) {
    try {
      const config = {
        method: command.method,
        url: command.path,
        ...(command.body && { data: command.body }),
        ...(command.params && { params: command.params }),
      };

      const response = await this.api(config);
      return response.data;

    } catch (err) {
      if (err.response) {
        const { status, data } = err.response;
        throw new AkuaError({
          message: data?.message || 'API Error',
          code: this._mapStatusToCode(status),
          status,
          details: data,
        });
      }

      if (err.request) {
        throw new AkuaError({
          message: 'No response from server',
          code: ApiErrorCodes.NETWORK_ERROR,
        });
      }

      throw new AkuaError({
        message: err.message,
        code: ApiErrorCodes.UNKNOWN,
      });
    }
  }

  async execute(command) {
    try {
      const data = await this.send(command);
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  _mapStatusToCode(status) {
    switch (status) {
      case 400: return ApiErrorCodes.INVALID_PARAMS;
      case 401: return ApiErrorCodes.AUTH_ERROR;
      case 404: return ApiErrorCodes.RESOURCE_NOT_FOUND;
      case 429: return ApiErrorCodes.RATE_LIMIT;
      default: return ApiErrorCodes.UNKNOWN;
    }
  }
}