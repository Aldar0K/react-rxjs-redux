import { useEffect, useState } from 'react';
import { counterService } from './CounterService';

export default function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const sub = counterService.observe().subscribe(setCount);
    return () => sub.unsubscribe();
  }, []);

  return (
    <section className="card">
      <h2>Поведение через BehaviorSubject</h2>
      <p className="app__hint">
        Сервис хранит состояние в BehaviorSubject, а компонент только
        подписывается и вызывает действия.
      </p>
      <div className="counter">
        <button type="button" onClick={counterService.decrement}>
          −
        </button>
        <span>{count}</span>
        <button type="button" onClick={counterService.increment}>
          +
        </button>
      </div>
    </section>
  );
}
