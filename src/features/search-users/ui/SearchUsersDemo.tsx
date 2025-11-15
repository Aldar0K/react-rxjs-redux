import { Alert, AlertDescription, Badge, Input, Label } from '@/shared/ui';
import { useAppDispatch, useAppSelector } from '@/shared/utils';
import { searchUsersActions } from '../model/searchUsersSlice';
import {
  selectSearchQuery,
  selectSearchUsersError,
  selectSearchUsersLoading,
  selectSearchUsersResults,
} from '../model/searchUsersSelectors';

export function SearchUsersDemo() {
  const dispatch = useAppDispatch();
  const query = useAppSelector(selectSearchQuery);
  const loading = useAppSelector(selectSearchUsersLoading);
  const results = useAppSelector(selectSearchUsersResults);
  const error = useAppSelector(selectSearchUsersError);

  return (
    <div className="space-y-4">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Redux Observable Search
        </p>
        <h2 className="text-2xl font-bold tracking-tight">
          Реактивный поиск через store
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Поле ввода диспатчит action, а epic с <code>debounceTime</code> делает запрос к
          DummyJSON. Состояние хранится в Redux Toolkit.
        </p>
      </header>

      <div className="space-y-2">
        <Label htmlFor="search-users-input">Поиск пользователей</Label>
        <Input
          id="search-users-input"
          value={query}
          onChange={event => dispatch(searchUsersActions.searchUsers(event.target.value))}
          placeholder="Например, john"
          autoComplete="off"
          className="h-12 text-base"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {loading && <Badge variant="secondary">Загрузка...</Badge>}
        {!loading && query && <Badge variant="outline">Найдено: {results.length}</Badge>}
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>Ошибка: {error}</AlertDescription>
        </Alert>
      )}

      {!loading && !error && query === '' && (
        <p className="text-sm text-muted-foreground">
          Начните печатать, чтобы выполнить запрос к API.
        </p>
      )}

      {!loading && !error && query !== '' && results.length === 0 && (
        <p className="text-sm text-muted-foreground">Ничего не найдено для «{query}».</p>
      )}

      {!loading && results.length > 0 && (
        <ul className="grid gap-2 text-sm font-semibold">
          {results.map(user => (
            <li
              key={user.id}
              className="rounded-xl border border-border/70 bg-muted/30 px-4 py-3"
            >
              {user.firstName} {user.lastName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
