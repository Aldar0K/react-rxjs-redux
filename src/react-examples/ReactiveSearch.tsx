import { Alert, AlertDescription, Badge, Input, Label } from '@/shared/ui';
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

export default function ReactiveSearch() {
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
    <div className="space-y-4">
      <header className="space-y-1">
        <h2 className="text-xl font-semibold">Реактивный поиск</h2>
        <p className="text-sm text-muted-foreground">
          Поток событий из поля ввода проходит через RxJS и имитирует запрос к API
          c <code>debounceTime</code>, <code>distinctUntilChanged</code> и{' '}
          <code>switchMap</code>.
        </p>
      </header>

      <div className="space-y-2">
        <Label htmlFor="reactive-search-input">Запрос</Label>
        <Input
          id="reactive-search-input"
          ref={inputRef}
          type="search"
          placeholder="Например, rx или react"
          autoComplete="off"
          className="h-12 text-base"
        />
      </div>

      {loading && (
        <Badge
          variant="secondary"
          className="inline-flex w-fit items-center gap-2 rounded-full px-4 py-1 text-sm font-medium"
        >
          <span className="h-2 w-2 animate-ping rounded-full bg-primary" />
          Ищу совпадения...
        </Badge>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertDescription>
            Ошибка запроса: <span className="font-semibold">{error}</span>
          </AlertDescription>
        </Alert>
      )}

      {!loading && !error && query === '' && (
        <p className="text-sm text-muted-foreground">
          Начните печатать, чтобы увидеть результаты.
        </p>
      )}

      {!loading && !error && query !== '' && results.length === 0 && (
        <p className="text-sm text-muted-foreground">
          Ничего не найдено для «{query}».
        </p>
      )}

      {!loading && !error && results.length > 0 && (
        <ul className="grid gap-2">
          {results.map(item => (
            <li
              key={item}
              className="rounded-xl border border-border/60 bg-muted/40 px-4 py-3 text-sm font-semibold"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

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
