// barangay
exports.hasAuthBarangay = (req, res, next) => {
    if (req.session && req.session.barangay && Object.keys(req.session.barangay).length > 0) return next();
    return res.redirect('/home');
}

exports.noAuthBarangay = (req, res, next) => {
    if (req.session && req.session.barangay && Object.keys(req.session.barangay).length > 0) return res.redirect('/barangay');
    return next();
}

// user
exports.hasAuth = (req, res, next) => {
    if (req.session && req.session.user && Object.keys(req.session.user).length > 0) return next();
    return res.redirect('/home');
}
exports.noAuthed = (req, res, next) => {
    if (req.session && req.session.user && Object.keys(req.session.user).length > 0) return res.redirect('/');
    return next();
}

// office
exports.hasAuthOffice = (req, res, next) => {
    if (req.session && req.session.office && Object.keys(req.session.office).length > 0) return next();
    return res.redirect('/home');
}

exports.noAuthOffice = (req, res, next) => {
    if (req.session && req.session.office && Object.keys(req.session.office).length > 0) return res.redirect('/office');
    return next();
}

// budget
exports.hasAuthBudget = (req, res, next) => {
    if (req.session && req.session.budget && Object.keys(req.session.budget).length > 0) return next();
    return res.redirect('/home');
}

exports.noAuthBudget = (req, res, next) => {
    if (req.session && req.session.budget && Object.keys(req.session.budget).length > 0) return res.redirect('/budget');
    return next();
}



