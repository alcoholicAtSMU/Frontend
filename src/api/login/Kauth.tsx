const CLIENT_ID = "a17cc515ea9ec5c1ef5046107cbbcca2";
const REDIRECT_URI = "http://localhost:3000/api/login";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/apiorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
