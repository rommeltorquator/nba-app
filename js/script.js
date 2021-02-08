$('#collapseExample').on('shown.bs.collapse', function () {
    // do something...
    document.getElementById('collapseButton').innerText = "Hide"
    // document.getElementById('last-3').classList.add('py-4')
})

$('#collapseExample').on('hidden.bs.collapse', function () {
    // do something...
    document.getElementById('collapseButton').innerText = "Show more stats"
    // document.getElementById('last-3').classList.remove('py-4')
})

// get the individual player event handler
document.getElementById('player-button').addEventListener('click', getPlayer)

// get the individual player
function getPlayer() {
    // stores the values of inputs
    first = document.getElementById('firstName1').value
    last = document.getElementById('lastName1').value

    // to check if input is not empty
    if(!first && !last) {
        document.getElementById('no-player').style.display = 'block'
        document.getElementById('no-player').innerText = 'Please enter a name'
        document.getElementById('player-profile').style.display = 'none'
    } else {
        fetch(`https://www.balldontlie.io/api/v1/players?search=${first}%20${last}`)
        .then(res => res.json())
        .then(data => {
            if(data.data.length < 1) {
                // if no record found 
                document.getElementById('no-player').style.display = 'block'
                document.getElementById('no-player').innerText = 'Player not found'
                document.getElementById('player-profile').style.display = 'none'
            } else {
                console.log(data.data[0])
                playerId = parseInt(data.data[0].id)
                document.getElementById('full-name').innerText = `${data.data[0].first_name} ${data.data[0].last_name}`
                document.getElementById('team').innerText = `${data.data[0].team.full_name}` 
                document.getElementById('no-player').style.display = 'none'

                // show the current stats for the selected this season
                fetch(`https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${playerId}`)
                .then(res => res.json())
                .then(data => {
                    // if no available stats 
                    if(data.data.length < 1) {
                        document.getElementById('no-player').style.display = 'block'
                        document.getElementById('no-player').innerText = 'No available stats for the current season'
                        document.getElementById('player-profile').style.display = 'none'
                    } else {
                        console.log(data.data[0])
                        document.getElementById('ppg').innerText = data.data[0].pts
                        document.getElementById('rpg').innerText = data.data[0].reb
                        document.getElementById('apg').innerText = data.data[0].ast
                        document.getElementById('fg').innerText = data.data[0].games_played
                        document.getElementById('player-profile').style.display = 'block'
                    }
                })
                .catch(error => {
                    console.log(error)
                })
            }
        })
        .catch(error => {
            console.log(error)
        })
    }    
}


























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
// .then(response => {
    //  if(response.ok) {
    //     return response.json()
    //  } else {
    //     console.log('Error')
    //  }
// })
// .then(data => {
//   console.log('Success:', data);
// })
// .catch((error) => {
//   console.error('Error:', error);
// });