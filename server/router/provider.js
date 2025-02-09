const router = require("express").Router();

const { registerProvider, addService } = require("../controller/provider");
const { authenticate } = require("../middlewares/authenticate");

router.post("/register", registerProvider);
router.post("/add-service",authenticate, addService);

module.exports = router;
