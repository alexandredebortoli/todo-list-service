export class TodoDTO {
  readonly uid: string
  readonly title: string
  readonly description: string
  readonly time: string
  readonly completed: boolean
}

export class TodoListDTO {
  data: TodoDTO[]
}