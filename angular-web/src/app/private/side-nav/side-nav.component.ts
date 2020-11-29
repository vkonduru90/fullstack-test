import { FilterService } from './../../../services/filter.service';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthGuardService} from '@app/guards/auth-guard.service';
import {DataService} from '@src/services/data.service';
import {ToastrService} from 'ngx-toastr';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  filters: any;

  constructor(
    private dataService: DataService, private router: Router,
    private toastrService: ToastrService,
    private filterService: FilterService
  ) { }

  ngOnInit(): void {
    this.dataService.getFilters()
      .subscribe(res => {
        this.filters = res.data;
      });
  }

  filterBy(name): void {
    this.filterService.sendFilterChanges({name});
  }


}
