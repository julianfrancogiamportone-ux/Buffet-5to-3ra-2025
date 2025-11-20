package mz.BuffetRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import mz.BuffetEntity.Pedido; 

public interface PedidoRepository extends JpaRepository<Pedido, Integer> {
    
}