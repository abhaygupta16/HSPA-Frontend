import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  registerationForm: FormGroup;

  constructor(private fb: FormBuilder) { }



  ngOnInit() {
    /*this.registerationForm=new FormGroup({
      userName : new FormControl(null,Validators.required),
      email : new FormControl(null,[Validators.required,Validators.email]),
      password : new FormControl(null,[Validators.required,Validators.minLength(8)]),
      confirmPassword : new FormControl(null,[Validators.required]),
      mobile : new FormControl(null,[Validators.required,Validators.maxLength(10)])
    },this.passwordMatchingValidator);*/
    this.createRegistrationForm();
  }

  //can create a reactive form using formbuilder in angular
  createRegistrationForm(){
    this.registerationForm = this.fb.group({
      userName : [null,Validators.required],
      email : [null,[Validators.required,Validators.email]],
      password : [null,[Validators.required,Validators.minLength(8)]],
      confirmPassword : [null,[Validators.required]],
      mobile : [null,[Validators.required,Validators.maxLength(10)]]
    },{Validators:this.passwordMatchingValidator});
  }

  //Get metgoads for all the form controls in registration form
  get userName(){
    return this.registerationForm.get('userName') as FormControl;
  }

  get email(){
    return this.registerationForm.get('email') as FormControl;
  }

  get password(){
    return this.registerationForm.get('password') as FormControl;
  }
  get confirmPassword(){
    return this.registerationForm.get('confirmPassword') as FormControl;
  }
  get mobile(){
    return this.registerationForm.get('mobile') as FormControl;
  }



  passwordMatchingValidator(fg : FormGroup) : Validators{
    return fg.get('password').value === fg.get('confirmPassword').value ? null : {notmatched:true};
  }

  onSubmit(){
    console.log(this.registerationForm);
  }

}
