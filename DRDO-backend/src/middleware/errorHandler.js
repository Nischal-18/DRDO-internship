// Global error handler
exports.errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Oracle unique constraint violation (duplicate email)
  if (err.errorNum === 1) {
    return res.status(400).json({
      success: false,
      message: 'Duplicate entry. Record already exists.'
    });
  }

  // Oracle foreign key violation
  if (err.errorNum === 2291) {
    return res.status(400).json({
      success: false,
      message: 'Invalid reference. Related record does not exist.'
    });
  }

  // Default error
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

// 404 Not Found handler
exports.notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
};
