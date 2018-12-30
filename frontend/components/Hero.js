import React from "react";
import { Link } from "../routes";

const Hero = () => (
	<div id="hero">
		<h1>Half price sale - now live!</h1>

		<Link route="products">
			<a className="btn btn-pink">Shop Now</a>
		</Link>
	</div>
);

export default Hero;
