"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const validation_1 = require("../middleware/validation");
const router = express_1.default.Router();
const leads = [];
router.post('/', validation_1.validateUserData, async (req, res) => {
    const { name, phone, countryCode, businessName, industry, address, email } = req.body;
    // Additional field validation with detailed messages
    const missingFields = [];
    if (!name)
        missingFields.push('name');
    if (!phone)
        missingFields.push('phone');
    if (!countryCode)
        missingFields.push('countryCode');
    if (!businessName)
        missingFields.push('businessName');
    if (!industry)
        missingFields.push('industry');
    if (!address)
        missingFields.push('address');
    if (!email)
        missingFields.push('email');
    if (missingFields.length > 0) {
        return res.status(400).json({
            success: false,
            error: 'Missing required fields',
            missingFields: missingFields,
            message: `Please provide the following fields: ${missingFields.join(', ')}`,
            requiredFields: {
                name: 'Full name (5-15 characters, alphanumeric)',
                phone: 'Phone number',
                countryCode: 'Country code (e.g., +1, +91)',
                businessName: 'Business name',
                industry: 'Industry type',
                address: 'Business address',
                email: 'Valid email address'
            }
        });
    }
    const newLead = {
        id: leads.length + 1,
        name,
        phone,
        countryCode,
        businessName,
        industry,
        address,
        email,
        createdAt: new Date().toISOString(),
    };
    leads.push(newLead);
    console.log('🟢 New Lead:', newLead);
    try {
        await axios_1.default.post(process.env.GOOGLE_SHEETS_WEBHOOK_URL, newLead, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('✅ Sent to Google Sheets!');
    }
    catch (err) {
        console.error('❌ Failed to send to Google Sheets:', err?.message || err);
    }
    res.status(201).json({
        success: true,
        message: 'Lead captured successfully',
        lead: newLead,
        info: {
            totalLeads: leads.length,
            googleSheetsStatus: 'Sent to Google Sheets',
            nextSteps: 'Our team will contact you within 24 hours'
        }
    });
});
router.get('/', (_req, res) => {
    res.json({ leads });
});
// Test route for username validation only
router.post('/validate-username', validation_1.validateUsername, (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Username is valid!',
        username: req.body.username || req.body.name,
        examples: {
            valid: ['john123', 'alice2024', 'user12345', 'test99', 'admin2025'],
            rules: [
                'Must be 5-15 characters long',
                'Only letters and numbers allowed',
                'No spaces or special characters'
            ]
        }
    });
});
// Test route for email validation only (allows personal emails)
router.post('/validate-email', validation_1.validateEmail, (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Email is valid!',
        email: req.body.email,
        examples: {
            valid: ['user@example.com', 'john.doe@company.org', 'alice123@gmail.com'],
            rules: [
                'Must contain @ symbol',
                'Must have valid domain with dot',
                'Maximum 254 characters',
                'No spaces allowed'
            ]
        }
    });
});
// Test route for business email validation only
router.post('/validate-business-email', validation_1.validateBusinessEmail, (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Business email is valid!',
        email: req.body.email,
        examples: {
            valid: ['john@company.com', 'alice@business.org', 'user@startup.io'],
            invalid: ['user@gmail.com', 'john@yahoo.com', 'alice@hotmail.com'],
            blocked_domains: ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com']
        },
        rules: [
            'Must be a valid email format',
            'Must be a business/company email',
            'Personal emails (Gmail, Yahoo, etc.) are not allowed',
            'Maximum 254 characters'
        ]
    });
});
// Test route for combined validation
router.post('/validate-user', validation_1.validateUserData, (req, res) => {
    res.status(200).json({
        success: true,
        message: 'All user data is valid!',
        data: {
            username: req.body.username || req.body.name,
            email: req.body.email
        },
        validation_rules: {
            username: [
                'Must be 5-15 characters long',
                'Only letters and numbers allowed',
                'No spaces or special characters'
            ],
            email: [
                'Must contain @ symbol',
                'Must have valid domain with dot',
                'Maximum 254 characters',
                'No spaces allowed'
            ]
        }
    });
});
exports.default = router;
