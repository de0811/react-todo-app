export const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key, defaultVal) => {
    const data = JSON.parse(localStorage.getItem(key));
    if (isEmpty(data)) {
      return defaultVal;
    }
    return data;
  },
};

export function isEmpty(obj) {
  if (obj === null || typeof obj === "undefined") return true;
  if (obj === "" || obj === [] || obj === {}) return true;

  return false;
}

export function isNotEmpty(obj) {
  return !isEmpty(obj);
}
