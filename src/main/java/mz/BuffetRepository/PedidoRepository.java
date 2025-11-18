package mz.BuffetRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import mz.BuffetEntity.Pedido; 

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Integer> {
    
}