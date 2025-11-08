import { useEffect, useState } from 'react';
import { interval } from 'rxjs';
import { map, take } from 'rxjs/operators';

export default function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const sub = interval(1000)
      .pipe(
        take(10),
        map(v => v + 1)
      )
      .subscribe(setCount);

    return () => sub.unsubscribe();
  }, []);

  return (
    <div>
      <h2>Таймер</h2>
      <p>Seconds passed: {count}</p>
    </div>
  );
}
