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
    <div className="space-y-3">
      <header className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold">Таймер (interval + take)</h2>
        <p className="text-sm text-muted-foreground">Останавливается на 10 сек.</p>
      </header>
      <p className="text-4xl font-bold tracking-tight">
        {count}
        <span className="ml-2 text-base font-medium text-muted-foreground">сек.</span>
      </p>
    </div>
  );
}
