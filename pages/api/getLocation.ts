import { NextApiRequest, NextApiResponse } from 'next';
import { Client, Environment } from 'square';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = new Client({
    accessToken: process.env.NEXT_PUBLIC_SQUARE_AT,
    environment: Environment.Sandbox,
  });
  const { locationsApi } = client;

  const locations = await locationsApi.listLocations();

  res.status(200).json({ locations });
}
