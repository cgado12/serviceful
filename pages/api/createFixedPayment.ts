import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuid } from 'uuid';
import { Client, Environment, CreatePaymentRequest, Money } from 'square';

// const url = 'https://connect.squareupsandbox.com';
// const sndbox = 'sandbox-sq0idb-ep73XInOfGXsN8bcG6fGlg';
// const at = 'EAAAEJJWYvfIeYTiu63NMKVcgxMJZC99FH3xOKp4-TD97_6fpYiW_xxqOSRM5lcQ';

// eslint-disable-next-line func-names
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = new Client({
    accessToken: 'EAAAEJJWYvfIeYTiu63NMKVcgxMJZC99FH3xOKp4-TD97_6fpYiW_xxqOSRM5lcQ',
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
