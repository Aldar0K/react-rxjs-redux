import { BehaviorSubject, interval, Subscription } from 'rxjs';

const counter$ = new BehaviorSubject<number>(0);
let autoIncrementSub: Subscription | null = null;

const increment = () => counter$.next(counter$.value + 1);
const decrement = () => counter$.next(counter$.value - 1);

const startAutoIncrement = (tickMs = 1000) => {
  if (autoIncrementSub) {
    return;
  }

  autoIncrementSub = interval(tickMs).subscribe(increment);
};

const stopAutoIncrement = () => {
  autoIncrementSub?.unsubscribe();
  autoIncrementSub = null;
};

export const counterService = {
  increment,
  decrement,
  observe: () => counter$.asObservable(),
  startAutoIncrement,
  stopAutoIncrement,
};
