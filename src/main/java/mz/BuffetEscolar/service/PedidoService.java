package mz.BuffetEscolar.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import mz.BuffetEscolar.entity.Pedido;
import mz.BuffetEscolar.repository.PedidoRepository;

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