import axios from "axios";

const API =
  "http://localhost:5000/api/assignments";

export const createAssignment =
  async (data: any) => {

    const response =
      await axios.post(
        `${API}/create`,
        data
      );

    return response.data;
};

export const getAssignments =
  async () => {

    const response =
      await axios.get(API);

    return response.data;
};