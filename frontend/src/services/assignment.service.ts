import axios from "axios";

const API =
  "https://ai-assessment-backend-s6lw.onrender.com/api/assignments";

export const createAssignment =
  async (data: FormData) => {

    const response =
      await axios.post(
        `${API}/create`,
        data,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;
};

export const getAssignments =
  async () => {

    const response =
      await axios.get(API);

    return response.data;
};