// Form update using batch update
export const googleFormInfo = {
    requests: [
      {
        updateFormInfo: {
          info: {
            description: "If the second or third choice votes are empty, that can mean you won’t attend if your other choices don’t win."
          },
          updateMask: "description"
        }
      },
      {
        createItem: {
          item: {
            title: "First Name (don't duplicate votes):",
            questionItem: {
              question: {
                required: true,
                textQuestion: {
                  paragraph: false  // false for short answer, true for paragraph
                }
              }
            }
          },
          location: { index: 0 }
        }
      },
      {
        createItem: {
          item: {
            title: "Last Name (so I know who you are if you’re new):",
            questionItem: {
              question: {
                required: true,
                textQuestion: {
                  paragraph: false
                }
              }
            }
          },
          location: { index: 1 }
        }
      },
      {
        createItem: {
          item: {
            title: "First Place Choice",
            questionItem: {
              question: {
                required: true,
                choiceQuestion: {
                  type: "RADIO",
                  options: [{ value: "Grapevine" }, { value: "Plano" }, { value: "Design District"}]
                }
              }
            }
          },
          location: { index: 2 }
        }
      },
      {
        createItem: {
          item: {
            title: "Second Place Choice",
            questionItem: {
              question: {
                required: false,
                choiceQuestion: {
                  type: "RADIO",
                  options: [{ value: "Grapevine" }, { value: "Plano" }, { value: "Design District"}]
                }
              }
            }
          },
          location: { index: 3 }
        }
      },
      {
        createItem: {
          item: {
            title: "Third Place Choice",
            questionItem: {
              question: {
                required: false,
                choiceQuestion: {
                  type: "RADIO",
                  options: [{ value: "Grapevine" }, { value: "Plano" }, { value: "Design District"}]
                }
              }
            }
          },
          location: { index: 4 }
        }
      },
    ]
  }