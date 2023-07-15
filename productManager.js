import { promises as fs, writeFile } from "fs";

class ProductManager {

    constructor() {
        this.path = "./products.json";
        this.products = [];
    }

    async addProduct(title, description, price, imagen, code, stock) {
        const product = {
            title,
            description,
            price,
            imagen,
            code,
            stock,
        };

        const codeProduct = this.products.find((product) => product.code === code);
        if (!codeProduct) {
            if (this.products.length === 0) {
                product.id = 1;
            } else {
                product.id = this.products[this.products.length - 1].id + 1;
            }
            this.products.push(product);
            await fs.writeFile(this.path, JSON.stringify(this.products), "utf8");
        } else {
            return console.log("El código esta repetido");
        }
    };

    async getProducts() {
        const allProducts = await fs.readFile(this.path, "utf8");
        let parseProducts = JSON.parse(allProducts);
        return parseProducts;
    };

    async getProductById(productId) {
        let allProducts = await this.getProducts();
        const idProduct = allProducts.find((product) => product.id === productId);
        if (idProduct) {
            console.log(idProduct);
            return idProduct;
        } else {
            return console.log("Not Found");
        }
    }

    async updateById({ id, ...product }) {
        await this.deleteById(id);
        let oldProduct = await this.getProducts();
        let updateProduct = [{ id, ...product }, ...oldProduct];
        await fs.writeFile(this.path, JSON.stringify(updateProduct), "utf8");
    }

    async deleteById(id) {
        let products = await fs.readFile(this.path, "utf8");
        let allProducts = JSON.parse(products);
        let deleteProduct = allProducts.filter((product) => product.id !== id);
        await fs.writeFile(this.path, JSON.stringify(deleteProduct), "utf8");

        console.log("Producto eliminado");
        console.log(deleteProduct);
    }
}


const product = new ProductManager();
product.addProduct("Producto prueba1", "Este producto es una prueba1", 200, "Sin imagen", "abc122", 25);
product.addProduct("Producto prueba2", "Este producto es una prueba2", 200, "Sin imagen", "abc123", 25);
product.addProduct("Producto prueba3", "Este producto es una prueba3", 300, "Sin imagen", "abc124", 25);
product.addProduct("Producto prueba4", "Este producto es una prueba4", 400, "Sin imagen", "abc125", 25);
product.addProduct("Producto prueba5", "Este producto es una prueba5", 500, "Sin imagen", "abc126", 25);

product.getProducts();
product.getProductById(4);
product.getProductById(6);
product.deleteById(3);
product.updateById({
    title: "Producto prueba2",
    description: "Este producto es una prueba2",
    price: 600,
    imagen: "Sin imagen",
    code: "abc121",
    stock: 25,
    id: 2,
});