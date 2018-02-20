const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.book = require('../models/book.js')(sequelize, Sequelize);
db.patron = require('../models/patron.js')(sequelize, Sequelize);
db.loan = require('../models/loan.js')(sequelize, Sequelize);

db.patron.hasMany(db.loan);
db.book.hasMany(db.loan);
