import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ColumnMode, DatatableComponent} from '@swimlane/ngx-datatable';


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  @ViewChild(DatatableComponent) mydatatable: DatatableComponent;
  @Input() rows;
  @Input() heading;
  @Input() columns;
  @Input() temp = [];
  @Input() loadingIndicator;
  ColumnMode = ColumnMode;
  constructor() { }

  ngOnInit(): void {
  }

}
