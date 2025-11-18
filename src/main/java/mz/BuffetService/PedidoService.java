package mz.BuffetService;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import mz.BuffetEntity.Pedido;
import mz.BuffetIService.IPedidoService;
import mz.BuffetRepository.PedidoRepository;

@Service
public class PedidoService implements IPedidoService {

    @Autowired
    private PedidoRepository repository;

    @Override
    public List<Pedido> findAll() {
        return repository.findAll();
    }

    @Override
    public Pedido save(Pedido pedido) {
        return repository.save(pedido);
    }

    @Override
    public Optional<Pedido> findById(Integer id) {
        return repository.findById(id);
    }
}