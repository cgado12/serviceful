import { NextApiRequest, NextApiResponse } from 'next';
import { Client, CreateCustomerRequest, Environment } from 'square';
import { v4 as UUID } from 'uuid';

// eslint-disable-next-line func-names
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = new Client({
    accessToken: 'EAAAEJJWYvfIeYTiu63NMKVcgxMJZC99FH3xOKp4-TD97_6fpYiW_xxqOSRM5lcQ',
    environment: Environment.Sandbox,
  });
  const { customersApi } = client;
  const reqBody = await JSON.parse(req.body);

  const body: CreateCustomerRequest = {
    idempotencyKey: UUID(),
    givenName: reqBody.firstName,
    familyName: reqBody.lastName,
    emailAddress: reqBody.email,
  };

  const customer = await customersApi.createCustomer(body);

  res.status(200).json(customer);
}
