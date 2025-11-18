package mz.BuffetService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mz.BuffetIService.IServiceCarrito;
import mz.BuffetEntity.carrito;
import mz.BuffetRepository.CarritoRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ServiceCarrito implements IServiceCarrito {

    @Autowired
    private CarritoRepository repository;

    @Override
    public carrito save(carrito carrito) {
        return repository.save(carrito);
    }

    @Override
    public List<carrito> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<carrito> findById(Long id) {
        return repository.findById(id);
    }
   
}