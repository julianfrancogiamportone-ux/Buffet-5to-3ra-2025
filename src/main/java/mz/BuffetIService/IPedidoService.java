package mz.BuffetIService;

import java.util.List;
import java.util.Optional;
import mz.BuffetEntity.Pedido;

public interface IPedidoService {
    
    public List<Pedido> findAll();
    public Pedido save(Pedido pedido);
    public Optional<Pedido> findById(Integer id);
}