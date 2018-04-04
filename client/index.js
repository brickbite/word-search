// console.log('index.js loaded');

let query = '';
// let words = ['words', 'go', 'here'];

const updateQuery = (event) => {
  query = event.target.value;
};

const getWords = () => {
  // console.log('searching');
  const option = {
    method: 'GET'
  }
  fetch(`/word?term=${query}`, option).then((res) => {
    // console.log('res', res.body);
    res.json().then((data) => {
      updateList(data);
    });
  });
};

const updateList = (wordList) => {
  const listElement = document.getElementById("list-div");
  
  while (listElement.firstChild) {
    listElement.removeChild(listElement.firstChild);
  }

  for (let i = 0; i < wordList.length; i++) {
    // console.log(`updateList: ${i}: ${wordList[i]}`)
    let item = document.createElement("li");
    item.innerHTML = wordList[i];
    listElement.appendChild(item);
  }
  
};

document.getElementById("search-input").addEventListener("keyup", updateQuery);
document.getElementById("search-submit-button").addEventListener("click", getWords);
