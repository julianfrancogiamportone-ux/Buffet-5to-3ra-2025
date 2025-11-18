package mz.BuffetIService;

import java.util.List;
import java.util.Optional;
import mz.BuffetEntity.Usuario;

public interface IUsuarioService {
    
    public List<Usuario> findAll();
    public Usuario save(Usuario Usuario);
    public Optional<Usuario> findById(Integer id);

}