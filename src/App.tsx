import { Card, CardContent } from '@/shared/ui';
import Counter from './react-examples/Counter';
import ReactiveSearch from './react-examples/ReactiveSearch';
import Timer from './react-examples/Timer';

export function App() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container space-y-6 py-10">
        <header className="space-y-2 text-center md:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            RxJS + React Playground
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Практика реактивности в компонентах
          </h1>
          <p className="text-muted-foreground">
            Мини-примеры показывают, как использовать Observable-потоки в React
            через <code>useEffect</code>, подписки и сервисы на базе RxJS.
          </p>
        </header>

        <Card>
          <CardContent className="p-6">
            <Timer />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <ReactiveSearch />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <Counter />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
