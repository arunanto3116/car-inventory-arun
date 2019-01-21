import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { InventoryViewComponent } from './inventory-view/inventory-view.component';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddManufacturerComponent } from './add-manufacturer/add-manufacturer.component';
import { AddModelComponent } from './add-model/add-model.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2IziToastModule } from 'ng2-izitoast';
import { NgxUiLoaderModule } from  'ngx-ui-loader';

@NgModule({
  declarations: [
    AppComponent,
    InventoryViewComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    AddManufacturerComponent,
    AddModelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    Ng2IziToastModule,
    NgxUiLoaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
