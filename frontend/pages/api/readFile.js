import fs from 'fs/promises';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { path } = req.body;
    const content = await fs.readFile(path, 'utf8');
    res.status(200).json({ content });
  } catch (error) {
    res.status(500).json({ message: 'Error reading file', error: error.message });
  }
}