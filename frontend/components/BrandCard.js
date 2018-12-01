import { Link } from "../routes";

const BrandCard = ({ brand }) => (
	<div className="pure-u-1-2">
		<Link route="brand" params={{ slug: brand.slug }}>
			<a className="card brand">
				<img src={brand.image_url} alt={brand.name} />
			</a>
		</Link>
	</div>
);

export default BrandCard;
