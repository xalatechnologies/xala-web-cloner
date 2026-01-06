import { NextApiRequest, NextApiResponse } from 'next';
import { findRelevantDocuments } from '../../utils/retrieval';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { query, matchThreshold, matchCount } = req.body;

    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    const documents = await findRelevantDocuments(
      query,
      matchThreshold,
      matchCount
    );

    return res.status(200).json(documents);
  } catch (error) {
    console.error('Search error:', error);
    return res.status(500).json({ error: 'Failed to search documents' });
  }
}
