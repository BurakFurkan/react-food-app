import { getProducts } from "./features/productSlice";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import AnimatedRoutes from "./Pages/AnimatedRoutes";

function App() {
  const { category, page } = useSelector((reduxStore) => reduxStore.product);
  const { userMenu } = useSelector((reduxStore) => reduxStore.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts(category));
  }, [category, page, dispatch]);

  return (
    <Container className="App">
      <AnimatedRoutes />
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  
`;

export default App;
