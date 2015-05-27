var orm = require('orm');
var settings = require('../../config/settings');

module.exports = function (app) {

    app.use(orm.express(settings.database.connectionString(), {
        define: function (db, models) {

            models.category = db.define("Categories", {
                Id: Number,
                ParentId: Number,
                Name: String
            }, {
                id: "Id",
                cache: false
            });

            models.account = db.define("Accounts", {
                Id: Number,
                Name: String
            }, {
                id: "Id",
                cache: false
            })

            models.transactionTypes = db.define("TransactionTypes", {
                Id: Number,
                Name: String
            }, {
                id: "Id",
                cache: true
            })

            models.transaction = db.define("Transaction", {
                Id: Number,
                AccountId: Number,
                CategoryId: Number,
                TransactionTypeId: Number,
                TransactionDate: Date,
                Amount: Number
            }, {
                id: "Id",
                cache: false
            });

        }
    }));

};