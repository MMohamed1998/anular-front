import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../Services/Api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../../DataTypes/product';

@Component({
  selector: 'app-Edit-Product',
  templateUrl: './Edit-Product.component.html',
  styleUrls: ['./Edit-Product.component.css']
})
export class EditProductComponent {
  list! : IProduct
  form!: FormGroup;
  data: FormData;
  constructor(private builder: FormBuilder,private PrdApiServ:ApiService, private apiServ: ApiService,private router:Router,private route:ActivatedRoute) {
    this.data = new FormData()
    
    let id = this.route.snapshot.params["id"];
    this.PrdApiServ.GetProductByID(id).subscribe({
      next:(response)=>{
        console.log(response);
        
        this.list =response.data 
        this.form = this.builder.group({
          name: this.builder.control(this.list.name, [Validators.required, Validators.minLength(3)]),
          price: [this.list.price, [Validators.required, Validators.min(10)]],
          quantity: [this.list.quantity, [Validators.required, Validators.min(1)]],
          colors: this.builder.array([
            this.builder.control(this.list.colors),
            this.builder.control(this.list.colors)
          ]),
          // imgURL:["",[Validators.required]],
          categoryName: ["test"],
          categoryID: ["1"],
          description: [this.list.description, [Validators.required, Validators.minLength(10)]],
    
        })
        
        
    },
    error:(err)=>{
      console.log(err);
      
    }
    
    })
    ///get one
    

  }
  //form.controls["colors"].controls
  get colorArray() {
    return this.form.controls["colors"] as FormArray
  }
  addColor() {
    this.colorArray.push(this.builder.control(""))
  }
  removeColor(ind: any) {
    this.colorArray.removeAt(ind)
  }
  chooseImage(imginput: any) {
    this.data.append("imgURL", imginput.files[0])
  }
  send() {
    //call api
    let id = this.route.snapshot.params["id"]
    console.log(id)
    for (const key in this.form.controls) {
      this.data.append(key, this.form.controls[key].value)
    }
    this.apiServ.EditProduct(id,this.data).subscribe({
      next: (responce) => {
        console.log(responce);
        if(responce.success){
          alert(responce.message)
          this.form.reset();
          this.data = new FormData()
          // this.router.navigateByUrl("/products")
        }
        else{
          alert(responce.message)
        }

      },
      error: (err) => {
        console.log(err);

      }
    })
  }

}
