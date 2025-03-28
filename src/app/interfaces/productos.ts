export interface Productos {
    reference_number: string;
    name: string;
    description: string;
    price: number;
    type: string;
    image_url?: string | null; 
    on_sale: boolean;
}
