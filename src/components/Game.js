import { useEffect, useState } from 'react';
import Dice from "./Dice"
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

export default function Game() {
	const [dice, setDice] = useState(allNewDice())
	const [tenzies, setTenzies] = useState(false)
	const [rollCount, setRollCount] = useState(1)
	const [showOops, setShowOops] = useState(false)
	const [reset, setReset] = useState(false)

	function generateNewDice() {
		return {
			value: Math.ceil(Math.random() * 6),
				isHeld: false,
				id: nanoid()
		}
	}

	useEffect(() => {
		const allHeld = dice.every(die => die.isHeld)
		const allSameValue = dice.every((die, i, arr) => die.value === arr[0].value)
		if (allHeld && allSameValue) {
            setTenzies(true)
			setShowOops(false)
			setReset(false)
        } else if (allHeld && !allSameValue) {
			setShowOops(true)
			setReset(true)
			setTenzies(false)
		}
	}, [dice])

	function allNewDice() {
		const newDice = [];
		for (let i = 0; i < 10; i++) {
			newDice.push(generateNewDice())
		}
		return newDice
	}

	const diceElement = dice.map(die => (
		<Dice value={die.value} key={die.id} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />
	))

	

	function rollDice() {
		if (!tenzies && !reset) {
			setRollCount (rollCount + 1);
			setDice(oldDice => oldDice.map(die => {
				return die.isHeld ?
				die :
				generateNewDice()
			}))
		} else {
			setTenzies(false)
			setReset(false)
			setShowOops(false)
			setRollCount(1)
			setDice(allNewDice())
		}
	}

	function holdDice(id) {
		setDice(oldDice => oldDice.map(die => {
			return die.id === id ?
				{ ...die, isHeld: !die.isHeld } : die
		}))
	}

	return (
		<main>
			<div className="frame">
				<h2 className="title">Get Ten</h2>
				<p className="instructions">Roll until all dice are the same.  Click each die to freeze it at its current value between rolls.</p>
				<div className="dice-container">
					{diceElement}
				</div>
				<button className="roll-button" onClick={rollDice}>{!tenzies && !reset ? 'Roll' : 'New Game'}</button>
				<div>Attempts: {rollCount} </div>
			</div>
			{tenzies && <Confetti  gravity={.3} wind={.03}/>}
			{showOops && <img src={require("../images/embarrassed-emoji.jpg")} style={{width: '60px', top: '23%', left:'25%', position: 'absolute'}} alt="Oops, you didn't get all of them right." />}
			
		</main>
	)
}