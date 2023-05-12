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
              name: "Column1",
              tasks: [
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
            }
          ]
        },
        {
          name: "My Other Board", 
          columns: [
            {
              name: "Column2",
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