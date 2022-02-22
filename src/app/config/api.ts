const API_URL = window.location.hostname;
export const api = {
  api_url: API_URL ? 'http://' + API_URL + ':3000' : 'http://localhost:3000'
};
