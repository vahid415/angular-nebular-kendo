import { Observable } from 'rxjs';

export class TreeDto {
  public id: string;
  public children?: Observable<TreeDto[]>;
  public parent: TreeDto;
  public path: string;
  public name: string;
  public isLeaf: boolean;

  constructor(name: string, id: string, isLeaf: boolean, path: string) {
    this.id = id;
    this.path = path;
    this.name = name;
    this.isLeaf = isLeaf;
  }
}
