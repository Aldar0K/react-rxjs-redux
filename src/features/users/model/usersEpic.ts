import { Epic, ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { usersActions } from './usersSlice';

export const fetchUsersEpic: Epic = action$ =>
  action$.pipe(
    ofType(usersActions.fetchUsers.type),
    switchMap(() =>
      from(fetch('https://dummyjson.com/users?limit=5').then(res => res.json())).pipe(
        map((res: { users: { id: number; firstName: string }[] }) =>
          usersActions.fetchUsersSuccess(res.users)
        ),
        catchError(err =>
          of(usersActions.fetchUsersError(err instanceof Error ? err.message : 'Ошибка'))
        )
      )
    )
  );
