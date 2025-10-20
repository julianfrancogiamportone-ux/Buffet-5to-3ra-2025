package mz.clash.demo.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import mz.BuffetEscolar.Service.IUsuarioService;
import mz.BuffetEscolar.entity.Usuario;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*") 
public class UsuarioController {

    @Autowired
    private IUsuarioService service;

    @GetMapping
    public List<Usuario> getAllUsuarios() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> getUsuarioById(@PathVariable Integer id) {
        return service.findById(id)
                .map(usuario -> ResponseEntity.ok(usuario))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Usuario createUsuario(@RequestBody Usuario usuario) {
        return service.save(usuario);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> updateUsuario(@PathVariable Integer id, @RequestBody Usuario usuarioDetails) {
        return service.findById(id)
                .map(usuarioExistente -> {
                    usuarioExistente.setNombreUsuario(usuarioDetails.getNombreUsuario());
                    usuarioExistente.setRol(usuarioDetails.getRol());
                    Usuario actualizado = service.save(usuarioExistente);
                    return ResponseEntity.ok(actualizado);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUsuario(@PathVariable Integer id) {
        if (service.findById(id).isPresent()) {
            service.deleteById(id);
            return ResponseEntity.ok().build(); 
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}