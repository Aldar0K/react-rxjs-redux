import { useEffect, useRef, useState } from 'react';
import { defer, fromEvent, of, throwError } from 'rxjs';
import {
  catchError,
  debounceTime,
  delay,
  distinctUntilChanged,
  map,
  startWith,
  switchMap
} from 'rxjs/operators';
import './App.css';

// db imitation
const technologies = [
  'Angular',
  'AngularJS',
  'Astro',
  'Cypress',
  'Express',
  'Next.js',
  'NestJS',
  'React',
  'React Native',
  'Redux',
  'Redux Observable',
  'RxJS',
  'Solid',
  'Svelte',
  'Vue',
  'Zustand'
];

// backend imitation
function fakeSearch(query: string) {
  return defer(() => {
    const normalized = query.toLowerCase();
    const matches = technologies.filter(item =>
      item.toLowerCase().includes(normalized)
    );

    const shouldFail = Math.random() < 0.15;
    if (shouldFail) {
      return throwError(() => new Error('Сервер временно недоступен'));
    }

    return of(matches);
  }).pipe(delay(500 + Math.random() * 500));
}


export function App() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [state, setState] = useState({
    query: '',
    results: [] as string[],
    loading: false,
    error: null as string | null
  });

  useEffect(() => {
    if (!inputRef.current) {
      return;
    }

    const subscription = fromEvent<InputEvent>(inputRef.current, 'input')
      .pipe(
        map(event => (event.target as HTMLInputElement).value),
        map(value => value.trim()),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(query => {
          if (!query) {
            return of({
              query: '',
              results: [] as string[],
              loading: false,
              error: null as string | null
            });
          }

          return fakeSearch(query).pipe(
            map(results => ({
              query,
              results,
              loading: false,
              error: null as string | null
            })),
            startWith({
              query,
              results: [] as string[],
              loading: true,
              error: null as string | null
            }),
            catchError(error =>
              of({
                query,
                results: [] as string[],
                loading: false,
                error:
                  error instanceof Error
                    ? error.message
                    : 'Неизвестная ошибка'
              })
            )
          );
        }),
        startWith({
          query: '',
          results: [] as string[],
          loading: false,
          error: null as string | null
        })
      )
      .subscribe(setState);

    return () => subscription.unsubscribe();
  }, []);

  const { query, results, loading, error } = state;

  return (
    <main className="app">
      <h1>Поиск по списку технологий</h1>
      <p className="app__hint">
        Ввод обрабатывается через RxJS: событийный поток из поля ввода
        проходит через <code>debounceTime</code> и <code>distinctUntilChanged</code>,
        а затем мы фильтруем массив.
      </p>

      <label className="field">
        <span>Запрос:</span>
        <input
          ref={inputRef}
          type="search"
          placeholder="Например, rx или react"
          autoComplete="off"
        />
      </label>

      {loading && <p className="status status--loading">Ищу совпадения...</p>}

      {error && (
        <p className="status status--error">
          Ошибка запроса: <span>{error}</span>
        </p>
      )}

      {!loading && !error && query === '' && (
        <p className="app__hint">Начните печатать, чтобы увидеть результаты.</p>
      )}

      {!loading && !error && query !== '' && results.length === 0 && (
        <p className="app__hint">Ничего не найдено для «{query}».</p>
      )}

      {!loading && !error && results.length > 0 && (
        <ul className="results">
          {results.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </main>
  );
}
