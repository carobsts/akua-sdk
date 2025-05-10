export class GetPaymentCommand {
  constructor(paymentId) {
    this.method = "GET";
    this.path = `/v1/payments/${paymentId}`;
  }
}
