$('#collapseExample').on('shown.bs.collapse', function () {
    // do something...
    document.getElementById('collapseButton').innerText = "Hide"
    document.getElementById('last-3').classList.add('py-4')
})

$('#collapseExample').on('hidden.bs.collapse', function () {
    // do something...
    document.getElementById('collapseButton').innerText = "Show more stats"
    document.getElementById('last-3').classList.remove('py-4')
})

// fetching data
// const getData = fetch('https://www.balldontlie.io/api/v1/players/237').then(res => res.json()).then(data => {
//     console.log(data.first_name)
// })

// sending data
// const data = { username: 'example' };

// fetch('https://example.com/profile', {
//   method: 'POST', // or 'PUT'
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(data),
// })
// .then(response => response.json())
// .then(data => {
//   console.log('Success:', data);
// })
// .catch((error) => {
//   console.error('Error:', error);
// });