"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        console.log(authHeader, "authHeader");
        if (!authHeader) {
            return res.status(401).json({ message: "No token provided" });
        }
        // Format: Bearer <token>
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Invalid token format" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // attach user info
        next(); // move to next layer
    }
    catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=auth.js.map