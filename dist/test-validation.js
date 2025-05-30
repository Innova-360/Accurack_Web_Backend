"use strict";
// Test file to demonstrate validation middleware
// Run this with: node src/test-validation.js
const axios = require('axios');
const BASE_URL = 'http://localhost:3000/api/leads';
// Test cases for username validation
const usernameTests = [
    // Valid usernames
    { username: 'john123', expected: 'valid' },
    { username: 'alice2024', expected: 'valid' },
    { username: 'user12345', expected: 'valid' },
    { username: 'test99', expected: 'valid' },
    { username: 'admin2025', expected: 'valid' },
    // Invalid usernames
    { username: 'jo', expected: 'invalid', reason: 'too short' },
    { username: 'verylongusername123', expected: 'invalid', reason: 'too long' },
    { username: 'user@123', expected: 'invalid', reason: 'special characters' },
    { username: 'user name', expected: 'invalid', reason: 'contains space' },
    { username: 'user-123', expected: 'invalid', reason: 'contains hyphen' },
    { username: '', expected: 'invalid', reason: 'empty' }
];
// Test cases for email validation
const emailTests = [
    // Valid emails
    { email: 'user@example.com', expected: 'valid' },
    { email: 'john.doe@company.org', expected: 'valid' },
    { email: 'alice123@gmail.com', expected: 'valid' },
    { email: 'test.email+tag@domain.co.uk', expected: 'valid' },
    // Invalid emails
    { email: 'invalid-email', expected: 'invalid', reason: 'no @ symbol' },
    { email: 'user@', expected: 'invalid', reason: 'no domain' },
    { email: '@domain.com', expected: 'invalid', reason: 'no username' },
    { email: 'user@domain', expected: 'invalid', reason: 'no TLD' },
    { email: 'user name@domain.com', expected: 'invalid', reason: 'space in username' },
    { email: '', expected: 'invalid', reason: 'empty' }
];
// Function to test username validation
async function testUsernameValidation() {
    console.log('\n🧪 Testing Username Validation...\n');
    for (const test of usernameTests) {
        try {
            const response = await axios.post(`${BASE_URL}/validate-username`, {
                username: test.username
            });
            if (test.expected === 'valid') {
                console.log(`✅ PASS: "${test.username}" - Valid username accepted`);
            }
            else {
                console.log(`❌ FAIL: "${test.username}" - Should be invalid but was accepted`);
            }
        }
        catch (error) {
            if (test.expected === 'invalid') {
                console.log(`✅ PASS: "${test.username}" - Invalid username rejected (${test.reason})`);
                if (error.response?.data?.errors) {
                    console.log(`   Error: ${error.response.data.errors[0].message}`);
                }
            }
            else {
                console.log(`❌ FAIL: "${test.username}" - Valid username rejected`);
                console.log(`   Error: ${error.response?.data?.message || error.message}`);
            }
        }
    }
}
// Function to test email validation
async function testEmailValidation() {
    console.log('\n📧 Testing Email Validation...\n');
    for (const test of emailTests) {
        try {
            const response = await axios.post(`${BASE_URL}/validate-email`, {
                email: test.email
            });
            if (test.expected === 'valid') {
                console.log(`✅ PASS: "${test.email}" - Valid email accepted`);
            }
            else {
                console.log(`❌ FAIL: "${test.email}" - Should be invalid but was accepted`);
            }
        }
        catch (error) {
            if (test.expected === 'invalid') {
                console.log(`✅ PASS: "${test.email}" - Invalid email rejected (${test.reason})`);
                if (error.response?.data?.errors) {
                    console.log(`   Error: ${error.response.data.errors[0].message}`);
                }
            }
            else {
                console.log(`❌ FAIL: "${test.email}" - Valid email rejected`);
                console.log(`   Error: ${error.response?.data?.message || error.message}`);
            }
        }
    }
}
// Function to test combined validation
async function testCombinedValidation() {
    console.log('\n🔄 Testing Combined Validation...\n');
    const combinedTests = [
        {
            data: { username: 'john123', email: 'john@example.com' },
            expected: 'valid',
            description: 'Valid username and email'
        },
        {
            data: { username: 'jo', email: 'john@example.com' },
            expected: 'invalid',
            description: 'Invalid username, valid email'
        },
        {
            data: { username: 'john123', email: 'invalid-email' },
            expected: 'invalid',
            description: 'Valid username, invalid email'
        },
        {
            data: { username: 'jo', email: 'invalid-email' },
            expected: 'invalid',
            description: 'Invalid username and email'
        }
    ];
    for (const test of combinedTests) {
        try {
            const response = await axios.post(`${BASE_URL}/validate-user`, test.data);
            if (test.expected === 'valid') {
                console.log(`✅ PASS: ${test.description} - Accepted`);
            }
            else {
                console.log(`❌ FAIL: ${test.description} - Should be invalid but was accepted`);
            }
        }
        catch (error) {
            if (test.expected === 'invalid') {
                console.log(`✅ PASS: ${test.description} - Rejected`);
                if (error.response?.data?.errors) {
                    console.log(`   Errors: ${error.response.data.errors.length} validation error(s)`);
                }
            }
            else {
                console.log(`❌ FAIL: ${test.description} - Valid data rejected`);
            }
        }
    }
}
// Main test function
async function runTests() {
    console.log('🚀 Starting Validation Middleware Tests...');
    console.log('Make sure your server is running on http://localhost:3000');
    try {
        await testUsernameValidation();
        await testEmailValidation();
        await testCombinedValidation();
        console.log('\n✨ All tests completed!');
        console.log('\n📋 Summary:');
        console.log('- Username must be 5-15 characters, alphanumeric only');
        console.log('- Email must be valid format with proper domain');
        console.log('- Both validations work independently and combined');
    }
    catch (error) {
        console.error('\n❌ Test failed:', error.message);
        console.log('Make sure your server is running and accessible.');
    }
}
// Run tests if this file is executed directly
if (require.main === module) {
    runTests();
}
module.exports = { runTests, testUsernameValidation, testEmailValidation, testCombinedValidation };
