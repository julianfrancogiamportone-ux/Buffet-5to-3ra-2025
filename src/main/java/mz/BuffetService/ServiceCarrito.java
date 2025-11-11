package mz.BuffetEscolar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mz.BuffetEscolar.Iservice.IServiceCarrito;
import mz.BuffetEscolar.entity.carrito;
import mz.BuffetEscolar.repository.CarritoRepository;

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