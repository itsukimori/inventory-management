import { NextApiRequest, NextApiResponse } from "next";

export default function testHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        console.log('GETリクエストを受信しました');
        res.status(200).json({ message: 'GETリクエストを受信しました' });
      } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
      }
}
