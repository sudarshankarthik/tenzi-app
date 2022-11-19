import './App.css';
import Dice from './Dice';
import React from 'react';
import {nanoid} from 'nanoid'

function App() {


  const [dice,setDice] = React.useState(setNewDice)
  const [score,setScore] = React.useState(100)
  const [rollCount,setRoleCount] = React.useState(0)
  const [highScore,setHighScore] = React.useState(0)

  const [win, setWin] = React.useState(false)
  React.useEffect(() => {
    console.log("Dice state changed") 
    const isEqual = dice.every(die => die.value === dice[0].value)
    if(isEqual) {
      setWin(true)
      setScore(100)
      setRoleCount(0)
      if(score > highScore)
        setHighScore(score)
    }
    
    
  }, [dice])

  function setNewDice() {
    const newDice = []
    for (let i = 0;i<8;i++){
      newDice.push(
        {
          "value" : Math.floor(Math.random()*6) + 1,
          "isHeld" : false,
          "id" : nanoid()
        }
      )
    }
    return newDice
  }

  function onRole() {
    setScore(oldScore => oldScore-1*rollCount)
    setRoleCount(oldCount => oldCount+1)
    setDice(oldDice => oldDice.map(
      die => {
        return die.isHeld ? die : {...die,value: Math.floor(Math.random()*6)+1}
      }
    ))
  }

  function reStart() {
    setDice(setNewDice())
    setWin(false)
  }

  function onHold(id) {
    setDice(oldDice => oldDice.map(
      die => {
        return die.id === id ? {...die,isHeld: !die.isHeld} : die
      }
    ))
  }

  const diceElement = dice.map(
    die => 
            <Dice key = {die.id} 
                  value={die.value}  
                  isHeld = {die.isHeld} 
                  hold = {() => onHold(die.id)}
            />)


  return (
    <main>
      {<h2>HighScore is {highScore}</h2>}
      <h2>Score is {score}</h2>
      {win && <h2>You Won</h2> }
      <div className='diceSection'>
        {diceElement}
      </div>

      {!win && <button onClick={onRole} className='Roll-Btn'>Roll</button>} 

      {win && <button onClick={reStart} className='Roll-Btn'>Restart</button>} 
      
    </main>
  );
}

export default App;
