export const registerAPI = async (email: string, password: string) => {
  return {
    status: 200,
    data: {
      token: "1234567890",
    },
  };
};

export const loginAPI = async (email: string, password: string) => {
  return {
    status: 200,
    data: {
      token: "1234567890",
    },
  };
};
