// PaymentResult uses a free-form status and optional fields, so it can represent invalid combinations of payment state and data.
// The formatter must then rely on non-null assertions; a discriminated union would require each state's fields explicitly.

type Completed = {
  status: "success";
  transactionId: string;
};

type Declined = {
  status: "failure";
  errorCode: string;
  message: string;
};

type Processing = {
  status: "pending";
  retryAfterMs: number;
};

type Refunded = {
  status: "refunded";
  refundId: string;
  amountCents: number;
};

type PaymentResult = Completed | Declined | Processing | Refunded;

function describePayment(result: PaymentResult): string {
  switch (result.status) {
    case "success":
      return `Paid: ${result.transactionId.toUpperCase()}`;
    case "failure":
      return `Failed (${result.errorCode}): ${result.message}`;
    case "pending":
      return `Retry in ${result.retryAfterMs / 1000}s`;
    case "refunded":
      return `Refunded: ${result.refundId} for ${result.amountCents}`;
    default:
      const exhaustiveCheck: never = result;
      return exhaustiveCheck;
  }
}
