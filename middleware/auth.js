const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  try {
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'غير مصرح بالوصول. يرجى تسجيل الدخول'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'المستخدم غير موجود'
      });
    }

    if (user.activeToken !== token) {
      return res.status(401).json({
        success: false,
        message: 'تم تسجيل الدخول من جهاز آخر. يرجى تسجيل الدخول مجددًا'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'غير مصرح بالوصول'
    });
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'غير مصرح لك بالوصول لهذه الخدمة'
      });
    }
    next();
  };
};