import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function useMealOptionGenerator(meal) {
  const { t, i18n } = useTranslation();
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
      
      nutrientsNameArray.push(t(`${nutrient.name}`) + "-" +(nutrient.unit))
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

  return allValues;
}


