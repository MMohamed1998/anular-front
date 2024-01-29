import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { RegisterComponent } from './Components/register/register.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { ProductsComponent } from './Components/products/products.component';
import { ProductListComponent } from './Components/product-list/product-list.component';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { EditProductComponent } from './Components/Edit-Product/Edit-Product.component';
import { WishlistComponent } from './Components/wishlist/wishlist.component';
import { UserLayoutComponent } from './Components/user-layout/user-layout.component';
import { authGuard } from './Services/Guards/auth.guard';

export const routes: Routes = [
    {path:"",component:UserLayoutComponent,children:[
    {path:"",redirectTo:"home",pathMatch:"full"},

    {path:"home",component: HomeComponent},
    {path:"local-product",component: ProductsComponent},
    {path:"products",component: ProductListComponent},
    {path:"add-product",component: AddProductComponent,canActivate:[authGuard]},
    {path:"login",component: LoginComponent},
    {path:"register",component: RegisterComponent},
    {path:"wishlist",component:WishlistComponent,canActivate:[authGuard]},
    {path:"details/:id",component: ProductDetailsComponent},
    {path:"edit-product/:id",component: EditProductComponent,canActivate:[authGuard]},
    {path:"**", redirectTo: "home",pathMatch:"full"}
    ]},
];
