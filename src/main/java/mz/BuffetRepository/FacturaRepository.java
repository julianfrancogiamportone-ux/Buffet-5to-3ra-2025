package mz.BuffetRepository;

import mz.BuffetEntity.Factura;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FacturaRepository extends JpaRepository<Factura, Long> {
    
}