import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from '../product';
import { ProductService } from '../productservice';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  productDialog: boolean =false;
  products: Product[]=[];
  product!: Product;
  selectedProducts: Product[]=[];
  submitted: boolean= false;

  constructor(private productService: ProductService,private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.productService.getProducts().then(data => this.products = data);
  }

  //to add a new product on list
  openNew(){
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }

  
  
//agr product ki detail ma kuch add karna ha tw is sa ho jae ga 
  editProduct(product:Product){
    this.product ={ ...product};
    this.productDialog = true;
  }
//jo product select kare ga sirf vohi delete ho is mehtod ki wajha sa
  deleteProduct(product:Product){
    this.confirmationService.confirm({
      message:'Are you sure you want to delete ' +product.name + '?',
      header: 'Confirm',
      icon:'pi pi-exclamation-triangle',
      accept: ()=>{
        this.products = this.products.filter(val => val.id !==product.id);
        this.product = {};
        this.messageService.add({severity:'success', summary:'Successful', detail:'Product Detail', life: 3000});
      }
    });
  }
//mehtod to hide the  dialog box
  hideDialog(){
    this.productDialog = false;
    this.submitted = false;
  }
  
  saveProduct(){
    this.submitted = true;
    if(this.product.name && this.product.name.trim()){
      if(this.product.id){
        this.products[this.findIndexById(this.product.id)]= this.product;
        this.messageService.add({severity:'success', summary:'Successful', detail:'Product Updated', life:3000});
      } 
      else{
        this.product.id = this.createId();
        this.product.image = 'product-placeholder.svg';
        this.products.push(this.product);
        this.messageService.add({severity:'success',summary:'Successful', detail:'Product Created', life:3000});
      }
      this.products= [...this.products];
      this.productDialog = false;
      this.product ={};
    }
  }
  findIndexById(id:string):number{
    let index = -1;
    for(let i=0; i < this.products.length; i++){
      if(this.products[i].id ===id ){
        index = i;
        break;
      }
    }
    return index;
  }
  createId(): string{
    let id = '';
    var chars ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for(var i=0 ; i<5; i++){
      id +=chars.charAt(Math.floor(Math.random()*chars.length));
    } 
  
    return id;
  }
}
