const buildResponse = (res, httpCode, data, message) => {
    return res
        .status(httpCode)
        .json({
            status: httpCode,
            data,
            message,
        });
};

const handleError = (err, res) => {
    let { statusCode, message } = err;
    console.log('Error: ', message);
    if (message.includes('child')) message = 'Datos de entrada no válidos'
    res.status(statusCode).json({
        status: statusCode,
        error: { message: err.data[0].message, path: err.data[0].path},
        message
    });
};

module.exports = {
    buildResponse,
    handleError
};