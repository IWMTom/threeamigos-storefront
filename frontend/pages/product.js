import SingleProduct from "../components/SingleProduct";

const Product = props => (
	<div className="container">
		<section id="product">
			<SingleProduct slug={props.query.slug} />
		</section>
	</div>
);

export default Product;
