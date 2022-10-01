import { getProducts } from "./features/productSlice";
import { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { ThemeProvider } from "styled-components";
import AnimatedRoutes from "./Pages/AnimatedRoutes";
import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import {translationsEn,translationsTr} from "./features/translations";





function App() {
  const { theme,lang } = useSelector((reduxStore) => reduxStore.user);
  i18n.use(initReactI18next).init({lng: lang,debug: true, resources: {
    en: {
      translation: translationsEn
    },
    tr: {
      translation: translationsTr
    },
  }})
  const { category, page } = useSelector((reduxStore) => reduxStore.product);
  
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getProducts(category));
  }, [category, page, dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Container className="App">
        <AnimatedRoutes />
      </Container>
    </ThemeProvider>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;



export default App;
