import { BehaviorSubject, Observable } from 'rxjs';
import { Entity } from './entity.model';

export class List<T extends Entity> {

  private dataSource: BehaviorSubject<T[]> = new BehaviorSubject([]);
  public data$: Observable<T[]> = this.dataSource.asObservable();

  constructor(data: T[]) {
    this.dataSource.next(data);
  }

  public add(newItem: T): void {
    const list = this.dataSource.value;
    list.push(newItem);

    this.dataSource.next(list);
  }

  public addTop(newItem: T): void {
    const list = this.dataSource.value;
    list.unshift(newItem);

    this.dataSource.next(list);
  }

  public removeById(id: string): void {
    let list = this.dataSource.value;
    list = list.filter( item => item.id !== id);

    this.dataSource.next(list);
  }

  public updateById(id: string, data: T): void {
    const list = this.dataSource.value;
    let item = list.find( item => item.id !== id);
    item = { ...item, ...data };

    this.dataSource.next(list);
  }
}
