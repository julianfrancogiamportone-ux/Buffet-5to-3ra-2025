package mz.BuffetEntity;




import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;


@Entity

public class carrito {
   
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private int cantidad;
	private int subtotal;
	@ManyToOne
	@JoinColumn (name = "Producto_id")
	private Producto producto;
	public carrito() {
		super();
	}
	public carrito(int cantidad, int subtotal, mz.BuffetEntity.Producto producto) {
		super();
		this.cantidad = cantidad;
		this.subtotal = subtotal;
		this.producto = producto;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public int getCantidad() {
		return cantidad;
	}
	public void setCantidad(int cantidad) {
		this.cantidad = cantidad;
	}
	public int getSubtotal() {
		return subtotal;
	}
	public void setSubtotal(int subtotal) {
		this.subtotal = subtotal;
	}
	public Producto getProducto() {
		return producto;
	}
	public void setProducto(Producto producto) {
		this.producto = producto;
	}
	
	
}