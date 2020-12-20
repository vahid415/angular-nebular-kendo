import {Filter} from "./filter.dto";
import {GridSort} from "./sort.dto";

export class PagingRequest {
  start: number;
  size: number;
  filters = new Array<Filter>();
  sort: GridSort;

  constructor(start?: number, size?: number, filters?: Filter[], sort?: GridSort) {
    this.start = start;
    this.size = size;
    this.filters = filters ? filters : new Array<Filter>();
    this.sort = sort;
  }
}
