import {useMemo} from "react";

const useRandomNumber = (min, max) => {
  return useMemo(()=>(Math.floor(Math.random() * (max - min + 1)) + min),[min, max])
  
};

export default useRandomNumber;