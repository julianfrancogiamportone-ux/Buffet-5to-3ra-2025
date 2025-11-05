package mz.BuffetService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import mz.BuffetEntity.Factura;
import mz.BuffetIService.IFacturaService;

import java.util.List;
import java.util.Optional;
import mz.BuffetRepository.FacturaRepository;

@Service
public class FacturaService implements IFacturaService {

    @Autowired
    private FacturaRepository repository;

    @Override
    public Factura save(Factura Factura) {
        return repository.save(Factura);
    }

    @Override
    public List<Factura> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<Factura> findById(Long id) {
        return repository.findById(id);
        
    }

	@Override
	public Factura save1(Factura factura) {
		// TODO Auto-generated method stub
		return null;
	}
}
