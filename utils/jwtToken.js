export const sendToken = (user, statusCode, res, message) => {
    const token = user.getJWTToken();
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // use secure cookies in production
        sameSite: 'None'
    };
    // res.cookie('token', token, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === 'production', // use secure cookies in production
    //     sameSite: 'None' // required for cookies to be sent in cross-site requests
    // });
    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        message,
        token
    });
};