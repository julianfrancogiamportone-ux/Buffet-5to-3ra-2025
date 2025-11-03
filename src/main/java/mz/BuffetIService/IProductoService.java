package mz.BuffetIService;

import mz.BuffetEntity.Producto;
import java.util.List;
import java.util.Optional;

public interface IProductoService {
    
    Producto save(Producto producto);
    
    List<Producto> findAll();
    
    Optional<Producto> findById(Long id);
   
}