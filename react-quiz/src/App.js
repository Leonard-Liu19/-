import { useReducer } from "react";
import Header from "./Header";
import Main from "./Main";

const initialState = {
	questions: [],
	status: "pending",
};

function reducer(state, action) {}

export default function App() {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<div className="app">
			<Header />
			<Main>
				<p>1/15</p>
				<p>Question?</p>
			</Main>
		</div>
	);
}
