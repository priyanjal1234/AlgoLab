import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3,
            maxlength: 30,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
        },
        password: {
            type: String,
            required: true, 
        },
        phone: {
            type: String,
            required: false,
            trim: true,
            unique: true,
            match: [/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number"], // E.164 format
        },
        verificationCode: {
            type: String,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        avatarUrl: {
            type: String,
            default: "",
        },
        bio: {
            type: String,
            maxlength: 160,
            default: "",
        },
        solvedProblems: [
            {
                problemId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Problem",
                },
                solvedAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        totalSolved: {
            easy: { type: Number, default: 0 },
            medium: { type: Number, default: 0 },
            hard: { type: Number, default: 0 },
        },
        submissionCount: {
            type: Number,
            default: 0,
        },
        acceptedCount: {
            type: Number,
            default: 0,
        },
        wrongAnswerCount: {
            type: Number,
            default: 0,
        },
        lastLogin: {
            type: Date,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);

export default userModel;
