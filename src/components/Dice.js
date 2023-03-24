export default function Dice({value, holdDice, isHeld}) {
	const styles = {
		backgroundColor: isHeld? '#59E391' : '#FFF'
	}
	return (
		<div onClick={holdDice} className="dice" style={styles}>
			<h2 className="die-num">{value}</h2>
		</div>
	)
}