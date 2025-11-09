// 4. Обратный отсчет с остановкой
const reverseTimerView = createSection('Обратный таймер');
const startFrom = 5;

timer(0, 1000)
  .pipe(
    map(i => startFrom - i),
    takeWhile(n => n >= 0)
  )
  .subscribe({
    next: value => addLog(reverseTimerView.list, `осталось → ${value}`),
    complete: () => addLog(reverseTimerView.list, 'Время вышло!'),
  });
