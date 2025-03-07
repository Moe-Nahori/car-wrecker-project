import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { company } = req.body;
    
    if (!company) {
      return res.status(400).json({ message: 'Invalid data format' });
    }

    // Path to the company config file
    const configFilePath = path.join(process.cwd(), '..', 'config', 'company.json');
    const frontendConfigFilePath = path.join(process.cwd(), 'config', 'company.json');
    
    // Prepare data object
    const dataToSave = {
      company: company
    };

    // Write to both config files (main and frontend)
    fs.writeFileSync(
      configFilePath,
      JSON.stringify(dataToSave, null, 2),
      'utf8'
    );

    fs.writeFileSync(
      frontendConfigFilePath,
      JSON.stringify(dataToSave, null, 2),
      'utf8'
    );

    return res.status(200).json({ success: true, message: 'Company details saved successfully' });
  } catch (error) {
    console.error('Error saving company details:', error);
    return res.status(500).json({ message: 'Error saving company details', error: error.message });
  }
}
