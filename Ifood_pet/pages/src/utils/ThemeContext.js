import { createContext } from "react";
//Criando a variações entre os temas claro e escuros
const ThemeContext = createContext(["light", () => {}]);

export default ThemeContext;