import { Observable } from 'rxjs';

export interface CrudOperations {
  save(entity: any): Observable<any>;

  update(entity: any): Observable<any>;

  findById(id: any): Observable<any>;

  getPage(searchModel: any): Observable<any>;

  delete(id: any): Observable<any>;

  active(id: any): Observable<any>;

  inActive(id: any): Observable<any>;
}
