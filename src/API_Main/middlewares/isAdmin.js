module.exports = function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.cargo === 'admin') {
      return next();
    }
  
    return res.status(403).json({ error: 'Acesso restrito: apenas admins têm permissão.' });
  };
  