import fs from 'fs/promises';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { path, content } = req.body;
    await fs.writeFile(path, content, 'utf8');
    res.status(200).json({ message: 'File updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error writing file', error: error.message });
  }
}