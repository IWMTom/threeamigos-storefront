const ProductSort = props => (
	<div id="products-sorting">
		<div className="products-sorting-inputs">
			<div className="horizontal-radio">
				<input
					id="name_ASC"
					name="sort_type"
					type="radio"
					checked={props.sort_type === "name_ASC"}
					onChange={props.updateValue}
				/>
				<label htmlFor="name_ASC" className="radio-label">
					<span>Name - A to Z</span>
				</label>
			</div>
			<div className="horizontal-radio">
				<input
					id="name_DESC"
					name="sort_type"
					type="radio"
					checked={props.sort_type === "name_DESC"}
					onChange={props.updateValue}
				/>
				<label htmlFor="name_DESC" className="radio-label">
					<span>Name - Z to A</span>
				</label>
			</div>
			<div className="horizontal-radio">
				<input
					id="price_ASC"
					name="sort_type"
					type="radio"
					checked={props.sort_type === "price_ASC"}
					onChange={props.updateValue}
				/>
				<label htmlFor="price_ASC" className="radio-label">
					<span>Price - Low to High</span>
				</label>
			</div>
			<div className="horizontal-radio">
				<input
					id="price_DESC"
					name="sort_type"
					type="radio"
					checked={props.sort_type === "price_DESC"}
					onChange={props.updateValue}
				/>
				<label htmlFor="price_DESC" className="radio-label">
					<span>Price - Low to High</span>
				</label>
			</div>
			<div className="horizontal-radio">
				<input
					id="sale_DESC"
					name="sort_type"
					type="radio"
					checked={props.sort_type === "sale_DESC"}
					onChange={props.updateValue}
				/>
				<label htmlFor="sale_DESC" className="radio-label">
					<span>On Sale</span>
				</label>
			</div>
		</div>
	</div>
);

export default ProductSort;
