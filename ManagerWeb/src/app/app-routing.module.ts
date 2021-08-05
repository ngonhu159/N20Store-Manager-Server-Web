import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AddProductComponent } from './manager/add-product/add-product.component';
import { DeleteProductComponent } from './manager/delete-product/delete-product.component';
import { EditProductComponent } from './manager/edit-product/edit-product.component';
import { ProductComponent } from './manager/product/product.component';
import { HomeComponent } from './page/home/home.component';
import { ReceiptComponent } from './page/receipt/receipt.component';



const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'admin/add-product', component: AddProductComponent },
    { path: 'admin/delete-product', component: DeleteProductComponent },
    { path: 'admin/edit-product', component: EditProductComponent },
    { path: 'product', component: ProductComponent },
    { path: 'staff/receipt', component: ReceiptComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
    exports: [RouterModule]
})

export class AppRoutingModule { }