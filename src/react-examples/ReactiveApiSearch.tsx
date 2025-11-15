import { useEffect, useRef, useState } from 'react';
import { from, fromEvent, of, throwError } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { Alert, AlertDescription, Badge, Input, Label } from '@/shared/ui';

interface ApiUser {
  id: number;
  firstName: string;
  lastName: string;
}

interface ApiState {
  query: string;
  loading: boolean;
  users: ApiUser[];
  error: string | null;
}

const emptyState: ApiState = {
  query: '',
  loading: false,
  users: [],
  error: null,
};

const searchUsers = (query: string) => {
  const url = new URL('https://dummyjson.com/users/search');
  url.searchParams.set('q', query);
  url.searchParams.set('limit', '5');

  return fromFetch(url.toString()).pipe(
    switchMap(response => {
      if (!response.ok) {
        return throwError(() => new Error('Не удалось получить данные'));
      }

      return from(response.json());
    })
  );
};

export default function ReactiveApiSearch() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [state, setState] = useState<ApiState>(emptyState);

  useEffect(() => {
    if (!inputRef.current) {
      return;
    }

    const sub = fromEvent<InputEvent>(inputRef.current, 'input')
      .pipe(
        map(event => (event.target as HTMLInputElement).value),
        map(value => value.trim()),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(query => {
          if (!query) {
            return of(emptyState);
          }

          return searchUsers(query).pipe(
            map(
              (res: { users: ApiUser[] }) =>
                ({
                  query,
                  loading: false,
                  users: res.users,
                  error: null,
                }) as ApiState
            ),
            startWith<ApiState>({
              query,
              loading: true,
              users: [],
              error: null,
            }),
            catchError(error =>
              of<ApiState>({
                query,
                loading: false,
                users: [],
                error: error instanceof Error ? error.message : 'Неизвестная ошибка',
              })
            )
          );
        }),
        startWith(emptyState)
      )
      .subscribe(setState);

    return () => sub.unsubscribe();
  }, []);

  const { query, loading, users, error } = state;

  return (
    <div className="space-y-4">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Реактивный fetch
        </p>
        <h2 className="text-2xl font-bold tracking-tight">Поиск по DummyJSON API</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Каждое изменение ввода превращается в API-запрос к <code>users/search</code> с
          отменой предыдущих запросов.
        </p>
      </header>

      <div className="space-y-2">
        <Label htmlFor="reactive-api-search">Поиск пользователей</Label>
        <Input
          id="reactive-api-search"
          ref={inputRef}
          placeholder="Введите имя, например: john"
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
          <AlertDescription>Ошибка запроса: {error}</AlertDescription>
        </Alert>
      )}

      {!loading && !error && query === '' && (
        <p className="text-sm text-muted-foreground">
          Начните печатать, чтобы выполнить запрос к API.
        </p>
      )}

      {!loading && !error && query !== '' && users.length === 0 && (
        <p className="text-sm text-muted-foreground">Ничего не найдено для «{query}».</p>
      )}

      {!loading && !error && users.length > 0 && (
        <ul className="grid gap-2">
          {users.map(user => (
            <li
              key={user.id}
              className="rounded-xl border border-border/60 bg-muted/40 px-4 py-3 text-sm font-semibold"
            >
              {user.firstName} {user.lastName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
