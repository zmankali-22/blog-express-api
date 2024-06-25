

const express = require('express');
const router = express.Router()


router.get("/", (request, response, next) => {
    response.json({
        message: "Blog Router homepage",
    });
})

router.get("/:id", (request, response, next) => {
    response.json({
        message: "Blog Router homepage",
    });
})

router.post("/", (request, response, next) => {
    response.json({
        message: "Blog Router homepage",
    });
})

router.patch("/", (request, response, next) => {
    response.json({
        message: "Blog Router homepage",
    });
})

router.delete("/", (request, response, next) => {
    response.json({
        message: "Blog Router homepage",
    });
})





module.exports = router