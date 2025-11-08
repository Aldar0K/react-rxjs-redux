// 3. Интервал с остановкой через take(5)
const intervalView = createSection('interval(1000) с take(5)');

interval(1000)
  .pipe(
    map(i => i + 1),
    take(5)
  )
  .subscribe({
    next: value => addLog(intervalView.list, `tick → ${value}`),
    complete: () => addLog(intervalView.list, 'complete')
  });
