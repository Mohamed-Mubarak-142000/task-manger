//error route
const routeNotFound = (req, res, next) => {
  const error = new Error(`Route Not Found ${req.originalUrl}`);
  res.status(404);
  next(error);
};

//handle errors
const errorHandler = (error, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = error.message;

  if (error.name === "CastError" && error.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource Not Found";
  }

  res.status(statusCode).json({
    message: message,
    code: error.code || statusCode, // You could include an error code if available
    stack: process.env.NODE_ENV !== "production" ? null : error.stack,
  });
};

export { routeNotFound, errorHandler };
