import { v4 as uuid } from 'uuid';

export abstract class Entity {

  constructor(public id?: string) {
    this.id = id ? id : uuid();
  }
}
