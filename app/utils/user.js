const db = require("../core/db");

const getUser = async (email) => {
  try {
    const user = await db("users").select().where("email", email);

    if (!user) {
      return null;
    } else {
      return user[0];
    }
  } catch (error) {
    console.error(error);
  }
};

const createUser = async (email, password) => {
  if (!email || !password) {
    return { message: "Incomplete request body!" };
  }

  try {
    const user = await db("users")
      .returning(["id", "email"])
      .insert({ email, password });
    return user[0];
  } catch (error) {
    console.error(error);
    return error;
  }
};

module.exports = { getUser, createUser };
