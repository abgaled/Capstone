exports.hasAuth = (req, res, next) => {
    // console.log(req.session);
    console.log(req.session.user);
    if (req.session && req.session.user && Object.keys(req.session.user).length > 0) return next();
    return res.redirect('/home');
}

exports.noAuthed = (req, res, next) => {
    if (req.session && req.session.user && Object.keys(req.session.user).length > 0) return res.redirect('/student');
    return next();
}

exports.hasAuthadmin = (req, res, next) => {
    if (req.session && req.session.user && Object.keys(req.session.user).length > 0) return next();
    return res.redirect('/login?unauthorized');
}

exports.noAuthedadmin = (req, res, next) => {
    if (req.session && req.session.user && Object.keys(req.session.user).length > 0) return res.redirect('/home');
    return next();
}

exports.hasAuthOrgCouncil = (req, res, next) => {
    if (req.session && req.session.user && Object.keys(req.session.user).length > 0) return next();
    return res.redirect('/home');
}

exports.noAuthOrgCouncil = (req, res, next) => {
    if (req.session && req.session.user && Object.keys(req.session.user).length > 0) return res.redirect('/orgcouncil');
    return next();
}

exports.hasAuthOfficer = (req, res, next) => {
    if (req.session && req.session.user && Object.keys(req.session.user).length > 0) return next();
    return res.redirect('/home');
}

exports.noAuthOrgOfficer = (req, res, next) => {
    if (req.session && req.session.user && Object.keys(req.session.user).length > 0) return res.redirect('/officer');
    return next();
}


