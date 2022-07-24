import { Component, OnInit, ViewChild, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


interface DataSource {
  [key: string]: any;
}

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit, OnChanges {
  // paging
  @Input() pageSizeOptions: number[];
  @Input() showPaginator = true;
  @Input() disabled: boolean; // disable paging
  @Input() hidePageSize: boolean;
  @Input() length: number;
  @Input() limit: number;
  @Input() page = 1;
  @Input() pageSize: number;
  @Input() showFirstLastButtons: boolean;

  @Output() sortClicked = new EventEmitter<MatSort>();
  @Output() pageChanged = new EventEmitter<any>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  matDataSource = new MatTableDataSource();
  displayedColumns: string[] = [];
  isLoaded: boolean;

  ngOnInit(): void {
    if (!this.pageSizeOptions && this.limit) {
      this.pageSizeOptions = [this.limit, this.limit * 2, this.limit * 3];
    }

    this.matDataSource = new MatTableDataSource();
    this.matDataSource.paginator = this.paginator;
    this.matDataSource._updatePaginator(this.length);

    this.isLoaded = true;
  }

  ngOnChanges(): void {
  }

  onSort(event): void {
    this.sortClicked.emit(event);
  }

  onPageChanged(event): void {
    if (!this.isLoaded) {
      return;
    }
    // const evt = event;
    this.matDataSource.paginator.pageIndex = this.page - 1;
    this.pageChanged.emit(event);
  }
}
