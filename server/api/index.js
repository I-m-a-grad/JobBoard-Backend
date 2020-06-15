const router = require("express").Router();

// router.use("/campuses", require("./routes/campuses"));
// router.use("/students", require("./routes/students"));

router.use((req, res, next) => {
    // const err = new Error("API route not found!");
    // err.status = 404;
    // next(err);
    res.json("hello");
});

module.exports = router;
