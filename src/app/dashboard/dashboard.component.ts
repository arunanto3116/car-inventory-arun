import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ng2IzitoastService } from "ng2-izitoast";
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title: string;
  constructor(private route: ActivatedRoute,public iziToast: Ng2IzitoastService,private ngxService: NgxUiLoaderService) 
  {
    this.ngxService.start();
  }

  ngOnInit() {
    this.title="Dashboard";
    this.ngxService.stop();  
  }

}
