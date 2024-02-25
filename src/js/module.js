// получаем данные
const getFirstTable = () =>
  JSON.parse(localStorage.getItem("firstTable")) || [];
const getSecondTable = () =>
  JSON.parse(localStorage.getItem("secondTable")) || [];
const getThirdTable = () =>
  JSON.parse(localStorage.getItem("thirdTable")) || [];
//меняем данные
const setFirstTable = (data) =>{
  localStorage.setItem("firstTable", JSON.stringify(data));
}
const setSecondTable = (data) =>
  localStorage.setItem("secondTable", JSON.stringify(data));
const setThirdTable = (data) =>
  localStorage.setItem("thirdTable", JSON.stringify(data));

export {getFirstTable, getSecondTable, getThirdTable, setFirstTable, setSecondTable, setThirdTable}