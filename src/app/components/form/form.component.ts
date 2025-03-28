import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import {
  FormGroup,
  Validators,
  FormControl,
  ReactiveFormsModule,
  type AbstractControl,
  type ValidationErrors,
} from "@angular/forms"
import { Productos } from "../../interfaces/productos"
import { ProductsService } from "../../service/products.service"

@Component({
  selector: "app-form",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"],
})
export class FormComponent {
  form = new FormGroup({
    ReferenceNumber: new FormControl("", [Validators.required, Validators.minLength(3)]),
    Name: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    Price: new FormControl("", [Validators.required, Validators.min(0), Validators.max(10000)]),
    Description: new FormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(500)]),
    OnSale: new FormControl(false),
    Type: new FormControl("", [Validators.required]),
    Image: new FormControl(null),
  })

  selectedFile: File | null = null
  imagePreview: string | null = null
  imageError = false
  isSubmitting = false
  showSuccessModal = false

  constructor(private productosService: ProductsService) {}

  // Método para comprobar si un campo tiene errores
  campoNoValido(campo: string): boolean {
    return (this.form.get(campo)?.invalid && this.form.get(campo)?.touched) || false
  }

  // Método para manejar la selección de archivos
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0]
      this.imageError = false

      // Crear vista previa de la imagen
      const reader = new FileReader()
      reader.onload = () => {
        this.imagePreview = reader.result as string
      }
      reader.readAsDataURL(this.selectedFile)
    } else {
      this.selectedFile = null
      this.imagePreview = null
    }
  }

  // Método para enviar el formulario
  async onSubmit(): Promise<void> {
    if (this.form.invalid || !this.selectedFile) {
      // Marcar todos los campos como tocados para mostrar errores
      Object.keys(this.form.controls).forEach((key) => {
        const control = this.form.get(key)
        control?.markAsTouched()
      })

      if (!this.selectedFile) {
        this.imageError = true
      }

      return
    }

    this.isSubmitting = true

    try {
      // Subir la imagen y obtener la URL
      const imageUrl = await this.productosService.uploadImage(this.selectedFile)

      // Crear objeto de producto
      const producto: Productos = {
        reference_number: this.form.value.ReferenceNumber || "",
        name: this.form.value.Name || "",
        description: this.form.value.Description || "",
        price: Number(this.form.value.Price) || 0,
        type: this.form.value.Type || "",
        image_url: imageUrl,
        on_sale: this.form.value.OnSale || false,
      }

      // Añadir producto al servicio
      this.productosService.addProduct(producto)

      // Mostrar modal de éxito
      this.showSuccessModal = true

      // Resetear formulario
      this.form.reset()
      this.selectedFile = null
      this.imagePreview = null
      Object.keys(this.form.controls).forEach((key) => {
        const control = this.form.get(key)
        control?.setErrors(null)
      })
    } catch (error) {
      console.error("Error al guardar el producto:", error)
      // Aquí podrías mostrar un mensaje de error
    } finally {
      this.isSubmitting = false
    }
  }

  // Método para cerrar el modal de éxito
  closeSuccessModal(): void {
    this.showSuccessModal = false
  }

  // Validador personalizado para verificar si el nombre ya existe
  nameExistsValidator(control: AbstractControl): ValidationErrors | null {
    const name = control.value
    const products = this.productosService.loadProducts()

    // Verificar si el nombre ya existe en la lista de productos
    if (products && products().some((product) => product.name === name)) {
      return { nameExists: true }
    }

    return null
  }
}

