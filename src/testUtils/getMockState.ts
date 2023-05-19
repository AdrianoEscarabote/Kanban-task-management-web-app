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
              name: "Todo",
              tasks: [
                {
                  title: "Design settings and search pages",
                  description: "",
                  status: "Todo",
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
              name: "Done",
              tasks: [
                {
                  title: "Launch version one",
                  description: "",
                  status: "Done",
                  subtasks: [
                    {
                      title: "Launch privately to our waitlist",
                      isCompleted: true,
                    },
                    {
                      title: "Launch publicly on PH, HN, etc.",
                      isCompleted: true,
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          name: "My Other Board", 
          columns: [
            {
              name: "Doing",
              tasks: [
                {
                  title: "Add account management endpoints",
                  description: "",
                  status: "Doing",
                  subtasks: [
                    {
                      title: "Upgrade plan",
                      isCompleted: false
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