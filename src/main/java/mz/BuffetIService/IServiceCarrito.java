package mz.BuffetEscolar.Iservice;

import java.util.List;
import java.util.Optional;

import mz.BuffetEscolar.entity.carrito;

public interface IServiceCarrito {
	
	public List<carrito> findAll();
	public carrito save(carrito carrito);
	public Optional<carrito> findById(Long id);
}