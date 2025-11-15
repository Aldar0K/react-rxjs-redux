import { usersActions } from '@/features/users/model/usersSlice';
import { selectUsersState } from '@/features/users';
import { Badge, Button } from '@/shared/ui';
import { useAppDispatch, useAppSelector } from '@/shared/utils';

export function UsersStoreDemo() {
  const dispatch = useAppDispatch();
  const { loading, data, error } = useAppSelector(selectUsersState);

  const statusLabel = loading ? 'загрузка' : error ? 'ошибка' : 'готово';
  const statusVariant = loading ? 'secondary' : error ? 'destructive' : 'default';

  return (
    <div className="space-y-4">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Redux Store
        </p>
        <h2 className="text-2xl font-bold tracking-tight">Состояние users</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Компонент читает данные напрямую из Redux Toolkit store и позволяет сбросить их
          в исходное состояние.
        </p>
      </header>

      <div className="flex flex-wrap items-center gap-3">
        <Badge variant={statusVariant} className="uppercase">
          статус: {statusLabel}
        </Badge>
        <Badge variant="outline">записей: {data.length}</Badge>
      </div>

      {error && <p className="text-sm text-destructive">Ошибка: {error}</p>}

      <Button
        variant="outline"
        onClick={() => dispatch(usersActions.resetUsers())}
        disabled={loading && !error}
      >
        Сбросить состояние
      </Button>

      <div className="rounded-xl border border-border/70 bg-muted/20 p-4 text-sm">
        <pre className="whitespace-pre-wrap break-words text-muted-foreground">
          {JSON.stringify(
            {
              loading,
              error,
              users: data.map(user => ({ id: user.id, firstName: user.firstName })),
            },
            null,
            2
          )}
        </pre>
      </div>
    </div>
  );
}
