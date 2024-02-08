function Progress({ length, index, points, maxPoints }) {
	return (
		<header className="progress">
			<progress type="progress" max={length} value={index + 1}>
				{`${index / length}%`}
			</progress>
			<p>
				Question {index}/{length}
			</p>
			<p>
				{points}/{maxPoints}
			</p>
		</header>
	);
}

export default Progress;
