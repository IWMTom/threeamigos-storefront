const Modal = ({ styleClass, handleClose, show, children }) => (
	<div id="modal" className={(show ? "show " : "") + styleClass}>
		<div id="close" onClick={handleClose} />
		<div id="modal-content" className="card">
			{children}
		</div>
	</div>
);

export default Modal;
