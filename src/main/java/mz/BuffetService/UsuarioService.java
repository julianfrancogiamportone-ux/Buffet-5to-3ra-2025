package mz.BuffetService;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import mz.BuffetEntity.Usuario;
import mz.BuffetIService.IUsuarioService;
import mz.BuffetRepository.UsuarioRepository;

@Service
public class UsuarioService implements IUsuarioService {

    @Autowired
    private UsuarioRepository repository;

    @Override
    public List<Usuario> findAll() {
        return repository.findAll();
    }

    @Override
    public Usuario save(Usuario Usuario) {
        return repository.save(Usuario);
    }

    @Override
    public Optional<Usuario> findById(Integer id) {
        return repository.findById(id);
    }
}