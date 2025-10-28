package mz.BuffetRepository;

import mz.BuffetService.FacturaService;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FacturaRepository extends JpaRepository<FacturaService, Long> {
    
}