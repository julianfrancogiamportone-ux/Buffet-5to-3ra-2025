package mz.BuffetEscolar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import mz.BuffetEscolar.entity.Pedido; 

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Integer> {
    
}