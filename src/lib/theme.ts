export const THEME_STORAGE_KEY = "theme";

export type Theme = "dark" | "light";

export const THEME_SCRIPT = `try{if(localStorage.getItem("${THEME_STORAGE_KEY}")==="light")document.documentElement.classList.add("light")}catch(e){}`;
