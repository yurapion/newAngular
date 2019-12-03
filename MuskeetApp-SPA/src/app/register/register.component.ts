import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MuskeetService } from '../_services/muskeet.service';
import { AlertifyService } from '../_services/Alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
// import { BsDatepickerConfig } from 'ngx-bootstrap';
import { User } from '../_models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();
  @Output() modelToHome = new EventEmitter();
  user: User;
  registerForm: FormGroup;
  // tslint:disable-next-line: comment-format
  //bsConfig: Partial<BsDatepickerConfig>;
  constructor(private muskeetService: MuskeetService,
     private alertify: AlertifyService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    // this.bsConfig = {
    //   containerClass: 'theme-red'
    // tslint:disable-next-line: comment-format
    //};
    // this.registerForm = new FormGroup({
    //   username: new FormControl('', Validators.required),
    //   password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
    //   confirmPassword: new FormControl('', Validators.required)
    // }, this.passwordMatchValidator);

    // The same meaning but different realization
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      email: ['', Validators.required],
      postalCode: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]]
    });
  }

  // passwordMatchValidator(g: FormGroup) {
  //   return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  // }

  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.muskeetService.registerNewUser(this.user).subscribe(() => {
        this.alertify.success('Registration succesful');
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.router.navigate(['/members']);
      });
    }
  //  this.authServide.register(this.model).subscribe(() => {
  //   this.alertify.success('register success');
  //   /* put model data to edit box*/
  //   this.cancelRegister.emit(false);
  //  }, error => {
  //    this.alertify.error(error);
  //  });
  }

  cancel() {
 this.cancelRegister.emit(false);
 this.alertify.message('register canceled ');
  }
}
