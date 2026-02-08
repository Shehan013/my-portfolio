const mongoose = require('mongoose');
const { unique } = require('next/dist/build/utils');
const { fail } = require('node:assert');

const AdminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true , select: false},
    //Select false to exclude password from query results by default
    failedLoginAttempts: { type: Number, default: 0 },
    accountLockedUntil: { type: Date, default: null },
    lastLoginAt: { type: Date},
    lastLoginIP: { type: String }
}, {
    timestamps: true
});

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

export default Admin;