import { NextApiRequest, NextApiResponse } from 'next';
import Client from 'twilio';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const accountSid = process.env.TWILIO_AID;
  const authToken = process.env.TWILIO_AT;
  const client = Client(accountSid, authToken);

  const reqObj = await JSON.parse(req.body);
  client.messages
    .create({
      body: `Please pay using the following link: ${reqObj.payment_link.url} `,
      from: '+18668412567',
      to: `+1${reqObj.phoneNumber}`,
    })
    .then((message) => console.log(message));

  res.status(200);
}
