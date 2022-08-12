import {Injectable} from '@angular/core';
// @ts-ignore
import dataJson from '../../../src/data.json' assert {type: 'json'};

@Injectable()
export class DataService {
  public getDataTable() {
    return dataJson;
  }
}
