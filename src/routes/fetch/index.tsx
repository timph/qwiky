import { component$, useContext, useStore, useTask$ } from '@builder.io/qwik';
import { USER_CTX } from '~/state/userProfile';

export default component$(() => {
  const context = useContext(USER_CTX)
  return (
    <div>
      <h1>Fetch for {context.name} - action: {context.lastAction}</h1>

      This example features an auto-complete component with a debounce of 150 ms.
      <br /><br />
      The function `debouncedGetPeople` needs to be exported because it is used in <a href="https://qwik.builder.io/tutorial/reactivity/explicit/">useTask$</a>.
      <br /><br />
      Go ahead, search for Star Wars characters such as "Luke Skywalker", it uses the{' '}
      <a href="https://swapi.dev/">Star Wars API</a>
      <br /><br />
      <AutoComplete></AutoComplete>
    </div>
  );
});

interface IState {
  searchInput: string;
  searchResults: string[];
  selectedValue: string;
}

export const AutoComplete = component$(() => {
  const state = useStore<IState>({
    searchInput: '',
    searchResults: [],
    selectedValue: '',
  });

  // function used inside useTask$ must be exported
  useTask$(async ({ track }) => {
    // tracking change of which properties should trigger this watch. 
    // The track function creates subscriptions in store
    const searchInput = track(() => state.searchInput);

    if (!searchInput) {
      state.searchResults = [];
      return;
    }

    const controller = new AbortController();
    state.searchResults = await debouncedGetPeople(searchInput, controller);

    return () => {
      controller.abort();
    };
  });

  return (
    <div>
      <input
        type="text"
        onInput$={(ev) => (state.searchInput = (ev.target as HTMLInputElement).value)}
      />
      <SuggestionsListComponent state={state}></SuggestionsListComponent>
    </div>
  );
});

export const SuggestionsListComponent = (props: { state: IState }) => {
  const searchResults = props.state.searchResults;
  return searchResults?.length ? (
    <ul>
      {searchResults.map((suggestion) => {
        return <li onClick$={() => (props.state.selectedValue = suggestion)}>{suggestion}</li>;
      })}
    </ul>
  ) : (
    <div class="no-results">
      <em>No suggestions, you re on your own!</em>
    </div>
  );
};

const getPeople = (searchInput: string, controller?: AbortController): Promise<string[]> =>
  fetch(`https://swapi.dev/api/people/?search=${searchInput}`, {
    signal: controller?.signal,
  })
    .then((response) => {
      return response.json();
    })
    .then((parsedResponse) => {
      return parsedResponse.results.map((people: { name: string }) => people.name);
    });

function debounce<F extends (...args: any[]) => any>(fn: F, delay = 500) {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<F>): Promise<ReturnType<F>> => {
    return new Promise((resolve) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        resolve(fn(...args));
      }, delay);
    });
  };
}

export const debouncedGetPeople = debounce(getPeople, 150);