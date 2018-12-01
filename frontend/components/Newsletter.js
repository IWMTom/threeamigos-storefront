import React from "react";

const Newsletter = () => (
	<React.Fragment>
		<h2>Newsletter</h2>
		<span>
			Subscribe to our newsletter and get some dodgy deals every
			now and then
		</span>
		<div id="newsletter-input">
			<input type="email" placeholder="Enter your e-mail here" />
			<button>
				<i className="ic_newsletter" />
			</button>
		</div>
	</React.Fragment>
);

export default Newsletter;
