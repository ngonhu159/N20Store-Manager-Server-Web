import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AddProductComponent } from './manager/add-product/add-product.component';
import { ProductComponent } from './manager/product/product.component';
import { HomeComponent } from './page/home/home.component';



const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'admin/add-product', component: AddProductComponent },
    { path: 'product', component: ProductComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
    exports: [RouterModule]
})

export class AppRoutingModule { }