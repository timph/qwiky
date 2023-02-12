import { component$ } from '@builder.io/qwik';
import { loader$, action$, zod$, z, Form, useStore } from '@builder.io/qwik-city';
import type { DocumentHead } from '@builder.io/qwik-city';

interface ListItem {
  text: string;
}

export const list: ListItem[] = [];

export const listLoader = loader$(() => {
  return list;
});

export const addToListAction = action$(
  (item, { fail }) => {
    try {
      list.push(item);
    }
    catch(e) {
      return fail(500, {
        message: 'Cannot add item',
      });
    }
    return {
      success: true,
    };
  },
  zod$( // validation schema of input
  {
    text: z.string(),
  })
);

export const removeFromListAction = action$(
  (item, { fail }) => {
    const idx = list.findIndex(li => li.text === item.text);

    if (idx < 0) {
      return fail(404, {
        message: `Cannot find item to remove - idx ${idx} - text ${item.text}`,
      });
    }
    list.splice(idx, 1);
    return {
      success: true,
    };
  }
);

export default component$(() => {
  const list = listLoader.use();
  const add = addToListAction.use();
  const remove = removeFromListAction.use();

  return (
    <>
      <h1>Form Action TODO list</h1>
      <ul>
        {list.value.map((item) => (
          <li>
            {item.text}{' '}
            <a href='#' preventdefault:click onClick$={() => remove.run(item)}>[X]</a>
            {remove.fail?.fieldErrors.name && <div>{remove.fail.message}</div>}
          </li>
        ))}
      </ul>
      <Form action={add} spaReset>
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
