import { Todo } from './todo.model';

export const todoProviders = [
  {
    provide: 'TODO_REPOSITORY',
    useValue: Todo,
  },
];