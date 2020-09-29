const email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const name = /^[A-Za-z]+(['-]?[A-Za-z]+)?([ -]?[A-Za-z]+)?(['-]?[A-Za-z]+)?$/

export default [
  {
    category: "email",
    name: "email",
    label: "Email Address",
    placeholder: "Enter email address",
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
  {
    category: "password",
    name: "password",
    label: "Password",
    placeholder: "Enter password",
    require: true,
    validation: [
      {
        message: "must be a string",
        testCase: (input) => typeof input === "string",
      },
      {
        message: "minimum of 6 characters",
        testCase: (input) => input.trim().length >= 6,
      },
    ],
  },
]
