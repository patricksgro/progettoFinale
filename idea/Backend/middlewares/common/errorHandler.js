export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    const statusCode = err.status || 500;
    const message = err.message || "Qualcosa è andato storto!";

    res.status(statusCode).json({
        status: "error",
        message,
    })
}