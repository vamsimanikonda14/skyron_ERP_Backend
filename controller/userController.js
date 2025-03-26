const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User'); // Assuming this is the User model

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Controller for SignUp (Create user)
exports.signup = async (req, res) => {
    const { email, password, fullname } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('Signup failed: User already exists');
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save new user
        const user = new User({ email, password: hashedPassword, fullname });
        await user.save();

        // Send email to user
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Welcome to ERP System',
            text: `Hello ${fullname},\n\nYour account has been created. Please log in with your email: ${email}. \n\nBest regards,\nERP System Team`,
        };

        // Use await to ensure email is sent before proceeding
        await transporter.sendMail(mailOptions);

        console.log(`Signup successful for user: ${email}`);

        res.status(200).json({ success: true, message: 'User created and email sent' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};

// Controller for Login (Authenticate user)
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            console.log('Login failed: User not found');
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Login failed: Incorrect password');
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        // Log the success
        console.log(`Login successful for user: ${email}`);

        // Return the token to the client
        res.status(200).json({ success: true, message: 'Login successful', token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Controller for Get User Profile
exports.getUserProfile = async (req, res) => {
    const { id } = req.params;

    try {
        // Find user by ID
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ user: { email: user.email, fullname: user.fullname } });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Error fetching user profile', error: error.message });
    }
};

// Controller for Update User Data
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { email, password, fullname } = req.body;

    try {
        // Find user by ID
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // If password is provided, hash it
        let updatedPassword = user.password; // retain the original password if not updated
        if (password) {
            updatedPassword = await bcrypt.hash(password, 10);
        }

        // Update user data
        user.email = email || user.email;
        user.password = updatedPassword;
        user.fullname = fullname || user.fullname;

        await user.save();
        res.status(200).json({ success: true, message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};
// Controller for Get All Users
exports.getAllUsers = async (_req, res) => {
    try {
        // Find all users
        const users = await User.find().select('-password'); // Exclude password from response

        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }

        res.status(200).json({ users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

// Controller for Delete User
exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        // Find user by ID
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Delete user
        await user.remove();
        res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};
