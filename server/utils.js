import { v4 as uuidv4 } from "uuid";

const generateUniqueID = () => {
  return uuidv4();
};

export { generateUniqueID };
