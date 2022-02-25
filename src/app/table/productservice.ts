import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Product } from './product';

//this is a service file which is use in any componet we need.it can be call in any component.

@Injectable()
export class ProductService {

    status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK'];

    productNames: string[] = [
        "Bamboo Watch",
        "Black Watch",
        "Blue Band",
        "Blue T-Shirt",
        "Bracelet",
        "Brown Purse",
        "Chakra Bracelet",
        "Galaxy Earrings",
        "Game Controller",
        "Gaming Set",
        "Gold Phone Case",
        "Green Earbuds",
        "Green T-Shirt",
        "Grey T-Shirt",
        "Headphones",
        "Light Green T-Shirt",
        "Lime Band",
        "Mini Speakers",
        "Painted Phone Case",
        "Pink Band",
        "Pink Purse",
        "Purple Band",
        "Purple Gemstone Necklace",
        "Purple T-Shirt",
        "Shoes",
        "Sneakers",
        "Teal T-Shirt",
        "Yellow Earbuds",
        "Yoga Mat",
        "Yoga Set",
    ];

    constructor(private http: HttpClient) { }


    // product jo store ha un ko bulawane ka liye 
    getProducts() {
        return this.http.get<any>('assets/products.json')
            .toPromise()
            .then(res => <Product[]>res.data)
            .then(data => { return data; });
    }


    //jb koi new product add kare gae is mehtod ki madad sa
    generatePrduct(): Product {
        const product: Product = {
            id: this.generateId(),
            name: this.generateName(),
            description: "Product Description",
            price: this.generatePrice(),
            quantity: this.generateQuantity(),
            category: "Product Category",
            inventoryStatus: this.generateStatus(),
            rating: this.generateRating()
        };

        // product.image = product.name.toLocaleLowerCase().split(/[ ,]+/).join('-')+".jpg";;
        return product;
    }

    // new id banane ka liye mehtod
    generateId() {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
    }

    generateName() {
        return this.productNames[Math.floor(Math.random() * Math.floor(30))];
    }

    generatePrice() {
        return Math.floor(Math.random() * Math.floor(299) + 1);
    }

    generateQuantity() {
        return Math.floor(Math.random() * Math.floor(75) + 1);
    }

    generateStatus() {
        return this.status[Math.floor(Math.random() * Math.floor(3))];
    }

    generateRating() {
        return Math.floor(Math.random() * Math.floor(5) + 1);
    }
}