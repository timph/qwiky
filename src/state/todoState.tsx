import { action$, zod$, z } from '@builder.io/qwik-city';

/**
 * State can be global with this setup
 * 
 */

interface ListItem {
  text: string;
}

export const list: ListItem[] = [];

export const getList = () => {
  return list;
}

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