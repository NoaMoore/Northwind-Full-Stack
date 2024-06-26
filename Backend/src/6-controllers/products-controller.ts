import express, { NextFunction, Request, Response } from "express";
import { productsService } from "../5-services/products-service";
import { StatusCode } from "../3-models/status-codes";
import { ProductModel } from "../3-models/product-model";
import { securityMiddleware } from "../4-middleware/security-middleware";
import { fileSaver } from "uploaded-file-saver";

class ProductsController {

    // The router listen to different routes: 
    public readonly router = express.Router();

    // Ctor: 
    public constructor() {
        this.registerRoutes();
    }

    // Register different routes: 
    private registerRoutes(): void {
        this.router.get("/api/products", this.getAllProducts);
        this.router.get("/api/products/:id", this.getOneProduct); // Route parameter
        this.router.post("/api/products", securityMiddleware.validateLoggedIn, this.addProduct);
        this.router.put("/api/products/:id", securityMiddleware.validateLoggedIn, this.updateProduct);
        this.router.delete("/api/products/:id", securityMiddleware.validateLoggedIn, securityMiddleware.validateAdmin, this.deleteProduct);
        this.router.get("/api/products/images/:imageName", this.getImageFile);
    }

    // Get all products: 
    private async getAllProducts(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            console.log("User requesting all products...");
            const products = await productsService.getAllProducts();
            response.json(products);
        }
        catch (err: any) { next(err) }
    }

    // Get one product:
    private async getOneProduct(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const id = +request.params.id;
            const product = await productsService.getOneProduct(id);
            response.json(product);
        }
        catch (err: any) { next(err) }
    }

    // Add new product: 
    private async addProduct(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            request.body.image = request.files?.image;
            const product = new ProductModel(request.body); // We must tell express to create this "body" from the given json.
            const addedProduct = await productsService.addProduct(product);
            response.status(StatusCode.Created).json(addedProduct);
        }
        catch (err: any) { next(err) }
    }

    // Update existing product: 
    private async updateProduct(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            request.body.image = request.files?.image;
            request.body.id = +request.params.id;
            const product = new ProductModel(request.body); // We must tell express to create this "body" from the given json.
            const updatedProduct = await productsService.updateProduct(product);
            response.json(updatedProduct);
        }
        catch (err: any) { next(err) }
    }

    // Delete existing product: 
    private async deleteProduct(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const id = +request.params.id;
            await productsService.deleteProduct(id);
            response.sendStatus(StatusCode.NoContent); // Same as: response.status(StatusCode.NoContent).send();
        }
        catch (err: any) { next(err) }
    }

    // Get image file: 
    private async getImageFile(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const imageName = request.params.imageName;
            const imagePath = fileSaver.getFilePath(imageName);
            response.sendFile(imagePath);
        }
        catch (err: any) { next(err) }
    }

}

const productsController = new ProductsController();
export const productsRouter = productsController.router;
