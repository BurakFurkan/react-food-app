import React, { useState, useEffect } from "react";

export default function useMealOptionGenerator(meal) {
  const [allValues, setAllValues] = useState({
    mealID: null,
    mealName: "",
    nutrientsNameArray: [],
    nutrientsAmountArray: [],
    
  });

  useEffect(() =>{
    let nutrientsNameArray = [];
    let nutrientsAmountArray = [];
    
    
    meal.nutrition.nutrients.forEach((nutrient) => {
      
      nutrientsNameArray.push(nutrient.name + "-" +(nutrient.unit))
      nutrientsAmountArray.push(nutrient.amount)
      

    });
    
    setAllValues((prevValues) => {
      return {
        ...prevValues,
        nutrientsNameArray,
        nutrientsAmountArray,
        mealID: meal.id, mealName: meal.title
      };
    });

  },[meal])

  console.log("1")
  return allValues;
}


