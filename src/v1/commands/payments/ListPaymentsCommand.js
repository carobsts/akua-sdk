export class ListPaymentsCommand {
  constructor(params = {}) {
    this.method = "GET";
    this.path = "/v1/payments";
    this.params = params;
  }
}
