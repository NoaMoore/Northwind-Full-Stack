import { OkPacketParams } from "mysql2";
import { dal } from "../2-utils/dal";
import { ResourceNotFoundError } from "../3-models/client-errors";
import { ProductModel } from "../3-models/product-model";
import { fileSaver } from "uploaded-file-saver";
import { appConfig } from "../2-utils/app-config";

class ProductsService {

    // Get all products from database: 
    public async getAllProducts(): Promise<ProductModel[]> {

        // Create sql:
        const sql = `SELECT *, CONCAT('${appConfig.baseImageUrl}', imageName) as imageUrl FROM products`;

        // Execute in database: 
        const products = await dal.execute(sql);

        // Return result: 
        return products;
    }

    // Get one product from database: 
    public async getOneProduct(id: number): Promise<ProductModel> {

        // Create sql:
        const sql = `SELECT *, CONCAT('${appConfig.baseImageUrl}', imageName) as imageUrl FROM products WHERE id = ${id}`;

        // Execute in database: 
        const products = await dal.execute(sql);

        // Extract the single product: 
        const product = products[0];

        // If product not exist:
        if (!product) throw new ResourceNotFoundError(id);

        // Return result: 
        return product;
    }

    // Add new product: 
    public async addProduct(product: ProductModel): Promise<ProductModel> {

        // Validate: 
        product.validateInsert();

        // Save image to hard-disk:
        const imageName = await fileSaver.add(product.image);

        // Create sql:
        const sql = `INSERT INTO products(name, price, stock, imageName)
            VALUES('${product.name}', ${product.price}, ${product.stock}, '${imageName}')`;

        // Execute: 
        const info: OkPacketParams = await dal.execute(sql);

        // Take database product:
        product = await this.getOneProduct(info.insertId);

        // Return:
        return product;
    }

    // Update existing product: 
    public async updateProduct(product: ProductModel): Promise<ProductModel> {

        // Validate: 
        product.validateUpdate();

        // Get old image name from database: 
        const oldImageName = await this.getImageName(product.id);

        // Save new image instead of the old one:
        const newImageName = product.image ? await fileSaver.update(oldImageName, product.image) : oldImageName;

        // Create sql:
        const sql = `UPDATE products SET
            name = '${product.name}',
            price = ${product.price},
            stock = ${product.stock},
            imageName = '${newImageName}'
            WHERE id = ${product.id}`;

        // Execute: 
        const info: OkPacketParams = await dal.execute(sql);

        // If product not found: 
        if (info.affectedRows === 0) throw new ResourceNotFoundError(product.id);

        // Take database product:
        product = await this.getOneProduct(product.id);

        // Return:
        return product;
    }

    // Delete product: 
    public async deleteProduct(id: number): Promise<void> {

        // Get old image name from database: 
        const oldImageName = await this.getImageName(id);

        // Create sql:
        const sql = "DELETE FROM products WHERE id = " + id;

        // Execute: 
        const info: OkPacketParams = await dal.execute(sql);

        // If product not found: 
        if (info.affectedRows === 0) throw new ResourceNotFoundError(id);

        // Delete imag from hard-disk:
        await fileSaver.delete(oldImageName);
    }

    private async getImageName(id: number): Promise<string> {

        // Create sql:
        const sql = "SELECT imageName from products WHERE id = " + id;

        // Execute: 
        const products = await dal.execute(sql);

        // Extract single product:
        const product = products[0];

        // Extract image name: 
        const imageName = product.imageName;

        // Return:
        return imageName;
    }

}

export const productsService = new ProductsService();
