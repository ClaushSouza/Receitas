import { createAppContainer, createSwitchNavigator } from "react-navigation";

import HomePage from "../src/HomePage";
import Carnes from "../src/Produtos/Carnes/Carnes";
import Lanches from "../src/Produtos/Lanches/Lanches";
import Marinha from "../src/Produtos/Marinha/Marinha";
import Massas from "../src/Produtos/Massas/Massas";
import Sobremesas from "../src/Produtos/Sobremesas/Sobremesas";
import Vegetariano from "../src/Produtos/Vegetariana/Vegetariano";

const Rotas = {
    HomePage: {
        name: "HomePage",
        screen: HomePage,
    },
    Vegetariano: {
        name: "Vegetariano",
        screen: Vegetariano
    },
    Lanches: {
        name: "Lanches",
        screen: Lanches
    },
    Marinha: {
        name: "Marinha",
        screen: Marinha
    },
    Massas: {
        name: "Massas",
        screen: Massas
    },
    Carnes: {
        name: "Carnes",
        screen: Carnes
    },
    Sobremesas: {
        name: "Sobremesas",
        screen: Sobremesas
    },
}
    

const Navegacao = createSwitchNavigator(Rotas);
export default createAppContainer(Navegacao);