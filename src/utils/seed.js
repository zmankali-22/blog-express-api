const { BlogModel } = require("../models/BlogModel");
const { UserModel } = require("../models/UserModel");
const { comparePasswords, createJwt, validateJwt } = require("./authHelpers");
const {
  databaseConnect,
  databaseClear,
  databaseClose,
} = require("./database");

async function seedUsers() {
  let userData = [
    {
      username: "shiva",
      password: "password",
    },
    {
      username: "bisnu",
      password: "password",
    },
  ];

  let thirdUser = {
    username: "callum",
    password: "supercool",
  };

  console.log("creating user with .create() method");
  let callum = await UserModel.create(thirdUser);

  console.log("calling save on the created user...");
  await callum.save();

  console.log("Callum's encrypted password is: " + callum.password);
  let doesSuperCoolMatch = await comparePasswords(
    "supercool",
    callum.password
  );
  console.log("callums password is supercool: " + doesSuperCoolMatch);

  //   console.log("creating users from insertmany...");
  //   let result = await UserModel.insertMany(userData);

  console.log(
    "creating users from in bulk by promise.all over usermodel.create"
  );

  let result = await Promise.all(
    userData.map(async (user) => {
      let newUser = await UserModel.create(user);
      return newUser;
    })
  );
  console.log([...result, callum]);
  return [...result, callum];
}

async function seedBlogPosts(usersToUse) {
  let blogData = [
    {
      title: "super cool blog post",
      content: "blog post super 3000 words",
      author: usersToUse[0]._id,
      headerImage: "https://placehold.co/600x400/EEE/31343C",
      tags: ["seeded", "blog", "pokemon", "cool beans"],
      categories: ["coding", "travel"],
    },
    {
      title: "another super cool blog post",
      content: "blog post super 4000 words",
      author: usersToUse[1]._id,
      headerImage: "https://placehold.co/600x400/EEE/31343C",
      tags: ["seeded", "tada", "pokemon", "food"],
      categories: ["photography", "life"],
    },
    {
      title: "third super cool blog post",
      content: "blog post super 34000 words",
      author: usersToUse[1]._id,
      headerImage: "https://placehold.co/600x400/EEE/31343C",
      tags: ["seeded", "tada", "pokemon", "food"],
      categories: ["photography", "life"],
    },
  ];

  let result = await BlogModel.insertMany(blogData);
  console.log(result);
  return result;
}

async function seed() {
  await databaseConnect();
  await databaseClear();

  let newUsers = await seedUsers();
  let newBlogPosts = await seedBlogPosts(newUsers);

  let newJwt = createJwt(newUsers[0]._id)
  console.log("New JWT: " + newJwt);

  validateJwt(newJwt)


  console.log("Seeded data");
  await databaseClose();
}

seed();
