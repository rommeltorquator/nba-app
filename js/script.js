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

// event handlers //

// get the individual player event handler
if(document.getElementById('player-button') != null) {
    document.getElementById('player-button').addEventListener('click', getPlayer)
}

if(document.getElementById('players-button') !=null) {
    document.getElementById('players-button').addEventListener('click', (e) => {
        e.preventDefault()

        // if form is empty
        let f1 = document.getElementById('playerFirst1').value
        let l1 = document.getElementById('playerLast1').value
        let f2 = document.getElementById('playerFirst2').value
        let l2 = document.getElementById('playerLast2').value       
        let name1
        let name2

        if(!f1 && !l1 && !f2 && !l2) {
            console.log('empty')
            document.getElementById('no-players').style.display = 'block'            
        } else {
            let p1Id
            // player 1 query
            fetch(`https://www.balldontlie.io/api/v1/players?search=${f1}%20${l1}`)
            .then(res => res.json())
            .then(data => {
                // name1 = `${data.data[0].first_name} ${data.data[0].last_name}`
                name1 = 'tae'
                p1Id = parseInt(data.data[0].id)
                // console.log(typeof p1Id)
            })    
            
            let p2Id
            // player 2 query
            fetch(`https://www.balldontlie.io/api/v1/players?search=${f2}%20${l2}`)
            .then(res => res.json())
            .then(data => {
                name2 = `${data.data[0].first_name} ${data.data[0].last_name}`
                p2Id = parseInt(data.data[0].id)
                // console.log(typeof p2Id)
            })
            
            comparePlayers(p1Id, p2Id, name1, "lebron")
        }
        
    })
}

let teamNames = []
let playerId

// get the teams
getTeamNames()

// functions //

// async function comparePlayers(a,b, n1, n2) {
//     const res = await fetch(`https://www.balldontlie.io/api/v1/season_averages?season=2020&player_ids[]=${a}&player_ids[]=${b}`)
//     const data = await res.json()
//     document.getElementById('players-profile').style.display = 'block'
    // players-profile
    // p1-name
    // p1-team
    // p1-ppg
    // p1-rpg
    // p1-apg
    // p1-fg
    document.getElementById('p1-name').textContent = n1
    document.getElementById('p1-team').textContent = 'lakers'
    document.getElementById('p1-ppg').textContent = data.data[0].pts
    document.getElementById('p1-rpg').textContent = data.data[0].reb
    document.getElementById('p1-apg').textContent = data.data[0].ast
    document.getElementById('p1-fg').textContent = data.data[0].games_played
    console.log(data)
// }

// get the individual player
function getPlayer() {
    // stores the values of inputs
    first = document.getElementById('firstName1').value
    last = document.getElementById('lastName1').value

    // to check if input is not empty
    if (!first || !last) {
        document.getElementById('no-player').style.display = 'block'
        document.getElementById('no-player').innerText = 'Please enter a full name'
        document.getElementById('player-profile').style.display = 'none'
    } else {
        if(document.getElementById('player-table').childElementCount > 0) {
            document.getElementById('player-table').innerHTML = ''
        }
        
        fetch(`https://www.balldontlie.io/api/v1/players?search=${first}%20${last}`)
            .then(res => res.json())
            .then(data => {
                if (data.data.length < 1) {
                    // if no record found
                    document.getElementById('no-player').style.display = 'block'
                    document.getElementById('no-player').innerText = 'Player not found'
                    document.getElementById('player-profile').style.display = 'none'
                    // document.getElementById('collapseExample').style.display = 'block'
                } else {
                    // console.log(data.data[0])
                    // individual player
                    playerId = parseInt(data.data[0].id)
                    document.getElementById('full-name').innerText = `${data.data[0].first_name} ${data.data[0].last_name}`
                    document.getElementById('team').innerText = `${data.data[0].team.full_name}`
                    document.getElementById('no-player').style.display = 'none'
                    
                    getLast3Games()
                    getStats()
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
}

function getStats() {
    // show the current stats of specific player for the selected this season
    fetch(`https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${playerId}`)
    .then(res => res.json())
    .then(data => {
        // if no available stats 
        if (data.data.length < 1) {
            document.getElementById('player-profile').style.display = 'none'
            document.getElementById('no-player').style.display = 'block'
            document.getElementById('no-player').innerText = 'No available stats for the current season'
        } else {
            // console.log(data.data[0])
            // season stats
            document.getElementById('ppg').innerText = data.data[0].pts.toFixed(1)
            document.getElementById('rpg').innerText = data.data[0].reb.toFixed(1)
            document.getElementById('apg').innerText = data.data[0].ast.toFixed(1)
            document.getElementById('fg').innerText = data.data[0].games_played
            document.getElementById('player-profile').style.display = 'block'
        }
    })
    .catch(error => {
        console.log(error)
    })
}

async function getTeamNames() {
    res = await fetch('https://www.balldontlie.io/api/v1/teams')
    data = await res.json()
    teamNames = data.data
}

async function getLast3Games() {
    // gets all the games of a specific player
    res = await fetch(`https://www.balldontlie.io/api/v1/stats?seasons[]=2020&player_ids[]=${playerId}`)
    // previous games of individual player
    data = await res.json()
                        
    // previous games in descending order
    const arr1 = data.data
    arr1.sort((a, b) => {
        return b.id - a.id // asc
    });
    // console.log(arr1)                     

    let container = ''
    let date

    arr1.slice(0, 3).forEach(x => {
        date = new Date(x.game.date.substr(0, 10))
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        container += `                   
        <tr>                            
            <td><strong>${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}</strong></td>
            <td>${x.game.visitor_team_id != x.player.team_id ? teamNames[x.game.visitor_team_id - 1].full_name : teamNames[x.game.home_team_id - 1].full_name}</td>
            <td><strong>${x.pts}</strong></td>
                <td>${x.reb}</td>
                <td>${x.ast}</td>
                <td>${x.stl}</td>
                <td>${x.min}</td>
                <td><strong>${x.fg_pct}</strong></td>
        </tr>
        `
    })
    document.getElementById('player-table').innerHTML += container
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