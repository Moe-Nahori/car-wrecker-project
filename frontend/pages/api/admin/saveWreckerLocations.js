import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { locations } = req.body;
    
    if (!locations || !Array.isArray(locations)) {
      return res.status(400).json({ message: 'Invalid data format' });
    }

    // Path to the locations data file
    const dataFilePath = path.join(process.cwd(), 'data', 'wreckerLocations.json');
    
    // Prepare data object
    const dataToSave = {
      locations: locations
    };

    // Write to file
    fs.writeFileSync(
      dataFilePath,
      JSON.stringify(dataToSave, null, 2),
      'utf8'
    );

    return res.status(200).json({ success: true, message: 'Locations data saved successfully' });
  } catch (error) {
    console.error('Error saving locations data:', error);
    return res.status(500).json({ message: 'Error saving locations data', error: error.message });
  }
}
