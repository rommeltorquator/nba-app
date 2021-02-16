$('#collapseExample').on('shown.bs.collapse', function () {
    // do something...
    document.getElementById('collapseButton').innerText = "Hide"
    // document.getElementById('last-3').classList.add('py-4')
    document.getElementById('collapseExample').scrollIntoView()
})

$('#collapseExample').on('hidden.bs.collapse', function () {
    // do something...
    document.getElementById('collapseButton').innerText = "Last 3 games"
    // document.getElementById('last-3').classList.remove('py-4')
})

// event handlers //

// get the individual player event handler
if(document.getElementById('player-button') != null) {
    document.getElementById('player-button').addEventListener('click', getPlayer)
}

// get 2 players
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
        let p1Id = 0
        let p2Id = 0
        let data1

        if(!f1 || !l1 || !f2 || !l2) {            
            document.getElementById('no-players').style.display = 'block'
            document.querySelector('.card-1').style.display = `none`
            document.querySelector('.card-2').style.display = `none`
            document.getElementById('no-player-1').style.display = 'none'
            document.getElementById('no-player-2').style.display = 'none'
        } else {       
            if(f1 == f2 && l1 == l2)      {
                document.getElementById('no-players').style.display = 'block'
                document.getElementById('no-player-1').style.display = 'none'
                document.getElementById('no-player-2').style.display = 'none'
                document.querySelector('.card-1').style.display = `none`
                document.querySelector('.card-2').style.display = `none`
            } else {
                document.getElementById('no-players').style.display = 'none'
                getP1(f1, l1)
                getP2(f2, l2)

                document.getElementById('p1-ppg').style.fontWeight = 'normal'
                document.getElementById('p1-rpg').style.fontWeight = 'normal'
                document.getElementById('p1-apg').style.fontWeight = 'normal'
                document.getElementById('p1-fg').style.fontWeight = 'normal'

                document.getElementById('p2-ppg').style.fontWeight = 'normal'
                document.getElementById('p2-rpg').style.fontWeight = 'normal'
                document.getElementById('p2-apg').style.fontWeight = 'normal'
                document.getElementById('p2-fg').style.fontWeight = 'normal'

                document.getElementById('p1-min').style.fontWeight = 'normal'
                document.getElementById('p1-fgm').style.fontWeight = 'normal'
                document.getElementById('p1-fga').style.fontWeight = 'normal'
                document.getElementById('p1-fg-pct').style.fontWeight = 'normal'

                document.getElementById('p2-min').style.fontWeight = 'normal'
                document.getElementById('p2-fgm').style.fontWeight = 'normal'
                document.getElementById('p2-fga').style.fontWeight = 'normal'
                document.getElementById('p2-fg-pct').style.fontWeight = 'normal'

                p1Ppg = 0
                p1Apg = 0
                p1Rpg = 0
                p1Gp = 0

                p1Min = 0
                p1Fgm = 0
                p1Fga = 0
                p1FgPct = 0

                p2Ppg = 0
                p2Apg = 0
                p2Rpg = 0
                p2Gp = 0

                p2Min = 0
                p2Fgm = 0
                p2Fga = 0
                p2FgPct = 0
            }
        }
    })
}

let teamNames = []
let playerId
let playerTeamId

let p1Ppg = 0
let p1Apg = 0
let p1Rpg = 0
let p1Gp = 0

let p1Min = 0
let p1Fgm = 0
let p1Fga = 0
let p1FgPct = 0

let p2Ppg = 0
let p2Apg = 0
let p2Rpg = 0
let p2Gp = 0

let p2Min = 0
let p2Fgm = 0
let p2Fga = 0
let p2FgPct = 0

// get the team names
getTeamNames()

// show all current nba teams
showTeams()


// ***** functions ***** //

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
                playerTeamId = data.data[0].team.id
                document.getElementById('full-name').innerText = `${data.data[0].first_name} ${data.data[0].last_name}`
                document.getElementById('team').innerText = `${data.data[0].team.full_name} - 2020-21`
                document.getElementById('no-player').style.display = 'none'

                // data.data[0].team.id
                
                getLast3Games()
                getStats()

                let pendingGames = []
                let sortedGames = []

                // get the 7th day to this day
                let today = new Date()
                let tomorrow = new Date(today)
                tomorrow.setDate(tomorrow.getDate() + 1)

                let thirdDay = new Date(tomorrow)
                thirdDay.setDate(thirdDay.getDate() + 1)

                let fourthDay = new Date(thirdDay)
                fourthDay.setDate(fourthDay.getDate() + 1)

                let fifthDay = new Date(fourthDay)
                fifthDay.setDate(fifthDay.getDate() + 1)

                let sixthDay = new Date(fifthDay)
                sixthDay.setDate(sixthDay.getDate() + 1)

                let seventhDay = new Date(sixthDay)
                seventhDay.setDate(seventhDay.getDate() + 1)

                // console.log(today.getMonth(), today.getDate(), today.getFullYear())

                // get the next 3 games of the selected player's team
                fetch(`https://www.balldontlie.io/api/v1/games?team_ids[]=${playerTeamId}&start_date=%27${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}%27&end_date=%27${seventhDay.getFullYear()}-${seventhDay.getMonth() + 1}-${seventhDay.getDate()}%27`)
                .then(res => res.json())
                .then(data => {
                    data.data.forEach(x => {
                        if(x.status != 'Final') {
                            pendingGames.push(x)
                        }
                    })
                    pendingGames.sort((a, b) => {
                        return a.id - b.id
                    })
                    console.log(pendingGames)
                })
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
            document.getElementById('min').innerText = data.data[0].min
            document.getElementById('fgm').innerText = data.data[0].fgm.toFixed(1)
            document.getElementById('fga').innerText = data.data[0].fga.toFixed(1)
            document.getElementById('fg-pct').innerText = (data.data[0].fg_pct * 100).toFixed(1)
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

    // <td><strong>${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}</strong></td>

    arr1.slice(0, 3).forEach(x => {
        // console.log(x.game.date.substr(0, 10))
        date = new Date(x.game.date.substr(0, 10))
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        container += `                   
        <tr>
            <td><strong>${monthNames[date.getMonth()]} ${date.getDate() + 1}, ${date.getFullYear()}</strong></td>
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

async function getP1(f1, l1) {
    // player 1 query
    res = await fetch(`https://www.balldontlie.io/api/v1/players?search=${f1}%20${l1}`)
    data = await res.json()

    if (data.data.length < 1) {
        document.querySelector('.card-1').style.display = `none`
        document.getElementById('no-player-1').style.display = 'block'
        document.getElementById('no-player-1').innerText = 'Player not found'
    } else {
        p1Id = data.data[0].id
            
        let first = data.data[0].first_name
        let last = data.data[0].last_name
        let team = data.data[0].team.full_name
    
        // show the current stats of specific player for the selected this season
        fetch(`https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${p1Id}`)
        .then(res => res.json())
        .then(data => {
            // if no available stats 
            if (data.data.length < 1) {
                document.querySelector('.card-1').style.display = `none`
                document.getElementById('no-player-1').style.display = 'block'
                document.getElementById('no-player-1').innerText = 'No available stats for the current season'
            } else {
                // console.log(data.data[0])

                // season stats
                document.getElementById('no-player-1').style.display = 'none'
                document.querySelector('.card-1').style.display = `block`
                document.getElementById('p1-name').textContent = `${first} ${last}`
                document.getElementById('p1-team').textContent = `${team}`
                document.getElementById('p1-ppg').textContent = data.data[0].pts.toFixed(1)
                document.getElementById('p1-rpg').textContent = data.data[0].reb.toFixed(1)
                document.getElementById('p1-apg').textContent = data.data[0].ast.toFixed(1)
                document.getElementById('p1-fg').textContent = data.data[0].games_played

                document.getElementById('p1-min').textContent = data.data[0].min
                document.getElementById('p1-fgm').textContent = data.data[0].fgm.toFixed(1)
                document.getElementById('p1-fga').textContent = data.data[0].fga.toFixed(1)
                document.getElementById('p1-fg-pct').textContent = (data.data[0].fg_pct * 100).toFixed(1)

                p1Ppg = data.data[0].pts
                p1Rpg = data.data[0].reb
                p1Apg = data.data[0].ast
                p1Gp = data.data[0].games_played

                p1Min = data.data[0].min
                p1Fgm = data.data[0].fgm
                p1Fga = data.data[0].fga
                p1FgPct = data.data[0].fg_pct                
            }
        })
        .catch(error => {
            console.log(error)
        })
    }
}

async function getP2(f2, l2) {
    // player 2 query
    res = await fetch(`https://www.balldontlie.io/api/v1/players?search=${f2}%20${l2}`)
    data = await res.json()

    if (data.data.length < 1) {
        document.querySelector('.card-2').style.display = `none`
        document.getElementById('no-player-2').style.display = 'block'
        document.getElementById('no-player-2').innerText = 'Player not found'
    } else {
        p2Id = data.data[0].id

        let first = data.data[0].first_name
        let last = data.data[0].last_name
        let team = data.data[0].team.full_name

        // show the current stats of specific player for the selected this season
        fetch(`https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${p2Id}`)
        .then(res => res.json())
        .then(data => {
            // if no available stats 
            if (data.data.length < 1) {
                document.querySelector('.card-2').style.display = `none`
                document.getElementById('no-player-2').style.display = 'block'
                document.getElementById('no-player-2').innerText = 'No available stats for the current season'
            } else {
                p2Ppg = data.data[0].pts
                p2Rpg = data.data[0].reb
                p2Apg = data.data[0].ast
                p2Gp = data.data[0].games_played

                p2Min = data.data[0].min
                p2Fgm = data.data[0].fgm
                p2Fga = data.data[0].fga
                p2FgPct = data.data[0].fg_pct

                // p1
                                
                p1Ppg = Number(p1Ppg)
                p1Rpg = Number(p1Rpg)
                p1Apg = Number(p1Apg)
                p1Gp = Number(p1Gp)
                
                p1Fgm = Number(p1Fgm)
                p1Fga = Number(p1Fga)

                // p2
                
                p2Ppg = Number(p2Ppg)
                p2Rpg = Number(p2Rpg)
                p2Apg = Number(p2Apg)
                p2Gp = Number(p2Gp)

                p2Fgm = Number(p2Fgm)
                p2Fga = Number(p2Fga)
                
                console.log(p1Ppg, p1Rpg, p1Apg, p1Gp, p1Min, p1Fgm, p1Fga, p1FgPct)
                console.log(p2Ppg, p2Rpg, p2Apg, p2Gp, p2Min, p2Fgm, p2Fga, p2FgPct)

                // points
                if(p1Ppg > p2Ppg) {
                    document.getElementById('p1-ppg').style.fontWeight = 'bold'
                } else if(p1Ppg == p2Ppg) {
                    document.getElementById('p1-ppg').style.fontWeight = 'bold'
                    document.getElementById('p2-ppg').style.fontWeight = 'bold'
                } else {
                    document.getElementById('p2-ppg').style.fontWeight = 'bold'
                }

                // rebounds
                if(p1Rpg > p2Rpg) {
                    document.getElementById('p1-rpg').style.fontWeight = 'bold'
                } else if(p1Rpg == p2Rpg) {
                    document.getElementById('p1-rpg').style.fontWeight = 'bold'
                    document.getElementById('p2-rpg').style.fontWeight = 'bold'
                } else {
                    document.getElementById('p2-rpg').style.fontWeight = 'bold'
                }

                // assists
                if(p1Apg > p2Apg) {
                    document.getElementById('p1-apg').style.fontWeight = 'bold'
                } else if(p1Apg == p2Apg) {
                    document.getElementById('p1-apg').style.fontWeight = 'bold'
                    document.getElementById('p2-apg').style.fontWeight = 'bold'
                } else {
                    document.getElementById('p2-apg').style.fontWeight = 'bold'
                }

                // games played
                if(p1Gp > p2Gp) {
                    document.getElementById('p1-fg').style.fontWeight = 'bold'
                }
                else if(p1Gp == p2Gp) {
                    document.getElementById('p1-fg').style.fontWeight = 'bold'
                    document.getElementById('p2-fg').style.fontWeight = 'bold'
                } else {
                    document.getElementById('p2-fg').style.fontWeight = 'bold'
                }

                // // min
                // if(p1Min < p2Min ) {
                //     document.getElementById('p1-min').style.fontWeight = 'bold'
                // } else if (p1Min == p2Min) {
                //     document.getElementById('p1-min').style.fontWeight = 'bold'
                //     document.getElementById('p2-min').style.fontWeight = 'bold'
                // } else {
                //     document.getElementById('p2-min').style.fontWeight = 'bold'
                // }

                // fgm
                if(p1Fgm > p2Fgm) {
                    document.getElementById('p1-fgm').style.fontWeight = 'bold'
                } else if(p1Fgm == p2Fgm) {
                    document.getElementById('p1-fgm').style.fontWeight = 'bold'
                    document.getElementById('p2-fgm').style.fontWeight = 'bold'
                } else {
                    document.getElementById('p2-fgm').style.fontWeight = 'bold'
                }

                // fga
                if(p1Fga > p2Fga) {
                    document.getElementById('p1-fga').style.fontWeight = 'bold'
                } else if(p1Fga == p2Fga) {
                    document.getElementById('p1-fga').style.fontWeight = 'bold'
                    document.getElementById('p2-fga').style.fontWeight = 'bold'
                } else {
                    document.getElementById('p2-fga').style.fontWeight = 'bold'
                }

                // fg-pct
                if(p1FgPct > p2FgPct) {
                    document.getElementById('p1-fg-pct').style.fontWeight = 'bold'
                } else if(p1FgPct == p2FgPct) {
                    document.getElementById('p1-fg-pct').style.fontWeight = 'bold'
                    document.getElementById('p2-fg-pct').style.fontWeight = 'bold'
                } else {
                    document.getElementById('p2-fg-pct').style.fontWeight = 'bold'
                }

                // console.log(data.data[0])
                // season stats

                document.getElementById('no-player-2').style.display = 'none'
                document.querySelector('.card-2').style.display = `block`
                document.getElementById('p2-name').textContent = `${first} ${last}`
                document.getElementById('p2-team').textContent = `${team}`
                document.getElementById('p2-ppg').textContent = data.data[0].pts.toFixed(1)
                document.getElementById('p2-rpg').textContent = data.data[0].reb.toFixed(1)
                document.getElementById('p2-apg').textContent = data.data[0].ast.toFixed(1)
                document.getElementById('p2-fg').textContent = data.data[0].games_played

                document.getElementById('p2-min').textContent = data.data[0].min
                document.getElementById('p2-fgm').textContent = data.data[0].fgm.toFixed(1)
                document.getElementById('p2-fga').textContent = data.data[0].fga.toFixed(1)
                document.getElementById('p2-fg-pct').textContent = (data.data[0].fg_pct * 100).toFixed(1)
            }
        })
        .catch(error => {
            console.log(error)
        })
    }    
}

async function getNextGame(id) {
    // get the date for the next day
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    // console.log(tomorrow.getMonth(), tomorrow.getDate(), tomorrow.getFullYear())

    res = await fetch(`https://www.balldontlie.io/api/v1/games?seasons[]=2020&team_ids[]=${id}&dates[]=%27${today.getMonth() + 1}-${today.getDate()}-${today.getFullYear()}%27`)
    data = await res.json()

    console.log(data.data)

    if(data.data.length == 0) {
        let container = ''
        container += `
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="row">
                <div class="col-12 d-flex justify-content-center">
                    <h3>No upcoming game</h3>
                </div>
            </div>
        </div>
        `
        document.getElementById('team-modal').innerHTML = container
    } else {
        let monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        let date = new Date(data.data[0].date)
        let container = ''        
        container += `
        <div class="modal-header">
            <strong>${data.data[0].home_team.id == id ? data.data[0].home_team.full_name : data.data[0].visitor_team.full_name}</strong>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="row">
                <div class="col-md-12 col-12 d-flex align-items-center justify-content-center">
                    <img style="width: 140px; height: 100%;" src="img/${data.data[0].home_team.id != id ? data.data[0].home_team.id : data.data[0].visitor_team.id}.svg" alt="">
                
                    <div class="ml-5 pt-3">
                        <h3 class="d-block"><strong>${monthNames[date.getMonth()]}</strong> ${date.getDate() + 1}, ${date.getFullYear()}</h3>
                        <h4 class="d-block">${data.data[0].home_team.id != id ? "@" : "VS"} <strong>${data.data[0].home_team.id != id ? data.data[0].home_team.full_name : data.data[0].visitor_team.full_name}</strong></h4>
                        <p id="opponent-conference">${data.data[0].home_team.id != id ? data.data[0].home_team.conference : data.data[0].visitor_team.conference}ern Conference</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <div class="col-12 d-flex justify-content-center">                
                <p><strong>${data.data[0].status}</strong> ${data.data[0].time == "" ? "" : `- ${data.data[0].time}`}</p>
            </div>
        </div>
        `
        document.getElementById('team-modal').innerHTML = container
    }
}

async function showTeams() {
    res = await fetch('https://www.balldontlie.io/api/v1/teams')
    data = await res.json()
    let container = ''
    let container2 = ''

    // eastern conference
    data.data.filter(x => x.conference == 'East').map(x => {
        container2 += `
        <div class="d-flex shadow flex-column justify-content-center mb-4 team-card-style">
            <img class="d-block team-image" src="img/${x.id}.svg" alt="">
            <p class="text-center" style="font-weight: 600; font-size: 16px; margin-bottom: 4px;">${x.full_name}</p>
            <p class="text-center" style="color: ${x.conference == 'West' ? '#17408b' : '#c9082a'}; font-weight: 600; font-size: 14px; margin-bottom: 4px;">${x.conference}</p>
            <p class="text-center" style="font-weight: 600; font-size: 11px; margin-bottom: 4px;">${x.division} Division</p>

            <a onclick="getNextGame(${x.id})" data-toggle="modal" data-target="#exampleModal" class="text-center" style="font-size: 11px; color: #17408b; text-decoration: underline">Next game</a>
        </div>
        `
    })

    // western conference
    data.data.filter(x => x.conference == 'West').map(x => {
        container += `
        <div class="d-flex shadow flex-column justify-content-center mb-4 team-card-style">
            <img class="d-block team-image" src="img/${x.id}.svg" alt="">
            <p class="text-center" style="font-weight: 600; font-size: 16px; margin-bottom: 4px;">${x.full_name}</p>
            <p class="text-center" style="color: ${x.conference == 'West' ? '#17408b' : '#c9082a'}; font-weight: 600; font-size: 14px; margin-bottom: 4px;">${x.conference}</p>
            <p class="text-center" style="font-weight: 600; font-size: 11px; margin-bottom: 4px;">${x.division} Division</p>

            <a onclick="getNextGame(${x.id})" data-toggle="modal" data-target="#exampleModal" class="text-center next-game-button" style="font-size: 11px; color: #17408b; text-decoration: underline">Next game</a>
        </div>
        `
    })
    
    if(document.getElementById('teams-row') != null) {
        document.getElementById('teams-row').innerHTML += container
    }

    if(document.getElementById('teams-row-2') != null) {
        document.getElementById('teams-row-2').innerHTML += container2
    }
}