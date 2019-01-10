import React from "react";
import Link from "next/link";
import NProgress from "nprogress";
import Router from "next/router";
import Navbar from "./Navbar";
import User from "./User";
import { Mutation } from "react-apollo";
import { TOGGLE_CART_MUTATION } from "./Cart";

Router.onRouteChangeStart = () => {
	NProgress.start();
};

Router.onRouteChangeComplete = () => {
	NProgress.done();
};

Router.onRouteChangeError = () => {
	NProgress.done();
};

const Header = () => (
	<User>
		{({ data: { me } }) => (
			<header>
				<div id="header-top">
					<h1>
						<Link href="/">
							<a>Three Amigos</a>
						</Link>
					</h1>
					<div id="header-top-menu">
						{me && (
							<Mutation mutation={TOGGLE_CART_MUTATION}>
								{toggleCart => (
									<button id="cart" onClick={toggleCart}>
										<i className="ic_shopping_cart" />
										<span>
											Cart{" "}
											<em className="small-badge">
												{me.cart.length}
											</em>
										</span>
									</button>
								)}
							</Mutation>
						)}
						<Link href="/profile">
							<a id="profile">
								{me && <img src={me.photo_url} alt="Profile" />}
								{!me && (
									<img
										src="http://placehold.it/100x100"
										alt="Profile"
									/>
								)}
							</a>
						</Link>
					</div>
				</div>
				<Navbar />
			</header>
		)}
	</User>
);

export default Header;
