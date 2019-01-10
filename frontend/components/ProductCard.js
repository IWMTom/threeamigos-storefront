import { Link } from "../routes";
import formatMoney from "../lib/formatMoney";

const ProductCard = ({ product }) => (
	<div className="pure-u-1-3">
		<Link route="product" params={{ slug: product.slug }}>
			<a className={product.sale ? "card product sale" : "card product"}>
				{product.sale && <span className="product-sale">Sale 50%</span>}
				<img src={product.image_url} alt={product.name} />
				<span id="name">{product.name}</span>
				<h3 id="price">{formatMoney(product.price)}</h3>
			</a>
		</Link>
	</div>
);

export default ProductCard;
