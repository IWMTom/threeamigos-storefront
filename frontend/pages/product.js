import SingleProduct from "../components/SingleProduct";

const Product = props => (
	<section id="product">
		<SingleProduct slug={props.query.slug} />
	</section>
);

export default Product;
