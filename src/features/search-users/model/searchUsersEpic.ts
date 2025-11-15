import { User } from '@/entities/users';
import { Epic, ofType } from 'redux-observable';
import { from, of, throwError } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators';
import { searchUsersActions } from './searchUsersSlice';

export const searchUsersEpic: Epic = action$ =>
  action$.pipe(
    ofType(searchUsersActions.searchUsers.type),
    map(action =>
      (action as ReturnType<typeof searchUsersActions.searchUsers>).payload.trim()
    ),
    debounceTime(400),
    switchMap(query => {
      if (!query) {
        return of(searchUsersActions.searchUsersSuccess([]));
      }

      const url = new URL('https://dummyjson.com/users/search');
      url.searchParams.set('q', query);
      url.searchParams.set('limit', '5');

      return fromFetch(url.toString()).pipe(
        switchMap(response => {
          if (!response.ok) {
            return throwError(() => new Error('Не удалось получить данные'));
          }

          return from(response.json());
        }),
        map((res: { users: User[] }) => searchUsersActions.searchUsersSuccess(res.users)),
        catchError(error =>
          of(
            searchUsersActions.searchUsersError(
              error instanceof Error ? error.message : 'Неизвестная ошибка'
            )
          )
        )
      );
    })
  );
