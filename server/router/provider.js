const router = require("express").Router();

const { addServiceProvider } = require("../controller/provider");

router.post("/register", addServiceProvider);

module.exports = router;
