function errorHandler(err, req, res, next) {
  console.error(err.stack); // Log the error stack for debugging
  res.status(500).json({
    error: {
      message: err.message || 'An unexpected error occurred',
      // Optionally, include more details in development
      // stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    },
  });
}

module.exports = errorHandler;