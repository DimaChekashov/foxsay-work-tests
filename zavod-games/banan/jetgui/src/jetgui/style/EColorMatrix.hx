package jetgui.style;

enum EColorMatrix {

	Matrix(r0: Float, r1: Float, r2: Float, r3: Float, g0: Float, g1: Float, g2: Float, g3: Float, b0: Float, b1: Float, b2: Float, b3: Float);
	Grayscale(val: Float); 
	Glow(val: Float); 
	ColorFill(r: Float, g: Float, b: Float, ?opacity: Float);
	Ghostify(val: Float);
}