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

import mz.BuffetIService.IProductoService; 
import mz.BuffetEntity.Producto; 

@RestController
@RequestMapping("/productos") 
@CrossOrigin(origins = "*") 
public class ProductoController {

    @Autowired
    private IProductoService service; 

    @PostMapping
    public Producto crearProducto(@RequestBody Producto producto) {
        return service.save(producto); 
    }

    @GetMapping
    public List<Producto> obtenerTodosLosProductos() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Producto> obtenerProductoPorId(@PathVariable Long id) {
        return service.findById(id);
    }
}