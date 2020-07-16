import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from 'src/environments/environment';
import * as  fromTask from './ngrx-store/task.reducer';

export interface State {
  [fromTask.tasksFeatureKey]: fromTask.State;
}

export const reducers: ActionReducerMap<State> = {
  [fromTask.tasksFeatureKey]: fromTask.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
