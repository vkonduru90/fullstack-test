import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthGuardService} from '@app/guards/auth-guard.service';
import {DataService} from '@src/services/data.service';
import {ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signInForm: FormGroup;
  constructor(
    private fb: FormBuilder, private authGuardService: AuthGuardService,
    private router: Router, private dataService: DataService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.initializeSignInForm();
  }
  initializeSignInForm(): void {
    this.signInForm = this.fb.group({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }


  loginSubmit(): void {
    console.log(this.signInForm.value);
    this.authGuardService.login(this.signInForm.value).subscribe(
      res => {
        console.log(res);
        if (res.data.token) {
          this.router.navigate(['/dashboard']);
        } else {
        this.toastrService.warning('Unable to login Please try again.');
        }
      }, error => {
        console.log(error);
        this.toastrService.warning('Unable to login Please try again.');
      }
    );
  }


}
