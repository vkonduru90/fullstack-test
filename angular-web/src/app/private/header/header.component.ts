import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthGuardService} from '@app/guards/auth-guard.service';
import {DataService} from '@src/services/data.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userInfo: any;
  constructor(
    private dataService: DataService, private router: Router,
    private toastrService: ToastrService,
    private authGuardService: AuthGuardService
  ) { }

  ngOnInit(): void {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
  }

  signOut(): void {
    // Need to send Device Token for logout.
    this.dataService.signOut({}).subscribe(res => {
      console.log(res);
      this.authGuardService.logOut();
      this.toastrService.success(res.data);
      this.router.navigate(['/login']);
    }, err => {
      console.log(err);
      this.toastrService.error(err.error.error.description);
    });
  }

}
