import cities from "./data.json";
import { matchSorter } from "match-sorter";

const allItems = cities.map((city, index) => ({
  ...city,
  id: String(index),
}));

const getItem = (value) => {
  return value ? matchSorter(allItems, value, { key: ["name"] }) : allItems;
};

export default getItem;
