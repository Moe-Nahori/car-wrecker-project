# Configuration Integration

This document outlines the changes made to integrate the company configuration data into the website.

## Changes Made

1. Created a utility file to access configuration data:
   - `frontend/utils/config.js` - Provides functions to access company data from the config

2. Updated components to use configuration data:
   - `frontend/components/home/HeroSection.jsx` - Updated to use company name, slogan, and description
   - `frontend/components/home/EducationalFooter.jsx` - Updated to include company contact information
   - `frontend/components/layout/Footer.jsx` - Updated to use company name, contact info, and social links

3. Created new components:
   - `frontend/components/layout/Header.jsx` - Created a new header component using company data

4. Updated application structure:
   - `frontend/pages/_app.js` - Added Header component to global layout

## How It Works

The integration works as follows:

1. The `config/company.json` file contains all company-related information
2. The `utils/config.js` exports helper functions to access this data
3. Components import these helper functions to get the data they need
4. When you update the configuration file, changes will automatically reflect across the site

## Benefits

- Single source of truth for company information
- Easy to update company details without modifying code
- Consistent company information across the site
- Modular approach allows for expansion of configuration as needed

## Future Improvements

- Add more configuration sections as needed
- Create a simple admin panel for updating configuration
- Expand to include configuration for other aspects of the site (services, locations, etc.)
