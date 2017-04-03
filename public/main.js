var update = document.getElementById('update')

update.addEventListener('click', function () {
  // Send PUT Request here
  fetch('dogs', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'breed': 'Stray dog',
      'weight': '5kg',
      'height': '15cm',
      'year': 'who knows'
    })
  })
  .then(res => {
    if (res.ok) return res.json()
    console.log(data)
  })
  .then(data => {
    console.log(data)
    window.location.reload(true)
  })
})

var del = document.getElementById('delete')

del.addEventListener('click', function () {
  fetch('dogs', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'breed': 'Stray dog'
    })
  })
  .then(res => {
    if (res.ok) return res.json()
  }).
  then(data => {
    console.log(data)
    window.location.reload(true)
  })
})
