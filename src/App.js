import { getProducts } from "./features/productSlice";
import { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { ThemeProvider } from "styled-components";
import AnimatedRoutes from "./Pages/AnimatedRoutes";
import {lightTheme,darkTheme} from "./features/Themes";

function App() {
  const { category, page } = useSelector((reduxStore) => reduxStore.product);
  const { userMenu } = useSelector((reduxStore) => reduxStore.user);
  const dispatch = useDispatch();
  const [theme,setTheme] = useState(lightTheme)

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
