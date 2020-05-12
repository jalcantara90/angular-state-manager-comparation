import { Entity } from '../shared/entity.model';

type TaskStatus = 'pending' | 'completed';

export class Task extends Entity {
	public id: string;

	get isComplete(): boolean {
		return this.status === 'completed';
	}

	constructor(public description: string, public status: TaskStatus, id?: string) {
		super(id);
	}

	public toogleStatus(): Task {
		switch (this.status) {
			case 'pending':
				this.status = 'completed';
				break;
			case 'completed':
				this.status = 'pending';
				break;
			default:
				this.status = 'pending';
				break;
		}

		return new Task(this.description, this.status, this.id);
	}
}
