const router = require("express").Router();
const authRouter = require("./auth");
const providerRouter = require("./provider");
const serviceRouter = require("./service");
const adminRouter = require("./adminRoutes");
const orderRouter = require("./order");
const bidRouter = require("./bidRoutes");
const serviceRequestRouter = require("./serviceRequestRoutes");
const home = require("../controller/home");

router.use("/auth", authRouter);
router.use("/providers", providerRouter);
router.use("/services", serviceRouter);
router.use("/admin", adminRouter);
router.use("/orders", orderRouter);
router.use("/bids", bidRouter);
router.use("/service-requests", serviceRequestRouter);

router.get("/", home);

module.exports = router;
