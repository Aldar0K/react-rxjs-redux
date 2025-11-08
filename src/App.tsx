import './App.css';
import Counter from './examples/Counter';
import ReactiveSearch from './examples/ReactiveSearch';
import Timer from './examples/Timer';

export function App() {
  return (
    <main className="app">
      <header className="app__header">
        <h1>RxJS + React Playground</h1>
        <p>
          Набор мини-компонентов демонстрирует интеграцию Observable-потоков в
          React через хук <code>useEffect</code> и корректную отписку.
        </p>
      </header>

      <section className="card">
        <Timer />
      </section>

      <ReactiveSearch />

      <Counter />
    </main>
  );
}
