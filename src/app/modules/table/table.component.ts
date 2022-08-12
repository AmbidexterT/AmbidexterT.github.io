import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {DataService} from "../../services/data.service";
import {FormControl} from "@angular/forms";

export interface tableData {
  id: string;
  wbRating: number;
  reviewsCount: number;
  nomenclature: number;
  sku: string;
  name: string;
  brandName: string;
  brandId: string;
  image: string;
  preview: string;
  ordered: number;
  soldQuantity: number;
  soldAmount: number;
  orderedAmount: number;
  availability: number;
}

export interface filterData {
  name: string;
  columnProp: string;
  options: Array<any>;
  modelValue?: any;
}

@Component({
  selector: 'app-table',
  styleUrls: ['table.component.css'],
  templateUrl: 'table.component.html',
  providers: [DataService]

})
export class TableComponent implements AfterViewInit, OnInit {
  columns: string[] = ['id', 'wbRating', 'reviewsCount', 'nomenclature', 'sku', 'name', 'brandName', 'brandId', 'image', 'preview', 'ordered', 'soldQuantity', 'soldAmount'];
  dataSource: MatTableDataSource<tableData> = new MatTableDataSource();
  data: tableData[] | undefined;
  filterSelectObj: filterData[] = [];
  filterValues = {};
  globalFilter: boolean = false;
  globalFilterValue: string | undefined;
  filteredValues = {
    id: '',
    wbRating: '',
    reviewsCount: '',
    nomenclature: '',
    sku: '',
    name: '',
    brandName: '',
    brandId: '',
    image: '',
    preview: '',
    ordered: '',
    soldQuantity: '',
    soldAmount: '',
    orderedAmount: '',
    availability: ''
    };

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;
  /** ChangeDetection for updating filteredDatafor multiply filter */
  constructor(private dataService: DataService, private chRef: ChangeDetectorRef) {
    this.filterSelectObj = [
      {
        name: 'Name',
        columnProp: 'name',
        options: []
      },
      {
        name: 'Nomenclature',
        columnProp: 'nomenclature',
        options: []
      }
    ]
  }

  ngOnInit(): void {
    this.data = this.dataService.getDataTable();
    this.filterSelectObj.filter((o) => {
      o.options = this.getFilterObject(this.data, o.columnProp);
    });
    this.dataSource = new MatTableDataSource(this.data);
  }

  ngAfterViewInit() {
    this.dataSource.filter = JSON.stringify(this.filteredValues);
    this.dataSource.filterPredicate = this.createFilter();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /** FILTER */
  getFilterObject(fullObj: tableData[] | undefined, key: string) {
    const uniqChk: any[] = [];
    fullObj?.filter((obj) => {
      // @ts-ignore
      if (!uniqChk.includes(obj[key])) {
        // @ts-ignore
        uniqChk.push(obj[key]);
      }
      return obj;
    });
    return uniqChk;
  }
  /** Create a filter that filtered multiply column at the same time (also top search bar and selected comboboxes) */
  createFilter() {
    const filterPredicate = (data: tableData, filter: string,): boolean => {
      let searchString = JSON.parse(filter.toString());
      let searchFilterValues = JSON.parse(JSON.stringify(this.filterValues));
      if (searchFilterValues.nomenclature === 'all') {
        delete searchFilterValues['nomenclature']
      }
      if (searchFilterValues.name === 'all') {
        delete searchFilterValues['name']
      }
      if (this.globalFilter && this.globalFilterValue) {
        let dataContains = false;
        for (let col of Object.keys(data)) {
          // @ts-ignore
          var dataCol = data[col];
          if(dataCol.toString().trim().toLowerCase().indexOf(searchString) !== -1){
            dataContains = true;
            break;
          }
        }
        if (searchFilterValues.nomenclature && searchFilterValues.name) {
          return dataContains && data.nomenclature.toString().trim().toLowerCase().indexOf(searchFilterValues.nomenclature.toLowerCase()) !== -1 &&
            data.name.toString().trim().toLowerCase().indexOf(searchFilterValues.name.toLowerCase()) !== -1;
        } else if (searchFilterValues.nomenclature) {
          return dataContains && data.nomenclature.toString().trim().toLowerCase().indexOf(searchFilterValues.nomenclature.toLowerCase()) !== -1
        } else if (searchFilterValues.name) {
          return dataContains && data.name.toString().trim().toLowerCase().indexOf(searchFilterValues.name.toLowerCase()) !== -1
        } else {
          return false;
        }
      }
      if (searchFilterValues.nomenclature && searchFilterValues.name) {
        return data.nomenclature.toString().trim().toLowerCase().indexOf(searchFilterValues.nomenclature.toLowerCase()) !== -1 &&
          data.name.toString().trim().toLowerCase().indexOf(searchFilterValues.name.toLowerCase()) !== -1;
      } else if (searchFilterValues.nomenclature) {
        return data.nomenclature.toString().trim().toLowerCase().indexOf(searchFilterValues.nomenclature.toLowerCase()) !== -1
      } else if (searchFilterValues.name) {
        return data.name.toString().trim().toLowerCase().indexOf(searchFilterValues.name.toLowerCase()) !== -1
      }
      return true;
    }
    return filterPredicate;
  }

  /** Create a filter that cfiltered multiply column at the same time */
  filterChange(filter: filterData, event: Event) {
    if (!this.filterValues) {
      this.globalFilter = false;
    }
    // @ts-ignore
    this.filterValues[filter.columnProp] = event.target.value.trim().toLowerCase();
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  resetFilters() {
    this.filterValues = {}
    this.filterSelectObj.forEach((value) => {
      value.modelValue = undefined;
    })
    this.dataSource.filter = "";
  }

  applySearch(event: Event) {
    this.globalFilter = true;
    const filterValue = (event.target as HTMLInputElement).value;
    this.globalFilterValue = filterValue.trim().toLowerCase();
    this.dataSource.filter = JSON.stringify(filterValue.trim().toLowerCase());

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}


