import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuid } from 'uuid';
import { Client, Environment, CreatePaymentRequest, Money } from 'square';

// eslint-disable-next-line func-names
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = new Client({
    accessToken: process.env.NEXT_PUBLIC_SQUARE_AT,
    environment: Environment.Sandbox,
  });
  const { paymentsApi } = client;
  const tokenData = await JSON.parse(req.body);
  const { price } = tokenData;
  const bodyAmountMoney: Money = { amount: BigInt(price), currency: 'USD' };

  const bodyAppFeeMoney: Money = { amount: BigInt(`${Math.floor(parseInt(price, 10) * 0.01)}`), currency: 'USD' };

  const body: CreatePaymentRequest = {
    sourceId: tokenData.token,
    idempotencyKey: uuid(),
  };
  body.amountMoney = bodyAmountMoney;
  body.appFeeMoney = bodyAppFeeMoney;
  body.autocomplete = true;

  const result = await paymentsApi.createPayment(body);

  res.status(200).json({ result });
}
