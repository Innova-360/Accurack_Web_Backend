"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_MESSAGES = exports.validateUserData = exports.validateEmail = exports.validateBusinessEmail = exports.validateUsername = void 0;
// Default error messages
const DEFAULT_MESSAGES = {
    USERNAME: {
        REQUIRED: 'Username is required',
        LENGTH: 'Username must be between 5 to 15 characters long',
        ALPHANUMERIC: 'Username must contain only letters and numbers (no spaces or special characters)',
        INVALID_FORMAT: 'Username format is invalid'
    },
    EMAIL: {
        REQUIRED: 'Email address is required',
        INVALID_FORMAT: 'Please enter a valid email address',
        DOMAIN_INVALID: 'Email domain is not valid',
        TOO_LONG: 'Email address is too long (maximum 254 characters)',
        PERSONAL_EMAIL: 'Please use a business email address (not personal email like Gmail, Yahoo, etc.)',
        BUSINESS_REQUIRED: 'Business email address is required for demo booking'
    }
};
exports.DEFAULT_MESSAGES = DEFAULT_MESSAGES;
// Username validation regex (5-15 characters, alphanumeric only)
const USERNAME_REGEX = /^[a-zA-Z0-9]{5,15}$/;
// Email validation regex (comprehensive)
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
// Business email regex - excludes common personal email providers
const BUSINESS_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(?!.*(?:gmail|yahoo|hotmail|outlook|aol|icloud|live|msn|ymail|rediffmail|protonmail|zoho\.com)\.)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
// Common personal email domains to block for business emails
const PERSONAL_EMAIL_DOMAINS = [
    'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com',
    'icloud.com', 'live.com', 'msn.com', 'ymail.com', 'rediffmail.com',
    'protonmail.com', 'zoho.com', 'mail.com', 'gmx.com', 'yandex.com'
];
// Username validation middleware
const validateUsername = (req, res, next) => {
    const { username, name } = req.body;
    const usernameField = username || name; // Support both 'username' and 'name' fields
    const errors = [];
    // Check if username exists
    if (!usernameField) {
        errors.push({
            field: 'username',
            message: DEFAULT_MESSAGES.USERNAME.REQUIRED,
            code: 'USERNAME_REQUIRED'
        });
    }
    else {
        // Convert to string and trim
        const cleanUsername = String(usernameField).trim();
        // Check length (5-15 characters)
        if (cleanUsername.length < 5 || cleanUsername.length > 15) {
            errors.push({
                field: 'username',
                message: DEFAULT_MESSAGES.USERNAME.LENGTH,
                code: 'USERNAME_LENGTH_INVALID'
            });
        }
        // Check alphanumeric format
        if (!USERNAME_REGEX.test(cleanUsername)) {
            errors.push({
                field: 'username',
                message: DEFAULT_MESSAGES.USERNAME.ALPHANUMERIC,
                code: 'USERNAME_FORMAT_INVALID'
            });
        }
    }
    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Username validation failed',
            errors: errors,
            examples: {
                valid: ['john123', 'alice2024', 'user12345'],
                invalid: ['jo', 'verylongusername123', 'user@123', 'user name']
            }
        });
    }
    next();
};
exports.validateUsername = validateUsername;
// Business email validation middleware
const validateBusinessEmail = (req, res, next) => {
    const { email } = req.body;
    const errors = [];
    // Check if email exists
    if (!email) {
        errors.push({
            field: 'email',
            message: DEFAULT_MESSAGES.EMAIL.REQUIRED,
            code: 'EMAIL_REQUIRED'
        });
    }
    else {
        // Convert to string and trim
        const cleanEmail = String(email).trim().toLowerCase();
        // Check length (max 254 characters as per RFC)
        if (cleanEmail.length > 254) {
            errors.push({
                field: 'email',
                message: DEFAULT_MESSAGES.EMAIL.TOO_LONG,
                code: 'EMAIL_TOO_LONG'
            });
        }
        // Check basic email format first
        if (!EMAIL_REGEX.test(cleanEmail)) {
            errors.push({
                field: 'email',
                message: DEFAULT_MESSAGES.EMAIL.INVALID_FORMAT,
                code: 'EMAIL_FORMAT_INVALID'
            });
        }
        else {
            // Check if it's a business email (not personal)
            const emailDomain = cleanEmail.split('@')[1];
            if (PERSONAL_EMAIL_DOMAINS.includes(emailDomain)) {
                errors.push({
                    field: 'email',
                    message: DEFAULT_MESSAGES.EMAIL.PERSONAL_EMAIL,
                    code: 'EMAIL_PERSONAL_NOT_ALLOWED'
                });
            }
            // Additional business email validation using regex
            if (!BUSINESS_EMAIL_REGEX.test(cleanEmail)) {
                errors.push({
                    field: 'email',
                    message: DEFAULT_MESSAGES.EMAIL.BUSINESS_REQUIRED,
                    code: 'EMAIL_BUSINESS_REQUIRED'
                });
            }
        }
    }
    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Business email validation failed',
            errors: errors,
            examples: {
                valid: ['john@company.com', 'alice@business.org', 'user@startup.io'],
                invalid: ['user@gmail.com', 'john@yahoo.com', 'alice@hotmail.com'],
                blocked_domains: PERSONAL_EMAIL_DOMAINS
            },
            requirements: [
                'Must be a valid email format',
                'Must be a business/company email',
                'Personal emails (Gmail, Yahoo, etc.) are not allowed',
                'Maximum 254 characters'
            ]
        });
    }
    next();
};
exports.validateBusinessEmail = validateBusinessEmail;
// Regular email validation middleware (allows personal emails)
const validateEmail = (req, res, next) => {
    const { email } = req.body;
    const errors = [];
    // Check if email exists
    if (!email) {
        errors.push({
            field: 'email',
            message: DEFAULT_MESSAGES.EMAIL.REQUIRED,
            code: 'EMAIL_REQUIRED'
        });
    }
    else {
        // Convert to string and trim
        const cleanEmail = String(email).trim().toLowerCase();
        // Check length (max 254 characters as per RFC)
        if (cleanEmail.length > 254) {
            errors.push({
                field: 'email',
                message: DEFAULT_MESSAGES.EMAIL.TOO_LONG,
                code: 'EMAIL_TOO_LONG'
            });
        }
        // Check email format using regex
        if (!EMAIL_REGEX.test(cleanEmail)) {
            errors.push({
                field: 'email',
                message: DEFAULT_MESSAGES.EMAIL.INVALID_FORMAT,
                code: 'EMAIL_FORMAT_INVALID'
            });
        }
        // Additional domain validation
        const emailParts = cleanEmail.split('@');
        if (emailParts.length === 2) {
            const domain = emailParts[1];
            // Check if domain has at least one dot
            if (!domain.includes('.')) {
                errors.push({
                    field: 'email',
                    message: DEFAULT_MESSAGES.EMAIL.DOMAIN_INVALID,
                    code: 'EMAIL_DOMAIN_INVALID'
                });
            }
            // Check domain length
            if (domain.length < 3 || domain.length > 253) {
                errors.push({
                    field: 'email',
                    message: DEFAULT_MESSAGES.EMAIL.DOMAIN_INVALID,
                    code: 'EMAIL_DOMAIN_LENGTH_INVALID'
                });
            }
        }
    }
    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Email validation failed',
            errors: errors,
            examples: {
                valid: ['user@example.com', 'john.doe@company.org', 'alice123@gmail.com'],
                invalid: ['invalid-email', 'user@', '@domain.com', 'user@domain']
            }
        });
    }
    next();
};
exports.validateEmail = validateEmail;
// Combined validation middleware for username and business email
const validateUserData = (req, res, next) => {
    const { username, name, email } = req.body;
    const usernameField = username || name;
    const errors = [];
    // Username validation
    if (!usernameField) {
        errors.push({
            field: 'username',
            message: DEFAULT_MESSAGES.USERNAME.REQUIRED,
            code: 'USERNAME_REQUIRED'
        });
    }
    else {
        const cleanUsername = String(usernameField).trim();
        if (cleanUsername.length < 5 || cleanUsername.length > 15) {
            errors.push({
                field: 'username',
                message: DEFAULT_MESSAGES.USERNAME.LENGTH,
                code: 'USERNAME_LENGTH_INVALID'
            });
        }
        if (!USERNAME_REGEX.test(cleanUsername)) {
            errors.push({
                field: 'username',
                message: DEFAULT_MESSAGES.USERNAME.ALPHANUMERIC,
                code: 'USERNAME_FORMAT_INVALID'
            });
        }
    }
    // Email validation
    if (!email) {
        errors.push({
            field: 'email',
            message: DEFAULT_MESSAGES.EMAIL.REQUIRED,
            code: 'EMAIL_REQUIRED'
        });
    }
    else {
        const cleanEmail = String(email).trim().toLowerCase();
        if (cleanEmail.length > 254) {
            errors.push({
                field: 'email',
                message: DEFAULT_MESSAGES.EMAIL.TOO_LONG,
                code: 'EMAIL_TOO_LONG'
            });
        }
        if (!EMAIL_REGEX.test(cleanEmail)) {
            errors.push({
                field: 'email',
                message: DEFAULT_MESSAGES.EMAIL.INVALID_FORMAT,
                code: 'EMAIL_FORMAT_INVALID'
            });
        }
        else {
            // Check if it's a business email (not personal)
            const emailDomain = cleanEmail.split('@')[1];
            if (PERSONAL_EMAIL_DOMAINS.includes(emailDomain)) {
                errors.push({
                    field: 'email',
                    message: DEFAULT_MESSAGES.EMAIL.PERSONAL_EMAIL,
                    code: 'EMAIL_PERSONAL_NOT_ALLOWED'
                });
            }
        }
    }
    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors,
            examples: {
                username: {
                    valid: ['john123', 'alice2024', 'user12345'],
                    invalid: ['jo', 'verylongusername123', 'user@123', 'user name']
                },
                email: {
                    valid: ['user@company.com', 'john.doe@business.org', 'alice@startup.io'],
                    invalid: ['user@gmail.com', 'john@yahoo.com', 'alice@hotmail.com', 'invalid-email'],
                    blocked_domains: ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com']
                }
            }
        });
    }
    next();
};
exports.validateUserData = validateUserData;
