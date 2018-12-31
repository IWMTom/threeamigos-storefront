const ProductHeader = props => (
	<div class="page-header">
		<div className="container">
			<h1>
				<i className={props.icon ? props.icon : "ic_bookmark"} />
				<span>{props.title}</span>
			</h1>
		</div>
	</div>
);

export default ProductHeader;
