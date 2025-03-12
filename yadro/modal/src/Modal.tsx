function Modal({isShow, handleShow}) {
	return (
		<div className={`modal ${isShow ? "show" : ""}`}>
			<h2>Modal</h2>
			<button type="button" onClick={handleShow}>OK</button>
		</div>
	)
}

export default Modal;
