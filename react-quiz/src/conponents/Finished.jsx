function Finished({ points, maxPossiblePoints, highestPoints }) {
	const percentage = (points / maxPossiblePoints) * 100;
	return (
		<div>
			<p className="result">
				You scored {points} out of {maxPossiblePoints},(
				{Math.ceil(percentage)}%)
			</p>
			<p className="highScore">Highest Score: {highestPoints}</p>
		</div>
	);
}

export default Finished;
