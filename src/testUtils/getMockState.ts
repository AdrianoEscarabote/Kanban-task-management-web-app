export default function getMockState() {
  return {
    themeReducer: {
      theme: "dark"
    },
    reducerNameBoard: {
      nameBoard: "My Board"
    },
    boardSlice: {
      boards: [
        {
          name: "My Board", 
          columns: [
            {
              title: "Design settings and search pages",
              description: "",
              status: "Doing",
              subtasks: [
                {
                  title: "Settings - Account page",
                  isCompleted: true
                },
              ]
            }
          ]
        },
        {
          name: "My Other Board",
          columns: [
            {
              name: "column2",
              tasks: [
                {
                  title: "Build UI for onboarding flow",
                  description: "",
                  status: "Todo",
                  subtasks: [
                    {
                      title: "Sign up page",
                      isCompleted: true
                    },
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  };
}