import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Ng2IzitoastService } from "ng2-izitoast";
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CommonDataService } from '../common-data.service';

@Component({
  selector: 'app-add-manufacturer',
  templateUrl: './add-manufacturer.component.html',
  styleUrls: ['./add-manufacturer.component.css']
})
export class AddManufacturerComponent implements OnInit {
  
  @Input() manufacturerData = { manufacturer:'' };
  title: string;
  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router,public iziToast: Ng2IzitoastService,private ngxService: NgxUiLoaderService,private commonData: CommonDataService) 
  {
    this.ngxService.start();
  }

  ngOnInit() {
    this.title='Add Manufacturer';  
    this.ngxService.stop();  
  }

  addManufacturer() {
    this.manufacturerData.manufacturer = this.manufacturerData.manufacturer.trim();
    if(!this.manufacturerData.manufacturer)
    {
      this.iziToast.warning({  position:'topRight', title: "",message: "Please Enter manufacturer name." });
    }else
    {
      this.ngxService.start();
      this.rest.addManufacturer(this.manufacturerData).subscribe((result) => {      
        console.log('result data');
        console.log(result);
        this.ngxService.stop();
        this.manufacturerData.manufacturer="";
        if(result.status)
        {        
          this.iziToast.success({ position:'topRight', title: "Success",message: 'Manufacturer added successfully.'});
        }else
        {
          this.iziToast.error({  position:'topRight', title: "Failed",message: result.message });
        }
      }, (err) => {
        console.log(err);
      });
  
    }
  }
}
