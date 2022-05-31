document.querySelector('#endAll').addEventListener('click', clearAll)
document.querySelector('#endComplete').addEventListener('click', clearComplete)
document.querySelector('.checked').addEventListener('click', checked)

const input = document.querySelector('#task')
const ul = document.querySelector('#list')
const add = document.querySelector('#add')
const amount = document.querySelector('#amount')

function checked(e) {
  const itemName = e.target.getAttribute('name')
 
  console.log(itemName)
  fetch('done', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          'name': itemName,
      })
  })
}
function submit(value, index) {
  console.log(value)
  console.log(index)
  const el = document.getElementById(index)
  console.log(el.getAttribute('name'))
  const itemName = el.getAttribute('name')
  const itemValue = el.getAttribute('value')
  fetch('done', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          'name': itemName,
          'value': itemValue
      })
  })
}
function clearAll() {

  fetch('clear', {
      method: 'delete',
      headers: {
          'Content-Type': 'application/json'
      },
  }).then(function (response) {
      window.location.reload()
  })
};
function clearComplete() {
  fetch('clearCompleted', {
      method: 'delete',
      headers: {
          'Content-Type': 'application/json'
      },
  }).then(function (response) {
      window.location.reload()
  })
};