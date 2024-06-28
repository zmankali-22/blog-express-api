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
      username: "user1",
    },
    {
      username: "user2",
    },
  ];

  let result = await UserModel.insertMany(userData);
  console.log(result);
  return result;
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
