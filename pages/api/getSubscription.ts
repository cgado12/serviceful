import { NextApiRequest, NextApiResponse } from 'next';
import { Client, Environment } from 'square';

// eslint-disable-next-line func-names
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = new Client({
    accessToken: process.env.NEXT_PUBLIC_SQUARE_AT,
    environment: Environment.Sandbox,
  });
  const { subscriptionsApi } = client;
  const reqObj = await JSON.parse(req.body);

  const subscriptionId = reqObj.id || '';
  const result = await subscriptionsApi.retrieveSubscription(subscriptionId);

  res.status(200).json(result);
}
