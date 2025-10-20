package mz.BuffetEscolar.service;

import java.util.List;
import java.util.Optional;
import mz.BuffetEscolar.entity.Usuario;

public interface IUsuarioService {
    
    public List<Usuario> findAll();
    public Usuario save(Usuario usuario);
    public Optional<Usuario> findById(Integer id);
    public void deleteById(Integer id); 
}