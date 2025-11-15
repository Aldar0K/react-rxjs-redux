import { usersActions } from '@/features/users/model/usersSlice';
import { selectUsersData, selectUsersError, selectUsersLoading } from '@/features/users';
import { Button } from '@/shared/ui';
import { useAppDispatch, useAppSelector } from '@/shared/utils';

export function UsersEpicDemo() {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectUsersData);
  const loading = useAppSelector(selectUsersLoading);
  const error = useAppSelector(selectUsersError);

  return (
    <div className="space-y-4">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Redux Observable
        </p>
        <h2 className="text-2xl font-bold tracking-tight">Загрузка пользователей</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Кнопка диспатчит action <code>fetchUsers</code>, а epic выполняет запрос на
          DummyJSON и отменяет предыдущие запросы через <code>switchMap</code>.
        </p>
      </header>
      <Button onClick={() => dispatch(usersActions.fetchUsers())} disabled={loading}>
        {loading ? 'Загрузка...' : 'Загрузить пользователей'}
      </Button>
      {error && <p className="text-sm text-destructive">Ошибка: {error}</p>}
      <ul className="grid gap-2 text-sm font-medium text-foreground">
        {data.map(user => (
          <li key={user.id} className="rounded-xl border border-border/70 px-4 py-2">
            {user.firstName}
          </li>
        ))}
      </ul>
    </div>
  );
}
