const express = require("express");
const { UserModel } = require("../models/UserModel");
const { comparePasswords, createJwt } = require("../utils/authHelpers");
const router = express.Router();

router.get("/", async (request, response, next) => {
  let result = await UserModel.find({}).exec();
  response.json({
    message: "User Router operation",
    result: result,
  });
});

router.get("/findById/:id", async (request, response, next) => {
  let result = await UserModel.findById(request.params.id).exec();
  response.json({
    message: "Blog Router  Id homepage",
    result: result,
  });
});
router.post("/findOneQuery", async (request, response, next) => {
  let result = await UserModel.findOne(request.body).exec();
  response.json({
    message: "Blog Router  Id homepage",
    result: result,
  });
});
router.post("/findManyQuery", async (request, response, next) => {
  let result = await UserModel.find(request.body).exec();
  response.json({
    message: "User router operation",
    result: result,
  });
});

router.post("/", async (request, response, next) => {
  let result = await UserModel.create(request.body).catch((error) => {
    error.status = 400;
    return error;
  });

  if (result.errors) {
    return next(result);
  }
  response.json({
    message: "User Router operation",
    result: result,
  });
});

router.patch("/findById/:id", async (request, response, next) => {
  let result = await UserModel.findByIdAndUpdate(
    request.params.id,
    request.body,
    {
      returnDocument: "after",
    }
  );
  response.json({
    message: "User Router operation",
    result: result,
  });
});

router.delete("/", async (request, response, next) => {
  let result = await UserModel.findByIdAndDelete(request.body.id);
  response.json({
    message: "User Router operation",
    result: result,
  });
});

// login route

router.post("/jwt", async (request, response, next) => {
  let newJwt = "";
  if (!request.body.password || !request.body.username) {
    return next(new Error("Missing username or password"));
  }

  let foundUser = await UserModel.findOne({username: request.body.username}).exec();

  let isPasswordCorrect = await comparePasswords(
    request.body.password,
    foundUser.password
  );

  if (isPasswordCorrect) {
    newJwt = createJwt(foundUser._id);
    response.json({
      jwt: newJwt,
    });
  } else {
    return next(new Error("Incorrect password"));
  }
});

// validate JWT route

module.exports = router;
