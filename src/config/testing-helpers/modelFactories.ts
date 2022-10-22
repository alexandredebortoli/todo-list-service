import { Todo } from "src/modules/todo/models/todo.model";

export async function createTodo(
  uid: string,
  title: string,
  description: string,
  time: string,
  completed: boolean
): Promise<Todo> {
  const todo = await Todo.create({
    uid,
    title,
    description,
    time,
    completed
  });
  return todo;
}