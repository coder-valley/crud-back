let generate = (err, message, status, data) => {
    let response = {
        error: err,
        mesage: message,
        status: status,
        data: data
    }
    return response
}
module.exports = {
    generate: generate
}