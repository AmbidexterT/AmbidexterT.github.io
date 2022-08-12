import {Injectable} from '@angular/core';
import dataJson from '../../../src/data.json';

@Injectable()
export class DataService {
  public getDataTable() {
    return dataJson;
  }
}
