export const addToLocalStorage = (name: string, id: number) => {
    const key = id.toString();
    localStorage.setItem(key, name);
};

export const getAllFromLocalStorage = () => {
    const citiesId = Object.keys(localStorage);
    return citiesId;
};

export const removeFromLocalStorage = (id: number) => {
    const key = id.toString();
    localStorage.removeItem(key);
};
