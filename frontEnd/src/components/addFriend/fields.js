const email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default [
  {
    category: "email",
    name: "email",
    label: "User's Mail",
    placeholder: "Enter email address of user",
    require: true,
    validation: [
      {
        message: "must be a string",
        testCase: (input) => typeof input === "string",
      },
      {
        message: "invalid email",
        testCase: (input) => email.test(input),
      },
    ],
  },
]
