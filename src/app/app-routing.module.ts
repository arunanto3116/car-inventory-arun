import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryViewComponent } from './inventory-view/inventory-view.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddManufacturerComponent } from './add-manufacturer/add-manufacturer.component';
import { AddModelComponent } from './add-model/add-model.component';

const routes: Routes = [
  {
    path: 'view-inventory',
    component: InventoryViewComponent,
    data: { title: 'Inventory' }
  },
  {
    path: 'add-manufacturer',
    component: AddManufacturerComponent,
    data: { title: 'Inventory' }
  },
  {
    path: 'add-model',
    component: AddModelComponent,
    data: { title: 'Inventory' }
  },   
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { title: 'Inventory' }
  },    
  { 
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
