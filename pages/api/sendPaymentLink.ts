import { NextApiRequest, NextApiResponse } from 'next';
import { Client, CreatePaymentLinkRequest, Environment } from 'square';
import { v4 as UUID } from 'uuid';

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = new Client({
    accessToken: 'EAAAEJJWYvfIeYTiu63NMKVcgxMJZC99FH3xOKp4-TD97_6fpYiW_xxqOSRM5lcQ',
    environment: Environment.Sandbox,
  });
  const { checkoutApi } = client;

  const reqObj = await JSON.parse(req.body);

  const body: CreatePaymentLinkRequest = {
    idempotencyKey: UUID(),
    quickPay: {
      name: reqObj.title,
      priceMoney: {
        amount: BigInt(reqObj.amountDue.concat('00')),
        currency: 'USD',
      },
      locationId: 'L70D7SSS832FY',
    },
  };

  const paymentLink = await checkoutApi.createPaymentLink(body);

  res.status(200).json(paymentLink);
}
