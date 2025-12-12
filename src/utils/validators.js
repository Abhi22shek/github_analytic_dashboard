export const validators = {
  isValidUsername: (username) => {
    return /^[a-zA-Z0-9-]{1,39}$/.test(username);
  },

  isValidEmail: (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  isValidUrl: (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
};
