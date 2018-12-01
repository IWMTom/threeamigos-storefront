import React from "react";
import Newsletter from "./Newsletter";

const Footer = () => (
	<footer>
		<section id="footer-top">
			<div className="container">
				<div className="pure-g">
					<div className="pure-u-1-4">
						<h2>Company</h2>
						<a href="#">About Us</a>
						<a href="#">Careers</a>
					</div>
					<div className="pure-u-1-4">
						<h2>Support</h2>
						<a href="#">FAQs</a>
						<a href="#">Terms of Use</a>
						<a href="#">Privacy Policy</a>
					</div>
					<div className="pure-u-1-4">
						<h2>Contact Us</h2>
						<span>hello@threeamigos.co</span>
						<span>
							G0.38, Greig Building,
							<br />
							Teesside University, TS1 3EZ
						</span>
						<a
							href="https://www.youtube.com/watch?v=ab8GtuPdrUQ"
							className="easter-egg"
						>
							0118 999 881 999 119 7253
						</a>
					</div>
					<div className="pure-u-1-4">
						<Newsletter />
					</div>
				</div>
			</div>
		</section>
		<section id="footer-bottom" className="container">
			<h1>Three Amigos</h1>
			<span>&copy; 2018 Three Amigos Corp.</span>
		</section>
	</footer>
);

export default Footer;
