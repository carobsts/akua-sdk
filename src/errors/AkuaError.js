export class AkuaError extends Error {
  constructor({ message, code, status, details }) {
    super(message);
    this.name = "AkuaError";
    this.code = code;
    this.status = status;
    this.details = details;
  }
}
