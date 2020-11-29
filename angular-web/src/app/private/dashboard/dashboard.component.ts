import {FilterService} from './../../../services/filter.service';
import {AuthGuardService} from './../../guards/auth-guard.service';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '@src/services/data.service';
import {ToastrService} from 'ngx-toastr';
import jwt_decode from 'jwt-decode';
import * as CanvasJS from '../../../assets/canvasjs.min.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  rows = [];
  columns = [];
  loadingIndicator = true;
  constructor(
    private dataService: DataService, private router: Router,
    private toastrService: ToastrService,
    private authGuardService: AuthGuardService,
    private filterService: FilterService
  ) { }

  ngOnInit(): void {
    // this.toastrService.success('Welcome to Dashboard.');
    const token = localStorage.getItem('token');
    const tokenContent = jwt_decode(token);
    localStorage.setItem('userInfo', JSON.stringify(tokenContent));
    this.getData({});
    this.init();
  }

  init() {
    this.filterService.getFilterChanges().subscribe(filter => {
      this.getData(filter);
    });
  }

  renderPieChart(data): void {
    const pie = new CanvasJS.Chart('pieChart', {
      theme: 'light2',
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: 'Monthly Expense'
      },
      data: [{
        type: 'pie',
        showInLegend: true,
        toolTipContent: '<b>{name}</b>: ${y} (#percent%)',
        indexLabel: '{name} - #percent%',
        dataPoints: data
      }]
    });
    pie.render();

  }

  renderBarChart(data): void {
    const bar = new CanvasJS.Chart('barChart', {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: 'Basic Column Chart in Angular'
      },
      data: data
    });

    bar.render();
  }

  renderLineChart(data): void {
    const chart = new CanvasJS.Chart('lineChart', {
      animationEnabled: true,
      theme: 'light2',
      title: {
        text: 'Simple Line Chart'
      },
      data: data
    });
    chart.render();
  }

  getData(filter): void {
    this.dataService.getData(filter)
      .subscribe(res => {
        const data = res.data || [];
        const pieData = [{label: '', y: 10}];
        const barData = [];
        const lineData = [];
        const dataTableData = [];
        data.forEach(obj => {
          barData.push({...obj, type: 'column'});
          lineData.push({...obj, type: 'line'});
          obj.dataPoints.forEach(indObj => {
            const pieIndObj = pieData.find(pieObj => pieObj.label == indObj.label);
            if (pieIndObj) {
              pieIndObj.y = pieIndObj.y + indObj.y;
            } else {
              pieData.push(indObj);
            }
            dataTableData.push({name: indObj.name, label: indObj.label, value: indObj.y});
          });
        });
        this.renderPieChart(pieData);
        this.renderBarChart(barData);
        this.renderLineChart(lineData);
        this.sendToDataTable(dataTableData);
      }, err => {
        this.toastrService.error(err.error.message);
        this.authGuardService.logOut();
        this.router.navigate(['/login']);
      });
  }

  sendToDataTable(data): void {
    this.rows = data;
    this.columns = Object.keys(data[0] || {});
    this.loadingIndicator = false;
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
