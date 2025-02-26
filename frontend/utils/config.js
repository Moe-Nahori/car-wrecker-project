import companyConfig from '../../config/company.json';

/**
 * Utility function to access company configuration data
 * @returns {Object} The company configuration data
 */
export function getCompanyConfig() {
  return companyConfig.company;
}

/**
 * Get company name
 * @returns {string} The company name
 */
export function getCompanyName() {
  return companyConfig.company.name;
}

/**
 * Get company contact information
 * @returns {Object} Contact information including phone, email, and address
 */
export function getContactInfo() {
  return companyConfig.company.contact;
}

/**
 * Get company business details
 * @returns {Object} Business details including ABN, ACN, and opening hours
 */
export function getBusinessInfo() {
  return companyConfig.company.business;
}

/**
 * Get company metadata
 * @returns {Object} Meta information including slogan and description
 */
export function getCompanyMeta() {
  return companyConfig.company.meta;
}

/**
 * Get company social media links
 * @returns {Object} Social media links
 */
export function getSocialLinks() {
  return companyConfig.company.social;
}

export default {
  getCompanyConfig,
  getCompanyName,
  getContactInfo,
  getBusinessInfo,
  getCompanyMeta,
  getSocialLinks
};