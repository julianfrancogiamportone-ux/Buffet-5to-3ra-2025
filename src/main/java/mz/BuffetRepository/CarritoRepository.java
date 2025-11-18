
package mz.BuffetRepository;

import org.springframework.data.jpa.repository.JpaRepository;

import mz.BuffetEntity.carrito;

public interface CarritoRepository extends JpaRepository<carrito, Long> {

}
