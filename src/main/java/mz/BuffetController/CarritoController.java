package mz.BuffetController;

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

import mz.BuffetIService.IServiceCarrito;
import mz.BuffetEntity.carrito;

@RestController
@RequestMapping("/personajes")
@CrossOrigin(origins = "*")
public class CarritoController {

    @Autowired
    private IServiceCarrito service;


    @PostMapping
    public carrito createCharacter(@RequestBody carrito carrito) {
        return service.save(carrito);
    }


    @GetMapping
    public List<carrito> getAllCharacters() {
        return service.findAll();
    }


    @GetMapping("/{id}")
    public Optional<carrito> getCharacterById(@PathVariable Long id) {
        return service.findById(id);
    }


}