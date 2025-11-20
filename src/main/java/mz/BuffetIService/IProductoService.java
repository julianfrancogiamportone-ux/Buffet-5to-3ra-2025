package mz.BuffetIService;

import mz.BuffetEntity.Producto;
import java.util.List;
import java.util.Optional;

public interface IProductoService {
    
    public Producto save(Producto producto);
    
    public List<Producto> findAll();
    
    public Optional<Producto> findById(Long id);
   
}