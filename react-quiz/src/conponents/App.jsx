import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import Finished from "./Finished";

const initialState = {
	questions: [],
	// loading, error, ready, active, finished
	status: "loading",
	index: 0,
	answer: null,
	points: 0,
	highestPoints: 0,
};

function reducer(state, action) {
	switch (action.type) {
		case "dataReceived":
			return { ...state, questions: action.payload, status: "ready" };
		case "fetchingFailed":
			return { ...state, status: "error" };
		case "start":
			return { ...state, status: "active" };
		case "newAnswer":
			const question = state.questions.at(state.index);
			return {
				...state,
				answer: action.payload,
				points:
					action.payload === question.correctOption
						? state.points + question.points
						: state.points,
			};
		case "nextQuestion":
			return { ...state, index: state.index + 1, answer: null };
		case "finished":
			return {
				...state,
				status: "finished",
				highestPoints:
					state.points > state.highestPoints
						? state.points
						: state.highestPoints,
			};
		default:
			throw new Error("Action Unknown");
	}
}

export default function App() {
	const [
		{ questions, status, index, answer, points, highestPoints },
		dispatch,
	] = useReducer(reducer, initialState);
	const numQuestions = questions.length;
	const maxPossiblePoints = questions.reduce(
		(sum, cur_item) => (sum += cur_item.points),
		0
	);

	const handleStart = () => {
		dispatch({ type: "start" });
	};

	useEffect(() => {
		fetch("http://localhost:8000/questions")
			.then((res) => res.json())
			.then((data) => dispatch({ type: "dataReceived", payload: data }))
			.catch((err) => dispatch({ type: "fetchingFailed" }));
	}, []);

	return (
		<div className="app">
			<Header />
			<Main>
				{status === "loading" && <Loader />}
				{status === "error" && <Error />}
				{status === "ready" && (
					<StartScreen
						numQuestions={numQuestions}
						onHandleStart={handleStart}
					/>
				)}
				{status === "active" && (
					<>
						<Progress
							index={index}
							length={questions.length}
							points={points}
							maxPoints={maxPossiblePoints}
						/>
						<Question
							question={questions[index]}
							dispatch={dispatch}
							answer={answer}
						/>
						<NextButton
							dispatch={dispatch}
							answer={answer}
							index={index}
							numQuestions={numQuestions}
						/>
					</>
				)}
				{status === "finished" && (
					<>
						<Finished
							points={points}
							maxPossiblePoints={maxPossiblePoints}
							highestPoints={highestPoints}
						/>
					</>
				)}
			</Main>
		</div>
	);
}
