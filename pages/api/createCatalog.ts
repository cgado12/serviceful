import { NextApiRequest, NextApiResponse } from 'next';
import { Client, Environment, UpsertCatalogObjectRequest } from 'square';
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
  const { catalogApi } = client;
  const reqObj = await JSON.parse(req.body);
  const catalogObj = {
    idempotencyKey: UUID(),
    object: reqObj,
  };

  const body: UpsertCatalogObjectRequest = { ...catalogObj };

  const result = await catalogApi.upsertCatalogObject(body);

  res.status(200).json(result);
}
