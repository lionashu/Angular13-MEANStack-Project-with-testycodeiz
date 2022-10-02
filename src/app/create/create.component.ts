import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  // userForm!: FormGroup one More trick

  constructor(private api: ApiserviceService, private router: ActivatedRoute) { }

  errMsg: any;
  successMsg: any;
  getparamid: any;


  ngOnInit(): void {
    this.getparamid = this.router.snapshot.paramMap.get('id');
    if (this.getparamid) {
      this.api.getSingleData(this.getparamid).subscribe((res) => {
        console.log(res, 'selected update data');
        this.userForm.patchValue({
          fullname: res.data[0].fullname,
          email: res.data[0].email,
          mobile: res.data[0].mobile
        })
      })
    }

  }
  userForm = new FormGroup({
    'fullname': new FormControl('', Validators.required),
    'email': new FormControl('', Validators.required),
    'mobile': new FormControl('', Validators.required)
  })

  userSubmit() {
    // console.log(this.userForm.value);
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      this.api.createData(this.userForm.value).subscribe((res) => {
        console.log(res, 'Data added Success')
        this.userForm.reset();
        this.successMsg = res.message;
      })
    }
    else {
      this.errMsg = 'All Fields Are Reqired';
    }
  }

  //updateuser
  updateUser() {
    // console.log(this.userForm.value);
    if (this.userForm.valid) {
      this.api.updateData(this.userForm.value, this.getparamid).subscribe((res) => {
        console.log(res, 'Data Updated Successfull');
        this.successMsg = res.message;
      })
    } else {
      this.errMsg = 'All Fields Are required.'
    }
  }
}
