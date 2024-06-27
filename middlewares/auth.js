import { User } from "../models/userSchema.js";
import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from 'jsonwebtoken';


export const isAuthorized = catchAsyncError(async (req, res, next) => {
    console.log("cookies--111");
    console.log("cookies--222", req);
    console.log("cookies--333", req.cookies);
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler("User not authorized", 400));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decoded.id);

    next();
})