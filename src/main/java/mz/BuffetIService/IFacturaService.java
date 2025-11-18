package mz.BuffetIService;

import java.util.List;
import java.util.Optional;

import mz.BuffetEntity.Factura;

public interface IFacturaService {
    
    public List<Factura> findAll();
    public Factura save(Factura factura);
    public Optional<Factura>findById(Long id);
}