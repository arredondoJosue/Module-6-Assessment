const express = require('express')
const path = require('path')
const app = express()
const {bots, playerRecord} = require('./data')
const {shuffleArray} = require('./utils')

app.use(express.json())


// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: 'fcf01a8e87dc4bd88b0530c87497576e',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.use(express.static(path.join(__dirname, './public')))

app.get('/api/robots', (req, res) => {
    try {
        res.status(200).send(botsArr)
    } catch (error) {
        rollbar.critical('Getting Bots button broke af')
        console.log('ERROR GETTING BOTS', error)
        res.sendStatus(400)
    }
})

app.get('/api/robots/five', (req, res) => {
    try {
        let shuffled = shuffleArray(bots)
        let choices = shuffled.slice(0, 5)
        let compDuo = shuffled.slice(6, 8)
        rollbar.log('5 bots were successfully selected to be used as slaves')
        res.status(200).send({choices, compDuo})
    } catch (error) {
        rollbar.critical('Getting five Bots button broke af. Fix it')
        console.log('ERROR GETTING FIVE BOTS', error)
        res.sendStatus(400)
    }

    try {
        rollbar.log('testing')
    } catch (error) {
        rollbar.error('this is a test error')
        rollbar.critical('this is a test critical error')
        rollbar.warning('this is a test warning error')
    }
})

app.post('/api/duel', (req, res) => {
    try {
        // getting the duos from the front end
        let {compDuo, playerDuo} = req.body

        // adding up the computer player's total health and attack damage
        let compHealth = compDuo[0].health + compDuo[1].health
        let compAttack = compDuo[0].attacks[0].damage + compDuo[0].attacks[1].damage + compDuo[1].attacks[0].damage + compDuo[1].attacks[1].damage
        
        // adding up the player's total health and attack damage
        let playerHealth = playerDuo[0].health + playerDuo[1].health
        let playerAttack = playerDuo[0].attacks[0].damage + playerDuo[0].attacks[1].damage + playerDuo[1].attacks[0].damage + playerDuo[1].attacks[1].damage
        
        rollbar.log(playerAttack)
        // calculating how much health is left after the attacks on each other
        let compHealthAfterAttack = compHealth - playerAttack
        let playerHealthAfterAttack = playerHealth - compAttack

        rollbar.log(compHealthAfterAttack)
        // comparing the total health to determine a winner
        if (compHealthAfterAttack > playerHealthAfterAttack) {
            playerRecord.losses++
            rollbar.log(playerRecord.losses)
            rollbar.log('Player lost')
            res.status(200).send('You lost!')

        } else {
            playerRecord.wins++
            rollbar.log('Player won')
            rollbar.log(playerRecord.wins)
            res.status(200).send('You won!')
        }
    } catch (error) {
        console.log('ERROR DUELING', error)
        rollbar.critical('Player blew up')
        res.sendStatus(400)
    }

    try {
        rollbar.log('testing')
    } catch (error) {
        rollbar.error('this is a test error')
        rollbar.critical('this is a test critical error')
        rollbar.warning('this is a test warning error')
    }
})

app.get('/api/player', (req, res) => {
    try {
        rollbar.log(playerRecord)
        res.status(200).send(playerRecord)
    } catch (error) {
        console.log('ERROR GETTING PLAYER STATS', error)
        rollbar.warning('player record not displaying')
        res.sendStatus(400)
    }

    try {
        rollbar.log('testing')
    } catch (error) {
        rollbar.error('this is a test error')
        rollbar.critical('this is a test critical error')
        rollbar.warning('this is a test warning error')
    }
})

try {
    rollbar.log('testing')
} catch (error) {
    rollbar.error('this is a test error')
    rollbar.critical('this is a test critical error')
    rollbar.warning('this is a test warning error')
}

rollbar.log('testing')
rollbar.error('this is a test error')
rollbar.critical('this is a test critical error')
rollbar.warning('this is a test warning error')

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})