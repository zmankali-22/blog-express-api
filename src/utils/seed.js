const { BlogModel } = require("../models/BlogModel");
const { UserModel } = require("../models/UserModel");
const {
  databaseConnect,
  databaseClear,
  databaseClose,
} = require("./database");

async function seedUsers() {
  let userData = [
    {
      username: "shiva",
      password: "password"
    },
    {
      username: "bisnu",
      password: "password"
    },
  ];

  let thirdUser = {
    username: "thirduser",
    password: "password",
  }

  console.log("creating user with .create() method");
  let callum = await UserModel.create(thirdUser)

  console.log("calling save on the created user...");
  await callum.save()

  console.log("creating users from insertmany...");
  let result = await UserModel.insertMany(userData);
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

  console.log("Seeded data");
  await databaseClose();
}

seed();
