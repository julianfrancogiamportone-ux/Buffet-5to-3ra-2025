package mz.BuffetRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import mz.BuffetEntity.Usuario;


public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    
}