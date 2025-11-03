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

import mz.BuffetEntity.Factura;
import mz.BuffetIService.IFacturaService;

@RestController
@RequestMapping("/facturas")
@CrossOrigin(origins = "*")

public class FacturaController {
	@Autowired
    private IFacturaService service; 
    @PostMapping
    public Factura crearFactura(@RequestBody Factura factura) {
        return service.save(factura); 
    }
    @GetMapping
    public List<Factura> obtenerTodasLasFacturas() {
        return service.findAll();
    }
    @GetMapping("/{id}")
    public Optional<Factura> obtenerFacturaPorId(@PathVariable Long id) {
        return service.findById(id);
    }
}

