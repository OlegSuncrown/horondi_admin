export const clearLocalStorage = () => {
  const horondi = {
    HORONDI_AUTH_TOKEN: null,
    darkMode: null
  };
  localStorage.setItem('horondi', JSON.stringify(horondi));
};

if (!localStorage.getItem('horondi')) {
  clearLocalStorage();
}

export const getFromLocalStorage = (name) => {
  const localObject = JSON.parse(localStorage.getItem('horondi'));
  return localObject[name];
};

export const setToLocalStorage = (name, item) => {
  const localObject = JSON.parse(localStorage.getItem('horondi'));
  localObject[name] = item;
  localStorage.setItem('horondi', JSON.stringify(localObject));
};
