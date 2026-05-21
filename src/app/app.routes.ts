import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnrollmentsComponent } from './features/products/pages/enrollments/enrollments.component';
import { HomeComponent } from './features/products/pages/home/home.component';
import { ClientesComponent } from './features/products/pages/clientes/clientes.component';
import { InsumosComponent } from './features/products/pages/insumos/insumos.component';
import { FormulasComponent } from './features/products/pages/formulas/formulas.component';
import { AboutComponent } from './features/products/pages/nosotros/nosotros';
import { ProductosComponent } from './features/products/pages/productos/productos';
import { RespaldoComponent } from './features/products/pages/respaldo/respaldo';
import { SoporteComponent } from './features/products/pages/soporte/soporte';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'nosotros', component: AboutComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'respaldo', component: RespaldoComponent },
  { path: 'soporte', component: SoporteComponent },
  { path: 'enrollments', component: EnrollmentsComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'insumos', component: InsumosComponent },
  { path: 'formulas', component: FormulasComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
