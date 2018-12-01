const SideNavCategory = ({ category }) => (
	<article>
		<h2>
			<i className={category.icon} />
			<span>{category.name}</span>
		</h2>
		<a href="#">Subcategory</a>
		<a href="#">Subcategory</a>
		<a href="#">Subcategory</a>
		<a href="#">Subcategory</a>
	</article>
);

export default SideNavCategory;
