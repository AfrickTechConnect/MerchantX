export default [
  {
    type: "input",
    category: "title",
    name: "title",
    label: "Post Title",
    placeholder: "Enter Post title",
    require: true,
    validation: [
      {
        message: "must be a string",
        testCase: (input) => typeof input === "string",
      },
    ],
  },
  {
    type: "description",
    category: "description",
    name: "description",
    label: "description",
    placeholder: "Enter post description",
    require: true,
    validation: [
      {
        message: "must be a string",
        testCase: (input) => typeof input === "string",
      },
      {
        message: "you need to post at least a letter",
        testCase: (input) => input.trim().length >= 1,
      },
    ],
  },
]
