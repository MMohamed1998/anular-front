import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../Services/Api.service';
import { IProduct } from '../../DataTypes/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  list:any
constructor (
  private route:ActivatedRoute,
  private PrdApiServ:ApiService
  ){
  let id = this.route.snapshot.params["id"];
    this.PrdApiServ.GetProductByID(id).subscribe({
      next:(response)=>{
        console.log(response);
        
        this.list =response.data 
        
    },
    error:(err)=>{
      console.log(err);
      
    }
    })
}





}
