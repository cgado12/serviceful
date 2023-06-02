import moment from 'moment';
import { NextApiRequest, NextApiResponse } from 'next';
import { Client, CreateSubscriptionRequest, Environment } from 'square';
import { v4 as UUID } from 'uuid';

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
  const { subscriptionsApi } = client;
  const reqObj = await JSON.parse(req.body);

  const subscriptionObj = {
    idempotencyKey: UUID(),
    locationId: 'L70D7SSS832FY',
    planId: reqObj.subscriptionId,
    customerId: reqObj.customerId.squareCustomerId,
    startDate: moment(reqObj.start).format('YYYY-MM-DD'),
    taxPercentage: '5',
  };

  const body: CreateSubscriptionRequest = { ...subscriptionObj };

  const result = await subscriptionsApi.createSubscription(body);

  res.status(200).json(result);
}
