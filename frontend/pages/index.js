import Hero from '../components/Hero'
import SideNav from '../components/SideNav'
import PopularBrands from '../components/PopularBrands'
import PopularProducts from '../components/PopularProducts'

const Home = props => (
	<section id="home">
		<Hero />

		<div className="pure-g">
			<SideNav />

			<section id="home-content" className="pure-u-3-4">
				<section id="popular-brands">
					<PopularBrands />
				</section>
				<section id="popular-products">
					<PopularProducts />
				</section>
			</section>
		</div>
	</section>
)

export default Home