import { Link } from "../routes";
import formatMoney from "../lib/formatMoney";

const ProductCard = ({ product }) => (
	<div className="pure-u-1-3">
		<Link route="product" params={{ slug: product.slug }}>
			<a className="card product">
				<img src={product.image_url} alt={product.name} />
				<span>{product.name}</span>
				<h3>{formatMoney(product.price)}</h3>
			</a>
		</Link>
	</div>
);

export default ProductCard;
