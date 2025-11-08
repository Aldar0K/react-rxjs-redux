import { Button } from '@/shared/ui';
import { useEffect, useState } from 'react';
import { counterService } from './CounterService';

export default function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const sub = counterService.observe().subscribe(setCount);
    return () => sub.unsubscribe();
  }, []);

  return (
    <div className="space-y-5">
      <header className="space-y-2">
        <h2 className="text-xl font-semibold">
          BehaviorSubject как мини-сервис состояния
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Компонент только подписывается и вызывает действия increment/decrement.
        </p>
      </header>

      <div className="flex items-center gap-6 rounded-2xl border border-border/60 bg-muted/30 px-5 py-4">
        <Button
          type="button"
          onClick={counterService.decrement}
          variant="secondary"
          size="icon"
          className="h-12 w-12 rounded-full text-xl font-bold"
        >
          -
        </Button>
        <span className="text-5xl font-semibold tabular-nums">{count}</span>
        <Button
          type="button"
          onClick={counterService.increment}
          size="icon"
          className="h-12 w-12 rounded-full bg-primary text-xl font-bold text-primary-foreground shadow hover:bg-primary/90"
        >
          +
        </Button>
      </div>
    </div>
  );
}
