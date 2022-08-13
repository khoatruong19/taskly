import jwtDecode, { JwtPayload } from 'jwt-decode';

export const LOGOUT_EVENT = 'jwt-logout';

const JWTManager = () => {
  let inMemoryToken: string | null = null;
  let refreshTokenTimeoutId: number | null = null;
  let userId: string | null = null;

  const getUserId = () => userId;

  const getToken = () => inMemoryToken;

  const setToken = (accessToken: string) => {
    inMemoryToken = accessToken;

    const decoded = jwtDecode<JwtPayload & { userId: string }>(accessToken);
    userId = decoded.userId;
    setRefreshTokenTimeout(Number(decoded.exp) - Number(decoded.iat));

    return true;
  };

  const abortRefreshToken = () => {
    if (refreshTokenTimeoutId) window.clearTimeout(refreshTokenTimeoutId);
  };

  const deleteToken = () => {
    inMemoryToken = null;
    abortRefreshToken();
    window.localStorage.setItem(LOGOUT_EVENT, Date.now().toString());
    return true;
  };

  //Logout all tabs

  const setTokenToNull = () => (inMemoryToken = null);

  const getRefreshToken = async () => {
    try {
      const res = await fetch('http://localhost:4000/refresh_token', {
        credentials: 'include',
      });
      const data = (await res.json()) as {
        success: boolean;
        accessToken: string;
      };
      setToken(data.accessToken);
      return true;
    } catch (error) {
      console.log('Unauthenticated, ', error);
      deleteToken();
      return false;
    }
  };

  const setRefreshTokenTimeout = (delay: number) => {
    refreshTokenTimeoutId = window.setTimeout(
      getRefreshToken,
      delay * 1000 - 5000
    );
  };

  return {
    getToken,
    setToken,
    getRefreshToken,
    deleteToken,
    getUserId,
    setTokenToNull,
  };
};

export default JWTManager();
