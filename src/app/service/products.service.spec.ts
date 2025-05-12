import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductsService } from './products.service';

describe('ProductsService - Integración', () => {
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService]
    });

    service = TestBed.inject(ProductsService);
  });

  describe('addProduct', () => {
    it('debería existir el método addProduct', () => {
      // Verificamos que el método existe
      expect(service.addProduct).toBeDefined();
      expect(typeof service.addProduct).toBe('function');
    });

    it('debería poder llamarse con un producto', () => {
      // Producto de prueba
      const testProduct = {
        reference_number: 'REF123',
        name: 'Producto Test',
        description: 'Descripción de prueba',
        price: 100,
        type: 'Calzado',
        on_sale: false,
        image_url: null
      };

      // Verificamos que no lanza errores al llamarlo
      expect(() => {
        service.addProduct(testProduct);
      }).not.toThrow();
    });
  });

  // Test básico para verificar que loadProducts existe
  describe('loadProducts', () => {
    it('debería tener un método loadProducts', () => {
      // Simplemente verificamos que el método existe
      expect(service.loadProducts).toBeDefined();
      expect(typeof service.loadProducts).toBe('function');
    });

    it('debería poder llamarse sin errores', () => {
      // Simplemente verificamos que no lanza errores al llamarlo
      expect(() => {
        service.loadProducts();
      }).not.toThrow();
    });

    it('debería devolver un valor', () => {
      // Verificamos que devuelve algo (signal, observable, etc.)
      const result = service.loadProducts();
      expect(result).toBeDefined();
    });
  });
});