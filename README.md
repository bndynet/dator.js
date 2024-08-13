# dator.js

## CDN

```html
<script type="text/javascript" src="https://unpkg.com/@bndynet/dator/dist/index.js"></script>

<script>
  // dator.generate(...)
</script>
```


## Package

```shell
npm i @bndynet/dator -D
```

```typescript
import { generate } from '@bndynet/dator';

const mockData = generate(10, {
  Visits: {
    type: 'number',
    args: {
      min: 100,
      max: 10000,
    },
  },
  Views: {
    type: 'number',
    args: {
      min: 100,
      max: 10000,
    },
  },
  Hits: {
    type: 'number',
    args: {
      min: 100,
      max: 10000,
    },
  },
});
```
