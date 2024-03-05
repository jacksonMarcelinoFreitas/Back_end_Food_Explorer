const bcrypt = require('bcryptjs');

// Gera um salt de forma síncrona
const salt = bcrypt.genSaltSync(8);

// Gera o hash da senha usando o salt gerado de forma síncrona
const hashedPassword = bcrypt.hashSync('admin', salt);

const insertUserAdmin = `INSERT INTO users (name, email, password, isAdmin) VALUES ('admin', 'admin@gmail.com', '${hashedPassword}', 1);`;

module.exports = insertUserAdmin;