# Admin Pages for iCar Wreckers

This document provides an overview of the admin pages created for the iCar Wreckers project.

## Overview

Two admin pages have been created to help manage the site's content:

1. **Wrecker Partners Admin**: For managing locations and partner wreckers
2. **Company Details Admin**: For managing company information, contact details, and business hours

These pages allow you to edit the JSON data files without directly modifying the files themselves.

## Accessing Admin Pages

The admin pages are available at the following URLs:

- Wrecker Partners: `/admin/wrecker-partners`
- Company Details: `/admin/company-details`

**Important**: In a production environment, you should protect these pages with authentication.

## Features

### Wrecker Partners Admin

- View and manage all locations
- Add new locations with coordinates
- Edit location details (name, state, coordinates, etc.)
- Manage partner wreckers for each location
- Add, edit, or remove partners
- Specify partner specialties
- Set location prominence on the map

### Company Details Admin

- Edit company name and legal information
- Update contact details (phone, email, address)
- Manage business information (ABN, ACN)
- Set business hours
- Update social media profiles

## File Structure

The admin pages are built using a modular approach:

```
frontend/
├── pages/
│   ├── admin/
│   │   ├── wrecker-partners.js      # Wrecker Partners admin page
│   │   └── company-details.js       # Company Details admin page
│   └── api/
│       └── admin/
│           ├── saveWreckerLocations.js   # API for saving wrecker data
│           └── saveCompanyDetails.js     # API for saving company data
└── components/
    └── admin/
        ├── company-tabs/            # Tabs for company admin
        │   ├── GeneralInfoTab.jsx
        │   ├── ContactInfoTab.jsx
        │   ├── BusinessInfoTab.jsx
        │   └── SocialMediaTab.jsx
        ├── CompanyTabs.jsx          # Tab navigation component
        ├── FormField.jsx            # Reusable form field component
        ├── LocationsList.jsx        # List of locations component
        ├── LocationDetails.jsx      # Location editor component
        ├── NewLocationForm.jsx      # Form for new locations
        ├── PartnersList.jsx         # List of partners component
        └── PartnerForm.jsx          # Form for adding/editing partners
```

## Security Considerations

These admin pages currently have no authentication protection. Before deploying to production, implement authentication to secure these pages. Consider:

1. Adding a login page
2. Using Next.js middleware for route protection
3. Implementing JWT authentication or a similar auth strategy
4. Adding server-side checks in API routes

## Next Steps for Implementation

1. **Authentication**: Implement login protection for admin pages
2. **Validation**: Add more robust data validation
3. **Backup System**: Add data backup before saving changes
4. **Change History**: Track changes made through the admin interface
5. **User Roles**: Consider different permission levels (admin vs. editor)

## Usage Tips

### Wrecker Partners Admin

1. Click on locations in the left sidebar to select them
2. Edit location details in the right panel
3. Use "Add Location" to create new locations
4. Each location contains a list of partner wreckers that can be managed
5. Remember to click "Save All Changes" when finished

### Company Details Admin

1. Navigate between sections using the tabs at the top
2. Each section groups related information
3. Make changes in the form fields
4. Click "Save Changes" when finished
5. Changes will be reflected on the website immediately

## Troubleshooting

If you encounter issues:

1. Check the browser console for JavaScript errors
2. Verify that both configuration files are writable
3. Ensure file paths in API handlers are correct
4. Check server logs for any backend errors

## Maintenance

The admin interface should be kept updated with any schema changes to the data files. If you add new fields to either:

- `frontend/data/wreckerLocations.json`
- `config/company.json`

Make sure to update the corresponding admin pages to include these fields.
