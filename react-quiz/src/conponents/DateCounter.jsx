import React, { useReducer } from "react";

const initialState = { step: 1, count: 0 };

function reducer(state, action) {
	console.log(state, action);
	switch (action.type) {
		case "dec":
			return { ...state, count: state.count - state.step };
		case "ins":
			return { ...state, count: state.count + state.step };
		case "setCount":
			return { ...state, count: action.payload };
		case "setStep":
			return { ...state, step: action.payload };
		case "reset":
			return initialState;
		default:
			throw new Error("unknown action type");
	}
}

export default function DateCounter() {
	const [state, dispatch] = useReducer(reducer, initialState);

	function handleReset() {
		dispatch({ type: "reset" });
	}

	const date = new Date("june 21 2027");
	date.setDate(date.getDate() + state.count);

	const dec = () => {
		dispatch({ type: "dec" });
	};

	const ins = () => {
		dispatch({ type: "ins" });
	};

	const defineCount = (e) => {
		dispatch({ type: "setCount", payload: Number(e.target.value) });
	};

	const defineStep = (e) => {
		dispatch({ type: "setStep", payload: Number(e.target.value) });
	};

	return (
		<div>
			<div>
				<input
					type="range"
					min="0"
					max="10"
					value={state.step}
					onChange={defineStep}
				/>
				<span>Step: {state.step}</span>
			</div>

			<div>
				<button onClick={dec}>-</button>
				<input
					type="number"
					value={state.count}
					onChange={defineCount}
				/>
				<button onClick={ins}>+</button>
			</div>

			<p>
				<span>
					{state.count === 0
						? "Today is "
						: state.count > 0
						? `${state.count} days from today is `
						: `${Math.abs(state.count)} days ago was `}
				</span>
				<span>{date.toDateString()}</span>
			</p>

			{state.count !== 0 || state.step !== 1 ? (
				<div>
					<button onClick={handleReset}>Reset</button>
				</div>
			) : null}
		</div>
	);
}
