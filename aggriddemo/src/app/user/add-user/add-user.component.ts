import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  submitted: boolean= false;
  userForm: any;
  
  constructor(private formBuilder: FormBuilder,private toastr: ToastrService,private userService: UserService,private router:Router) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      "IdCounterparty": ["", Validators.required],
      "Product": ["", Validators.required],
      "Quantity": ["", Validators.required],
      "Price": ["", Validators.required],
      "Date": ["", Validators.required],
      "Direction": ["", Validators.required]
    });
  
  }

  onSubmit() {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }

    this.userService.addUser(this.userForm.value)
      .subscribe( data => {
        this.toastr.success("success", data.toString());
        this.router.navigate(['users']);
      });

    
  }

  Cancel()
  {
    this.router.navigate(['users']);
  }

}
