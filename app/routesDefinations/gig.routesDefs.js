const gigRoute = require('../routes/gig.routes');

module.exports = function (app) {
    app.use('/gigs', gigRoute);

}