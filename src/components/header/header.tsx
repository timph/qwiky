import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { QwikLogo } from '../icons/qwik';
import styles from './header.css?inline';

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <header>
      <div class="logo">
        <a href="/" title="qwik">
          <QwikLogo />
        </a>
      </div>
      <ul>
        <li>
          <a href="/">
          Samples
          </a>
        </li>
        <li>
          <a href="https://qwik.builder.io/docs/components/overview/" target="_blank">
          Qwik-Docs
          </a>
        </li>
        <li>
          <a href="https://qwik.builder.io/examples/introduction/hello-world/" target="_blank">
            Qwik-Examples
          </a>
        </li>
        <li>
          <a href="https://qwik.builder.io/tutorial/welcome/overview/" target="_blank">
          Qwik-Tutorials
          </a>
        </li>
      </ul>
    </header>
  );
});
