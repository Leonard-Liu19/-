import Option from "./Option";

function Question({ question }) {
	return (
		<div>
			<h4>{question.question}</h4>
			<Option options={question.options} />
		</div>
	);
}

export default Question;
