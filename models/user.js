const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value) => validator.isEmail(value),
            message: 'Invalid email address'
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value);
            },
            message: 'Password is too weak',
        }
    },
    fullName: {
        type: String,
        required: true,
        validate: {
            validator: (value) => /^[a-zA-Z ]{1,50}$/.test(value),
            message: 'Invalid full name format',
        },
    },
    gender: {
        type: Number,
        required: true,
        validate: {
            validator: function(value) {
                return [0, 1].includes(value);
            },
            message: 'Gender must be either 0 or 1'
        }
    },
    country: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false,
        validate: {
            validator: (value) => /^[a-zA-Z ]{1,200}$/.test(value),  // Allows spaces and letters, up to 200 characters
            message: 'Invalid description format; must be 1-200 letters',
        },
    },
    avatar: {
        type: String,
        required: false,
    },
    age: {
        type: Number,
        required: true,
        validate: {
            validator: function(value) {
                return value >= 15 && value <= 99;
            },
            message: 'Age must be between 15 and 99'
        }
    },
    interest: {
        type: [Number],
        validate: {
            validator: function(values) {
                return values.every(value => value >= 0 && value <= 4);
            },
            message: 'Interests must be an array of numbers between 0 and 4'
        }
    },
    userType: {
        type: Number,
        required: true,
        validate: {
            validator: function(value) {
                return [0, 1].includes(value);
            },
            message: 'User type must be either 0 or 1'
        }
    },
}, {
    timestamps: true
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        return next(error);
    }
})

const User = mongoose.model('users', userSchema);

module.exports = User;