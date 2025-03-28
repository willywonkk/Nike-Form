import { Injectable, type Signal, signal } from "@angular/core"
import type { Productos } from "../interfaces/productos"

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  private _products = signal<Productos[]>([])

  constructor() {}

  obtenerProductos(): Productos[] {
    return this._products()
  }

  loadProducts(): Signal<Productos[]> {
    return this._products
  }

  addProduct(product: Productos): void {
    this._products.update((products) => [...products, product])
  }

  async uploadImage(image: File): Promise<string> {
    const formData = new FormData()
    formData.append("image", image)

    try {
      const response = await fetch("http://192.168.221.175:3000/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Error al subir la imagen');
      }

      console.log("Imagen subida correctamente")

      const data = await response.json()
      return data.imageUrl // Devolver la URL de la imagen
    } catch (error) {
      console.error("Error al subir la imagen:", error)
      return ""
    }
  }
}

