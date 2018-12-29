import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Link } from "../routes";
import formatMoney from "../lib/formatMoney";

const FilteredProductCard = ({ product }) => (
	<Link route="product" params={{ slug: product.slug }} key={product.id}>
		<a className={product.sale ? "product card sale" : "product card"}>
			{product.sale && <span className="product-sale">Sale 50%</span>}
			<div className="pure-g">
				<div className="pure-u-1-4">
					<img src={product.image_url} />
				</div>
				<div className="product-content pure-u-3-4">
					<h2>{product.name}</h2>
					<span>
						<i className={product.category.icon} />
						{product.category.name}
					</span>
					<span>
						<i className="ic_bookmark" />
						{product.brand.name}
					</span>
					<p>{product.description}</p>
					<aside>
						<i
							className={
								product.stock === 0
									? "badge badge-grey"
									: product.sale
									? "badge badge-pink"
									: "badge badge-green"
							}
						>
							{product.stock === 0 ? "Out of Stock" : "In Stock"}
						</i>

						<span>
							{product.sale && (
								<del>{formatMoney(product.price * 2)}</del>
							)}
							{formatMoney(product.price)}
						</span>
					</aside>
				</div>
			</div>
		</a>
	</Link>
);

export default FilteredProductCard;
