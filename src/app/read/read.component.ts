import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {


  constructor(private api:ApiserviceService) { }
  readUser:any;
  successMsg:any;
  ngOnInit(): void {
    this.getAlldata();
  }

  //delete Id 
  deleteId(id:any){
    // console.log(id,"selected ID");
    this.api.deleteData(id).subscribe((res)=>{
      console.log(res,'deleted Id No');
      this.successMsg = res.message;
     this.getAlldata();
    })
  }
  getAlldata(){
     // instance load all data

     this.api.getAllUser().subscribe((res)=>{
      console.log('Get All Data',res);
      this.readUser= res.data;
    })
  }

}
