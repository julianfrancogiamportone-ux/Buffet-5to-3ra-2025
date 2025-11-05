package mz.BuffetEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import java.math.BigDecimal; 
import java.time.LocalDateTime; 

@Entity
@Table(name = "facturas")

public class Factura {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
   
    //@JoinColumn(name = "pedido_id")
    private Pedido pedido; 

    private BigDecimal total; 
    
    private String metodoPago; 

    private LocalDateTime fechaEmision; 
    
    public Factura() {
        super();
    }
    
    public Factura(Pedido pedido, BigDecimal total, String metodoPago, LocalDateTime fechaEmision) {
        super();
        this.pedido = pedido;
        this.total = total;
        this.metodoPago = metodoPago;
        this.fechaEmision = fechaEmision;
    }
    
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Pedido getPedido() {
        return pedido;
    }

    public void setPedido(Pedido pedido) {
        this.pedido = pedido;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public String getMetodoPago() {
        return metodoPago;
    }

    public void setMetodoPago(String metodoPago) {
        this.metodoPago = metodoPago;
    }

    public LocalDateTime getFechaEmision() {
        return fechaEmision;
    }

    public void setFechaEmision(LocalDateTime fechaEmision) {
        this.fechaEmision = fechaEmision;
    }
}
