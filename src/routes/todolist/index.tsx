import { component$, $, useStore, useContext } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { loader$, Form } from '@builder.io/qwik-city';
import { getList, addToListAction } from '../../state/todoState';
import ShowList from './ShowList';
import { USER_CTX } from '~/state/userProfile';

// loader$ can only be used on index of page
// so todoState can only be used within this page
export const listLoader = loader$(getList);

export default component$(() => {
  const list = listLoader.use();
  const add = addToListAction.use();
  const context = useContext(USER_CTX);

  const localStore = useStore({
    itemCount: 0
  })
  // 
  const reduceCount$ = $(() => { localStore.itemCount--; context.lastAction = 'Remove';  });
  const addCount$ = $(() => { localStore.itemCount++; context.lastAction = 'Add'; });

  return (
    <>
      <h1>ToDo List for {context.name} - action: {context.lastAction}</h1>
      
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
