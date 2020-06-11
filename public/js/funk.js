/*view star-icon by table.favorite*/


const FavoSort = (memos) => {
  let sortArray;
  let favoArray;
  let non_favoArray;

  memos.forEach((temp) => {
    if (temp.favorite == 1) favoArray.push(temp);
    else non_favoArray.push(temp);
  });

  /*for (let i=0; i<Array.length; i++) {
    if (Array[i].favorite == 1) favoArray.push(Array[i]);
    else non_favoArray.push(Array[i]);
  }*/
  sortArray = favoArray.contact(non_favoArray);
  memos = sortArray;
  //return sortArray;
};
