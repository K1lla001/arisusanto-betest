const commonResponse = (res, statusCode, message, data) => {
    res.status(statusCode).send({
        statusCode: statusCode,
        message: message,
        data: data
    })
};

module.exports.commonResponse = commonResponse