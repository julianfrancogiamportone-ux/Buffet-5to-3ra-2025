package mz.BuffetIService;

import java.util.List;
import java.util.Optional;

import mz.BuffetEntity.Factura;

public interface IFacturaService {
    
    Factura save1(Factura factura);
    
    List<Factura> findAll();
    
    Optional<Factura> findById(Long id);

	mz.BuffetEntity.Factura save(mz.BuffetEntity.Factura factura);
   
}