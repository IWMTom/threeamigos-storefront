import SingleBrand from "../components/SingleBrand";

const Brand = props => (
	<section id="brand">
		<SingleBrand slug={props.query.slug} />
	</section>
);

export default Brand;
