import { component$, $, useStore } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { loader$, Form } from '@builder.io/qwik-city';
import { getList, addToListAction } from '../../state/todoState';
import ShowList from './ShowList';

// loader$ can only be used on index of page
export const listLoader = loader$(getList);

export default component$(() => {
  const list = listLoader.use();
  const add = addToListAction.use();

  const localStore = useStore({
    itemCount: 0
  })
  // 
  const reduceCount$ = $(() => localStore.itemCount--);
  const addCount$ = $(() => localStore.itemCount++);

  return (
    <>
      <h1>Form Action TODO list</h1>
      
      <ShowList list={list} reduceCount={reduceCount$} />
      Number of Items: {localStore.itemCount}
      <hr />
      
      <Form action={add} onSubmitCompleted$={addCount$} spaReset>
        <input type="text" name="text" required />
        <br/><br/>
        <button type="submit">Add item</button>
        <div class='fail-to-add'>
          {add.fail?.fieldErrors.name && <div>{add.fail.message}</div>}
        </div>
      </Form>
      <p>This little app works even when JavaScript is disabled.</p>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Todo List',
};
