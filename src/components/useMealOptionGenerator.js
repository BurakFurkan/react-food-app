import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function useMealOptionGenerator(meal) {
  const { t } = useTranslation();
  const [allValues, setAllValues] = useState({
    mealID: null,
    mealName: "",
    nutrientsNameArray: [],
    nutrientsAmountArray: [],
  });

  useEffect(() => {
    let nutrientsNameArray = [];
    let nutrientsAmountArray = [];

    (meal.ingredients || []).forEach((ingredient, index) => {
      nutrientsNameArray.push(ingredient.name);
      nutrientsAmountArray.push(index + 1);
    });

    setAllValues((prevValues) => {
      return {
        ...prevValues,
        nutrientsNameArray,
        nutrientsAmountArray,
        mealID: meal.id,
        mealName: meal.title,
      };
    });
  }, [meal, t]);

  return allValues;
}
