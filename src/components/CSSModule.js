import mystyle from "../CSSModule.module.css";
import classNames from "classnames/bind";

const cn = classNames.bind(mystyle);

export default function CSSModule() {
	return (
		<div className={cn("wrapper", "border")}>
			<div className={cn("wrapper")}>
				hello, it is me,, <span className="text">CSS MODULE!</span>
			</div>
		</div>
	);
}
