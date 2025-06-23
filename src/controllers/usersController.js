import { body, query, validationResult } from "express-validator";
import { getAllUsernames, getMatchingUsernames, insertUsernames } from "../db/queries";

const usersController = (() => {
  const alphaErr = "must only contain letters.";
  const lengthErr = "must be between 1 and 12 characters.";

  const validateSearch = [
    query("search").trim().escape()
      .isAlpha().withMessage(`Search ${alphaErr}`)
      .isLength({ min: 1, max: 12 }).withMessage(`Username ${lengthErr}`)
  ];

  const usersListGet = [
    validateSearch,
    async (req, res) => {
      const { search } = req.query;

      if (!search) {
        const usernames = await getAllUsernames();
        console.log("Usernames: ", usernames);
        res.send("Usernames: " + usernames.map((user) => user.username).join(", "));
      } else {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          let errorText = errors.array().join(", ");
          return res.status(400).send(errorText);
        }
        console.log("doing");
        const usernames = await getMatchingUsernames(search);
        res.send("Usernames matching \"" + search + "\": " + usernames.map((user) => user.username).join(", "));
      }
    }
  ]

  const usersCreateGet = (req, res) => {
    res.render("registerUserDB", { title: "Register user" });
  }

  const validateUsername = [
    body("username").trim()
      .isAlpha().withMessage(`Username ${alphaErr}`)
      .isLength({ min: 1, max: 12 }).withMessage(`Username ${lengthErr}`)
  ];

  const usersCreatePost = [
    validateUsername,
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render("registerUserDB", {
          title: "Register user",
          errors: errors.array(),
        });
      }

      const { username } = req.body;
      await insertUsernames(username);
      res.redirect("/");
    }
  ];

  return { usersListGet, usersCreateGet, usersCreatePost };
})();

export default usersController;
