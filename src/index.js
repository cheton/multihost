/* eslint consistent-return: 0 */
module.exports = function multihost(options) {
    const { hosts, route, server } = options;
    if (route && typeof(route) !== 'string') {
        throw new Error('multihost: route is not a string');
    }
    if (!server) {
        throw new Error('multihost: server required');
    }
    // hosts
    let reHosts = [];
    if (hosts) {
        let list = [].concat(hosts);
        for (let i = 0; i < list.length; ++i) {
            reHosts.push(new RegExp('^' + list[i].replace(/[*]/g, '(.*?)') + '$', 'i'));
        }
    }
    return function(req, res, next) {
        // hosts
        if (reHosts.length > 0) {
            if (!req.headers.host) {
                return next();
            }
            const hostname = req.headers.host.split(':')[0]; // e.g. localhost:8000

            let i = 0;
            for (i = 0; i < reHosts.length; ++i) {
                if (reHosts[i].test(hostname)) {
                    break;
                }
            }
            if (i === reHosts.length) {
                return next();
            }
        }
        // route
        if (route && req.url.indexOf(route) !== 0) {
            return next();
        }
        // server
        if (typeof(server) === 'function') {
            return server(req, res, next);
        }

        server.emit('request', req, res);
    };
};
