import SingleCategory from "../components/SingleCategory";

const Category = props => (
	<section id="category">
		<SingleCategory slug={props.query.slug} />
	</section>
);

export default Category;
