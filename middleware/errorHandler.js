export default function (err, req, res, next) {
    console.error(err.stack);
    res.send(`${err.message}`);
}
