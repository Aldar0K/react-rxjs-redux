import { BehaviorSubject } from 'rxjs';

const counter$ = new BehaviorSubject<number>(0);

export const counterService = {
  increment: () => counter$.next(counter$.value + 1),
  decrement: () => counter$.next(counter$.value - 1),
  observe: () => counter$.asObservable()
};
