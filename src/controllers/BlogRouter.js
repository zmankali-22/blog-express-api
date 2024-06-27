

const express = require('express');
const { BlogModel } = require('../models/BlogModel');
const {UserModel} = require('../models/UserModel');
const router = express.Router()


router.get("/", async (request, response, next) => {

    let result = await  BlogModel.find({}).populate("author").exec()
    response.json({
        message: "Blog Router homepage",
        result: result
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