import axios from 'axios';

const getData = async (url: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(url);
      resolve(response.data);
    } catch (error: any) {
      reject(error);
    }
  });
};
export default getData;
