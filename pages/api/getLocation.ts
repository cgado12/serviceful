import { NextApiRequest, NextApiResponse } from 'next';
import { Client, Environment } from 'square';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = new Client({
    accessToken: 'EAAAEJJWYvfIeYTiu63NMKVcgxMJZC99FH3xOKp4-TD97_6fpYiW_xxqOSRM5lcQ',
    environment: Environment.Sandbox,
  });
  const { locationsApi } = client;

  const locations = await locationsApi.listLocations();

  res.status(200).json({ locations });
}
