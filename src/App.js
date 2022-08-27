import Home from "./Pages/Home";
import { getProducts } from "./features/productSlice";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";



function App() {
  const { category } = useSelector((reduxStore) => reduxStore.product);
  const {userMenu} = useSelector((reduxStore) => reduxStore.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts(category));
  }, [category, dispatch]);


  return (
    <Container className="App">
      <Home />
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;

`

export default App;
