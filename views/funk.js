/*view star-icon by table.favorite*/


const FavoSort = (Array) => {
  let sortArray;
  let favoArray;
  let non_favoArray;
  for (let i=0; i<Array.length; i++) {
    if (Array[i].favorite == 1) favoArray.push(Array[i]);
    else non_favoArray.push(Array[i]);
  }
sortArray = favoArray.contact(non_favoArray);
return sortArray;
};
