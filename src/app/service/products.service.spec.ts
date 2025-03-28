import { TestBed } from "@angular/core/testing"
import { ProductsService } from "./products.service"

describe("ProductsService", () => {
  let service: ProductsService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(ProductsService)
  })

  it("should be created", () => {
    expect(service).toBeTruthy()
  })

  it("should add a product", () => {
    const mockProduct = {
      reference_number: "REF123",
      name: "Test Product",
      description: "Test Description",
      price: 100,
      type: "Tipo 1",
      image_url: "test.jpg",
      on_sale: false,
    }

    service.addProduct(mockProduct)
    const products = service.obtenerProductos()

    expect(products.length).toBe(1)
    expect(products[0]).toEqual(mockProduct)
  })
})

