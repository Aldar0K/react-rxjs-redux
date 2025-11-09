import { fromEvent } from 'rxjs';
import { map, throttleTime } from 'rxjs/operators';

const output = document.createElement('div');
output.id = 'click-log';
output.style.fontFamily = 'monospace';
output.style.padding = '1rem';
output.innerHTML = '<h2>Координаты кликов</h2><p>Кликните по странице.</p>';
document.body.appendChild(output);

const clicks = fromEvent<MouseEvent>(document, 'click');

clicks
  .pipe(
    throttleTime(1000),
    map(e => ({ x: e.clientX, y: e.clientY }))
  )
  .subscribe(pos => {
    console.log('click:', pos);
    document.body.insertAdjacentHTML(
      'beforeend',
      `<pre>click: x=${pos.x}, y=${pos.y}</pre>`
    );
  });
