import { useState, useEffect } from 'react';
import { getCookie } from '../helpers';
import { USER_COOKIE_TOKEN_NAME } from '../constants';

function useCookieToken() {
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const token = getCookie(USER_COOKIE_TOKEN_NAME);
    if (token) {
      setHasToken(true);
    } else {
      setHasToken(false);
    }
  }, []);

  return hasToken;
}

export default useCookieToken;