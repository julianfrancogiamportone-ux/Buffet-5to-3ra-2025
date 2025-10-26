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
import mz.BuffetEscolar.service.IPedidoService;
import mz.BuffetEscolar.entity.Pedido;

@RestController
@RequestMapping("/pedidos")
@CrossOrigin(origins = "*")
public class PedidoController {

    @Autowired
    private IPedidoService service;

    @PostMapping
    public Pedido createPedido(@RequestBody Pedido pedido) {
        return service.save(pedido);
    }

    @GetMapping
    public List<Pedido> getAllPedidos() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Pedido> getPedidoById(@PathVariable Integer id) {
        return service.findById(id);
    }
}