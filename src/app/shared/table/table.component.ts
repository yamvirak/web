import { Component, OnInit, ViewChild, Input, OnChanges, Output, EventEmitter, AfterViewInit, TemplateRef } from '@angular/core';
import { MatSort, MatSortable, SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';

export interface TableColumnInfo {
  key: string | number;
  label: string;
  name: string;
  sortable?: boolean;
  headerStyleClass?: string;
  dataStyleClass?: string;
  template?: TemplateRef<any>;
  class?: string;
}

interface DataSource {
  [key: string]: any;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'], 
  animations   : fuseAnimations
})
export class TableComponent implements OnInit, AfterViewInit, OnChanges {
  templateContext = { $implicit: [], item: {} };
  @Input() tableColumnInfo: TableColumnInfo[] = [];
  @Input() dataSource: DataSource[] = [];
  @Input() primaryKey: string; // this is primary key, no presenting will get this tableColumnInfo[0].name as primary key

  @Input() canDeleteRow: boolean;
  @Input() canUpdateRow: boolean;
  @Input() canViewRow = true;
  @Input() showIndex = true;

  // sort
  @Input() active: string;
  @Input() sortDirection: SortDirection = 'asc';

  // actions
  @Output() delete = new EventEmitter<any>();
  @Output() update = new EventEmitter<any>();
  @Output() view = new EventEmitter<any>();

  @Output() sortClicked = new EventEmitter<MatSort>();
  @Output() pageChanged = new EventEmitter<any>();

  @ViewChild(MatSort, { static: true }) matSort: MatSort;

  matDataSource = new MatTableDataSource();
  displayedColumns: string[] = [];
  isLoaded: boolean;

  ngOnInit(): void {
    // trigger if datasource is changed then tell mateDataSource
    this.matDataSource = new MatTableDataSource(this.dataSource);
    // set default sort by id
    if (this.tableColumnInfo) {
      this.matSort.sort(({ id: this.active || this.tableColumnInfo[0].name, start: this.sortDirection, disableClear: false }) as MatSortable);
      // avoid sort null
      this.matSort.disableClear = true;

      // Add displayed fields
      this.tableColumnInfo.map(_column => {
        this.displayedColumns.push(_column.name);
      });
      this.isLoaded = true;
    }
    this.templateContext.$implicit = this.dataSource;
    this.templateContext.item = this.tableColumnInfo;
  }

  ngAfterViewInit(): void {
  }

  ngOnChanges(): void {
    this.matDataSource = new MatTableDataSource(this.dataSource);
    const length = this.tableColumnInfo.length;
    // show field action if can delete or update    
    // in case action is not exist
    if ((this.canDeleteRow || this.canUpdateRow) && this.tableColumnInfo[length - 1] && this.tableColumnInfo[length - 1].name !== 'action') {
      this.tableColumnInfo.push({ key: this.tableColumnInfo.length + 1, label: 'Action', name: 'action' });
    }
    // index column in case showIdex is true
    // in case tblIndex is not exist
    // if (this.showIndex && this.tableColumnInfo[0] && this.tableColumnInfo[0].name !== 'tblIndex') {
    //   this.tableColumnInfo.unshift({ key: 0, label: '#', name: 'tblIndex' });
    // }
  }

  onSort(event): void {
    this.sortClicked.emit(event);
  }

  onPageChanged(event): void {
    if (!this.isLoaded) {
      return;
    }
    // const evt = event;
    this.pageChanged.emit(event);
  }

  /**
   * Sometime you want to get deeper value of object
   * Ex: plate->id, so you need to provide 'plate.id'
   * @param element 
   * @param keyStr single key or contains dot(.)
   */
  getValueBase(element: object, keyStr: string): any {
    this.templateContext.item = element;
    // split by dot(.)
    const keys = keyStr.split('.');
    // declare return val
    let val = element;
    keys.forEach(_key => {
      if (val) {
        // ex: plate[winner]
        // if keys more than one => plate[winner][id][...]
        val = val[_key];
      }
    });

    return val;
  }

  onDelete(id): void {
    if (id) {
      this.delete.emit(id);
    }
  }

  onUpdate(id): void {
    if (id) {
      this.update.emit(id);
    }
  }

  onView(id): void {
    if (id) {
      this.view.emit(id);
    }
  }

}
