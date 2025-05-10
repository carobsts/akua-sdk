import axios from "axios";

export class TokenManager {
  constructor({ clientId, clientSecret, baseUrl }) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.baseUrl = baseUrl;
    this.token = null;
    this.expiration = null;
  }

  async getToken() {
    if (this.token && Date.now() < this.expiration - 60_000) {
      return this.token;
    }
    const { data } = await axios.post(`${this.baseUrl}/oauth/token`, {
      client_id: this.clientId,
      client_secret: this.clientSecret,
    });
    this.token = data.access_token;
    const payload = JSON.parse(
      Buffer.from(this.token.split(".")[1], "base64").toString()
    );
    this.expiration = payload.exp * 1000;
    return this.token;
  }
}
