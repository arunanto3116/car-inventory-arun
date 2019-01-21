import { Component, OnInit, Input, ElementRef, ViewChild} from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Ng2IzitoastService } from "ng2-izitoast";
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-add-model',
  templateUrl: './add-model.component.html',
  styleUrls: ['./add-model.component.css']
})
export class AddModelComponent implements OnInit {
  Manufacturers:any = [];
  fileToUpload:any = [];
  form: FormGroup;
  title: string;
  validationMsg: string;
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('fileInput1') fileInput1: ElementRef;
  @ViewChild('myForm') formValues;

  @Input() modelData = { 
                          manufacturer_id:0,
                          model:"", 
                          color:"", 
                          manufacturing_year:"",
                          registration_number:"",
                          note:""
                        };
  constructor(public rest:RestService, private route: ActivatedRoute,private http: HttpClient,private fb: FormBuilder,public iziToast: Ng2IzitoastService,private ngxService: NgxUiLoaderService) 
  {
    this.createForm();
  }


  ngOnInit() {
    this.title="Add Model";
    this.getManufacturers();
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      avatar: null,
      avatar1: null
    });
  }

  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      debugger;
      if(file.size > 2e+6)
      {
        this.fileInput.nativeElement.value="";
        this.iziToast.warning({  position:'topRight', title: "",message: "File size should not exceed 2MB." });
      }
      else
      {
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.form.get('avatar').setValue({
            filename: file.name,
            filetype: file.type,
            value: reader.result
          })
        };
    }
    }
  }

  onFileChange1(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      if(file.size > 2e+6)
      {
        this.fileInput1.nativeElement.value="";
        this.iziToast.warning({  position:'topRight', title: "",message: "File size should not exceed 2MB." });
      }
      else
      {
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.form.get('avatar1').setValue({
            filename: file.name,
            filetype: file.type,
            value: reader.result
          })
        };
  
      }
    }
  }  

  getManufacturers() {    
    this.Manufacturers = [];
    this.ngxService.start();
    this.rest.getManufacturers().subscribe((data: {}) => {
      console.log(data);
      this.Manufacturers = data;
      this.ngxService.stop();
    });
  }  

  addModel() {
    const formModel = this.form.value;
    formModel.modelData = this.modelData;    
    formModel.modelData.model = formModel.modelData.model.trim();
    formModel.modelData.color = formModel.modelData.color.trim();
    formModel.modelData.registration_number = formModel.modelData.registration_number.trim();
    if(!formModel.modelData.manufacturer_id
      ||!formModel.modelData.model
      ||!formModel.modelData.color
      ||!formModel.modelData.manufacturing_year
      ||!formModel.modelData.registration_number
      ||!this.fileInput.nativeElement.value  
      ||!this.fileInput1.nativeElement.value  
    )
    {
      if(!formModel.modelData.manufacturer_id)
      {
        this.validationMsg = 'Please select a manufacturer.';  
      }
      else if(!formModel.modelData.model)
      {
        this.validationMsg = 'Please enter model name.';  
      }
      else if(!formModel.modelData.color)
      {
        this.validationMsg = 'Please enter a color.';  
      }
      else if(!formModel.modelData.manufacturing_year)
      {
        this.validationMsg = 'Please enter manufacturing year.';  
      }
      else if(!formModel.modelData.registration_number)
      {
        this.validationMsg = 'Please enter registration number.';  
      }
      else if(!this.fileInput.nativeElement.value)
      {
        this.validationMsg = 'Please select image 1.';  
      }      
      else if(!this.fileInput1.nativeElement.value)
      {
        this.validationMsg = 'Please select image 2.';  
      }      

      this.iziToast.warning({  position:'topRight', title: "",message: this.validationMsg });
    }else if(formModel.modelData.manufacturing_year<1950||formModel.modelData.manufacturing_year>2019)
    {
      this.iziToast.warning({  position:'topRight', title: "",message: "Select a year in between 1950 to 2019." });
    }
    else
    {
      this.ngxService.start();
      this.rest.addModel(formModel).subscribe((result) => {
        console.log(result);
        this.ngxService.stop();        
        if(result.status)
        {        
          this.iziToast.success({ position:'topRight', title: "Success",message: result.message});
          this.formValues.resetForm();  
          this.fileInput.nativeElement.value="";
          this.fileInput1.nativeElement.value="";
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
