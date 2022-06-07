var trash = document.getElementsByClassName("fa-trash");
var check = document.getElementsByClassName("fa-check");

Array.from(check).forEach(function(element) {
element.addEventListener('click', function(e){
  e.preventDefault()
  const date = this.parentNode.parentNode.childNodes[1].innerText
  const toDo = this.parentNode.parentNode.childNodes[3].innerText
  // msg is coming back undefined***
  console.log(msg)
  console.log(date)
  const complete = e.target.classList.contains('grey') ? true : false

  fetch('complete', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'date': date,
      'toDo': toDo,
      'completed': complete,
      // passing these keys names to the server
    })
  })
  .then(response => {
    if (response.ok) return response.json()
  })
  .then(data => {
    console.log(data)
    window.location.reload(true)
  })
 });
});


Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function(){
    const date = this.parentNode.parentNode.childNodes[1].innerText
    const toDo = this.parentNode.parentNode.childNodes[3].innerText
    fetch('toDo', {
      // fetch the form name in the index.js
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'date': date,
        'toDo': toDo
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});