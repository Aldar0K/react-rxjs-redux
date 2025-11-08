// 5. Имитация реактивного поиска
const searchWrapper = document.createElement('section');
searchWrapper.style.border = '1px solid #ddd';
searchWrapper.style.borderRadius = '8px';
searchWrapper.style.padding = '12px 16px';
searchWrapper.style.background = '#f0f7ff';

const searchTitle = document.createElement('h2');
searchTitle.textContent = 'Реактивный поиск (debounce + switchMap)';
searchTitle.style.marginTop = '0';

const searchInput = document.createElement('input');
searchInput.type = 'search';
searchInput.placeholder = 'Введите запрос...';
searchInput.style.padding = '8px 12px';
searchInput.style.fontSize = '16px';
searchInput.style.width = '100%';
searchInput.style.boxSizing = 'border-box';

const resultsArea = document.createElement('div');
resultsArea.style.display = 'grid';
resultsArea.style.gap = '4px';
resultsArea.style.marginTop = '12px';
resultsArea.style.fontFamily = 'monospace';
resultsArea.innerHTML = '<pre>Наберите текст выше, чтобы увидеть результаты.</pre>';

searchWrapper.append(searchTitle, searchInput, resultsArea);
app.appendChild(searchWrapper);

const fakeDatabase = [
  'Angular',
  'AngularJS',
  'Cypress',
  'Express',
  'NestJS',
  'React',
  'React Native',
  'Redux Observable',
  'RxJS',
  'Solid',
  'Svelte',
  'Vue',
  'Zustand'
];

function fakeSearch(query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return of<string[]>([]).pipe(delay(200));
  }
  const matches = fakeDatabase.filter(item => item.toLowerCase().includes(normalized));
  return of(matches).pipe(delay(400));
}

fromEvent<InputEvent>(searchInput, 'input')
  .pipe(
    map(event => (event.target as HTMLInputElement).value),
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(query =>
      fakeSearch(query).pipe(map(results => ({ query, results })))
    )
  )
  .subscribe(({ query, results }) => {
    if (!query.trim()) {
      resultsArea.innerHTML = '<pre>Наберите текст выше, чтобы увидеть результаты.</pre>';
      return;
    }

    if (!results.length) {
      resultsArea.innerHTML = `<pre>"${query}" → ничего не найдено</pre>`;
      return;
    }

    resultsArea.innerHTML = results
      .map(item => `<pre>${item}</pre>`)
      .join('');
  });
