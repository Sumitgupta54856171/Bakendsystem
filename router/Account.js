const express = require("express");
const Account = express.Router();
const account = require("../controller/account")
const verifytoken = require("../middleware/verification")
const filter = require("../controller/filter")
Account.use(verifytoken)
Account.get("/claim", account.getClaim)
Account.post("/claim/update/:id", account.updateClaim)
Account.get("/filter/last24hours", filter.getLast24Hours)
Account.get("/filter/thisweek", filter.getThisWeek)
Account.get("/filter/thismonth", filter.getThisMonth)
module.exports = Account;
