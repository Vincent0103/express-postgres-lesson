import { body, validationResult } from "express-validator";

const usersController = (() => {
  const usersListGet = (req, res) => {
    console.log("usernames will be logged here - wip");
  }

  const usersCreateGet = (req, res) => {
    res.render("registerUserDB", { title: "Register user" });
  }

  const alphaErr = "must only contain letters.";
  const lengthErr = "must be between 1 and 12 characters.";

  const validateUsername = [
    body("username").trim()
      .isAlpha().withMessage(`Username ${alphaErr}`)
      .isLength({ min: 1, max: 12 }).withMessage(`Username ${lengthErr}`)
  ]

  const usersCreatePost = [
    validateUsername,
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render("registerUserDB", {
          title: "Register user",
          errors: errors.array(),
        });
      }

      console.log(`username to be saved: ${req.body.username}`);
    }
  ];

  return { usersListGet, usersCreateGet, usersCreatePost };
})();

export default usersController;
