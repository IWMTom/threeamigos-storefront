import React from "react";
import Link from "next/link";
import NProgress from "nprogress";
import Router from "next/router";
import Navbar from "./Navbar";

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
	<header>
		<div id="header-top">
			<h1>
				<Link href="/">
					<a>Three Amigos</a>
				</Link>
			</h1>
			<div id="header-top-menu">
				<Link href="/cart">
					<a id="cart">
						<i className="ic_shopping_cart" />
						<span>Cart</span>
					</a>
				</Link>
				<Link href="/profile">
					<a id="profile">
						<img
							src="/static/img/profile_photo.jpg"
							alt="Profile"
						/>
					</a>
				</Link>
			</div>
		</div>
		<Navbar />
	</header>
);

export default Header;
