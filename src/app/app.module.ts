import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ProductoService } from './servicios/producto.service';
import { ProductoComponent } from './components/producto/producto.component';


const routes: Routes = [
  { path: 'productos', component: ProductoComponent },
  { path: '', redirectTo: '/productos', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    ProductoComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule, 
    RouterModule.forRoot(routes)
  ],
  providers: [ProductoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
