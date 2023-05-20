import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function useOverAllChartOptions() {
  const { t } = useTranslation();
  const { meals } = useSelector((reduxStore) => reduxStore.user);
  //const [allValues, setAllValues] = useState({});

  const allValues = new Map();

  meals.forEach((meal) => {
    meal.nutrition.nutrients.forEach((nutrient) => {
      if (allValues.get(nutrient.name)) {
        let oldAmount = allValues.get(nutrient.name);
        let newAmount = oldAmount + nutrient.amount;

        allValues.set(nutrient.name, newAmount);
      } else {
        allValues.set(nutrient.name, nutrient.amount);
      }
    });

    return allValues;
  });
  const nameArray = [];
  const amountArray = [];
  allValues.forEach((key, value) => {
    nameArray.push(t(value));
    amountArray.push(key);
  });

  let meal = {};
  meal.id = 1;
  meal.title = t("overall nutrients");
  meal.name = nameArray;
  meal.amount = amountArray;

  return meal;
}
