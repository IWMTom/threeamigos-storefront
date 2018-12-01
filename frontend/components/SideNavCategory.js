import Link from "next/link";

class SideNavCategory extends React.Component {
	render() {
		const category = this.props.category;

		// reduces all brands from category products and removes duplicates
		const brands = category.products
			.reduce((total, { brand }) => {
				total.push(brand);
				return total;
			}, [])
			.filter((elem, pos, arr) => {
				return arr.indexOf(elem) == pos;
			});

		return (
			<article>
				<h2>
					<i className={category.icon} />
					<span>{category.name}</span>
				</h2>

				{brands.map(brand => (
					<Link
						href={{
							pathname: "/products",
							query: {
								category: category.slug,
								brand: brand.slug
							}
						}}
					>
						<a>{brand.name}</a>
					</Link>
				))}
			</article>
		);
	}
}

export default SideNavCategory;
