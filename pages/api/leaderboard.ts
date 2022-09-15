import { connectToDatabase } from '../../services/dbConnect';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Db } from 'mongodb';

const getDataFromDb = async (db: Db, res: NextApiResponse) => {
  try {
    const scores = await db
      .collection('leaderboard')
      .find({})
      .sort({ score: -1 })
      .limit(10)
      .toArray();
    res.status(200).json(scores);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      data: 'Failed to retrieve data from database.',
    });
  }
};

const sendDataToDb = async (
  db: Db,
  res: NextApiResponse,
  req: NextApiRequest
) => {
  try {
    const data = req.body;
    const result = await db.collection('leaderboard').insertOne(data);
    console.log(result);
    res.status(200).json({ message: 'Score successfully submitted!' });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed to submit score. Try again later!',
    });
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { db } = await connectToDatabase();

  if (method === 'GET') {
    await getDataFromDb(db, res);
  } else if (method === 'POST') {
    await sendDataToDb(db, res, req);
  }
};

export default handler;
