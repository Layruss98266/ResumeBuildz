/**
 * Resume parser regex patterns and aliases.
 * Centralized so adding new section synonyms or detection rules
 * does not require touching the main parser code.
 */

export const SECTION_HEADINGS: Record<string, RegExp> = {
  summary: /^(?:\/\/\s*)?(?:summary|profile|profile\s*summary|objective|about|about\s*me|professional\s*summary|career\s*summary|career\s*objective)$/i,
  experience: /^(?:\/\/\s*)?(?:experience|work\s*experience|work\s*history|employment|employment\s*history|professional\s*experience|work\s*experience\s*\(?roles?\s*(?:&|and)\s*responsibilities?\)?)$/i,
  education: /^(?:\/\/\s*)?(?:education|academic\s*background|academics|educational\s*background)$/i,
  skills: /^(?:\/\/\s*)?(?:skills|technical\s*skills|core\s*competencies|competencies|technologies|expertise|key\s*skills|technical\s*seo)$/i,
  projects: /^(?:\/\/\s*)?(?:projects|personal\s*projects|portfolio|key\s*projects|selected\s*projects)$/i,
  certifications: /^(?:\/\/\s*)?(?:certifications?|certs?|licenses?\s*(?:&|and)?\s*certifications?|credentials?|professional\s*certifications?)$/i,
  languages: /^(?:\/\/\s*)?(?:languages?|language\s*proficiency|language\s*skills)$/i,
  contact: /^(?:\/\/\s*)?(?:contact|contact\s*(?:info|information|details))$/i,
};

export const SECTION_LOOSE: Record<string, RegExp> = {
  summary: /\b(summary|profile|objective|about)\b/i,
  experience: /\b(experience|employment|work\s*history)\b/i,
  education: /\b(education|academic)\b/i,
  skills: /\b(skills|competencies|technologies|expertise)\b/i,
  projects: /\b(projects|portfolio)\b/i,
  certifications: /\b(certifications?|certs?|licenses?|credentials?)\b/i,
  languages: /\b(languages?)\b/i,
};

export const PARSER_PATTERNS = {
  email: /[\w.+-]+@[\w-]+\.[\w.-]+/,
  phone: /(\+?\d[\d\s\-().]{7,}\d)/,
  linkedin: /linkedin\.com\/in\/[\w-]+/i,
  github: /github\.com\/[\w-]+/i,
  location: /([A-Z][a-z]+(?:\s[A-Z][a-z]+)*,\s*(?:[A-Z][a-z]+|[A-Z]{2,})(?:\s*\d{5,6})?)/,
  jobTitle: /\b(engineer|developer|designer|manager|analyst|consultant|architect|lead|director|specialist|coordinator|intern|student|scientist|administrator|officer|executive|assistant|associate|senior|junior|principal|staff|head|chief|marketing|data|product|seo|digital)\b/i,
  dateRange: /(?:(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s*\.?\s*\d{4}|\d{1,2}\/\d{2,4}|\d{4})\s*[-–—]+\s*(?:(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s*\.?\s*\d{4}|\d{1,2}\/\d{2,4}|\d{4}|present|current|now|ongoing)/i,
  bullet: /^[•\-\*▸►▪◦‣⁃●○→>]\s+/,
};
