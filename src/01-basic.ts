import { of, from, interval } from 'rxjs';
import { map, filter, take } from 'rxjs/operators';

// Example 1: simple synchronous stream
of(1, 2, 3)
  .pipe(map(x => x * 10))
  .subscribe(value => console.log('of →', value));

// Example 2: array converted into a stream
from(['A', 'B', 'C'])
  .pipe(filter(letter => letter !== 'B'))
  .subscribe(value => console.log('from →', value));

// Example 3: time-based stream
interval(1000)
  .pipe(take(3))
  .subscribe(value => console.log('interval →', value));
