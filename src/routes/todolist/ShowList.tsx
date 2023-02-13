import { $, component$ } from '@builder.io/qwik';
import { removeFromListAction } from '../../state/todoState';

export default component$(({ list, reduceCount }) => {
  const remove = removeFromListAction.use();

  const removeItem = $((item) => {
    remove.run(item); // run signal
    reduceCount();
  })

  return (
    <ul>
      {list.value.map((item) => (
        <li>
          {item.text}{' '}
          <a href='#' preventdefault:click onClick$={() => removeItem(item)}>[X]</a>
          {remove.fail?.fieldErrors.name && <div>{remove.fail.message}</div>}
        </li>
      ))}
    </ul>
  )
})