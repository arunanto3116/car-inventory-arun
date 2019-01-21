import { Component, Input, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import { Ng2IzitoastService } from "ng2-izitoast";
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-inventory-view',
  templateUrl: './inventory-view.component.html',
  styleUrls: ['./inventory-view.component.css']
})
export class InventoryViewComponent implements OnInit {

  cars:any = [];
  CarModelDetails:any = [];
  dataTableMain: any;
  dataTableModal: any;
  closeResult: string;
  title: string;
  modalIds: string;
  api_base_url: string;
  assets_path: string;

  @Input() modelData = { 
    model_id:0,
    model_id_grouped:""
  };

  constructor(public rest:RestService, private route: ActivatedRoute,private modalService: NgbModal, private chRef: ChangeDetectorRef,public iziToast: Ng2IzitoastService,private ngxService: NgxUiLoaderService) 
  {
    this.api_base_url=environment.api_base_url;
    this.assets_path = this.api_base_url+'assets/images/'
  }
  
  open(content,ids,count) {
    if(ids==0 || ids=="")
    {
      this.iziToast.info({ position:'topRight',message: 'No data available.'});
    }else if(count==0)
    {
      this.iziToast.info({ position:'topRight',message: 'No models available.'});
    }
    else
    {
      this.modalIds=ids;
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',centered: true,size: 'lg'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
        console.log(ids);
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
      this.getCarModelDetails(ids);  
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  ngOnInit() {
    this.title="Inventory";
    this.getCars();
  }

  getCars() {    
    this.cars = [];
    this.ngxService.start();
    this.rest.getCars().subscribe((data: {}) => {
      console.log(data);
      this.cars = data;       
      this.chRef.detectChanges();
      const table: any = $('.table-main');
      this.dataTableMain = table.DataTable();  
      this.ngxService.stop();    
    });
  }  

  getCarModelDetails(ids) {   
    this.CarModelDetails = [];
    this.ngxService.start();
    this.rest.getCarModelDetails(ids).subscribe((data: {}) => {
      console.log(data);
      this.CarModelDetails = data;
      this.chRef.detectChanges();
      this.ngxService.stop();          
    });
  }
  
  markSold(id) {

    this.ngxService.start();
    this.modelData.model_id = id;
    this.modelData.model_id_grouped = this.modalIds;
    this.rest.markModelSold(this.modelData).subscribe((data) => {
      console.log(data);
      this.ngxService.stop();                
      if(data.status)
      {        
        debugger;
        this.iziToast.success({ position:'topRight', title: "Success",message: data.message });
        this.CarModelDetails = data;
        this.chRef.detectChanges();
      
      }else
      {
        this.iziToast.error({  position:'topRight', title: "Failed",message: data.message });
      }
      this.getCars();
    }, (err) => {
      console.log(err);
    });

  }

}
