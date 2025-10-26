package mz.BuffetEscolar.controller;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import mz.BuffetEscolar.service.IUsuarioService;
import mz.BuffetEscolar.entity.Usuario;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private IUsuarioService service;

    @PostMapping
    public Usuario createUsuario(@RequestBody Usuario usuario) {
        return service.save(usuario);
    }

    @GetMapping
    public List<Usuario> getAllUsuarios() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Usuario> getUsuarioById(@PathVariable Integer id) {
        return service.findById(id);
    }
}