import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 12;

export async function hashPassword(password) {
    return await bcrypt.hash(password, SALT_ROUNDS);
}

export async function comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}

export function validatePasswordStrength(password) {
    const minLength = 12;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const errors = [];
    if (password.length < minLength) {
        errors.push(`Password must be at least ${minLength} characters long.`);
    }
    if (!hasUpperCase) {
        errors.push("Password must contain at least one uppercase letter.");
    }
    if (!hasLowerCase) {
        errors.push("Password must contain at least one lowercase letter.");
    }
    if (!hasNumber) {
        errors.push("Password must contain at least one number.");
    }
    if (!hasSpecialChar) {
        errors.push("Password must contain at least one special character.");
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}