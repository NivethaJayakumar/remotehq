import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://hackpackers.herokuapp.com',
  timeout: 1000,
  headers: {
    "Content-Type": "application/json"
  }
});


export const createBrowser = async (
  kioskMode= false,
  incognitoMode= false,
  browserURL="https://webex.com",
) => { 

  try {
    return await axiosInstance.post('/remoteHQ/cb', {
      kioskMode, incognitoMode, browserURL
    });
  } catch (error) {
    console.log(error);
  }
};


export const removeBrowser = async (instanceURN) => {
  try {
    axiosInstance.delete(`/remoteHQ/${instanceURN}`);
  } catch(error) {
    console.log(error);
  }
};