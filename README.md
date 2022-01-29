# **_`React-AllReq`_**

_Declarative conditional components and hooks for React._

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![License][license-image]][license-url]
[[changelog]](CHANGELOG.md)

---

```js
npm install @allreq/react
```

```js
yarn add @allreq/react
```

---

## Example

AllReq can check all children and all props automatically.

```jsx
import { AllReq } from '@allreq/react';

/* Required variables */

// title,
// language,
// rating,
// subtitle,
// description,
// image.

<AllReq Rejector={() => <h1>{'Loading...'}</h1>}>
  <Column>
    {description}
    <Title>{title}</Title>
    <Subtitle lang={language} rating={rating}>
      {subtitle}
    </Subtitle>
    <Description>{description}</Description>
  </Column>
  <Poster bg={image}></Poster>
</AllReq>;
```

And can be efficient.

```jsx
import { AllReq } from '@allreq/react';

/* with GraphQL or Any Query */

const {
  loading, // only check this variable.
  data: {
      movie
    } = {},
} = useQuery(GET_MOVIE, ...);

let isNotLoading = !loading || undefined;

// only check within Array of `With`.
<AllReq nodepth With={[isNotLoading]} Rejector={() => <h1>{'Loading...'}</h1>}>
  <Column>
    {movie.description}
    <Title>{movie.title}</Title>
    <Subtitle lang={movie.language} rating={movie.rating}>
      {movie.subtitle}
    </Subtitle>
    <Description>{movie.description}</Description>
  </Column>
  <Poster bg={movie.image}></Poster>
</AllReq>;
```

with original allreq literal function.

```jsx
import { allreq } from 'allreq'; // npm i allreq
import { AllReq } from '@allreq/react';

/* Required variables */

// title,
// language,
// rating,
// subtitle,
// description,
// image.

<AllReq Rejector={() => <h1>{'Loading...'}</h1>}>
  <Column>
    {description}
    <Title>{allreq`The title is ${title}`}</Title>
    <Subtitle>{allreq`${subtitle} lang: ${language} stars: ${rating}`}</Subtitle>
    <Description>{description}</Description>
  </Column>
  <Poster bg={image}></Poster>
</AllReq>;
```

---

## Arguments and Types

`[OPTIONS]`

```typescript
type AllReqProps<IN, OUT> = {
  // = default value
  With?: any[]; // = []
  Resolver?: Resolver<IN>; // = (arg) => arg !== undefined
  Rejector?: Rejector<IN, OUT>; // = () => ''
  Depth?: number;
  nodepth?: boolean;
  children?: ReactNode;
};
```

## **License**<br>

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/%40allreq%2Freact.svg
[npm-url]: https://npmjs.org/package/%40allreq%2Freact
[downloads-image]: https://img.shields.io/npm/dm/%40allreq%2Freact.svg
[downloads-url]: https://npmcharts.com/compare/%40allreq%2Freact?minimal=true
[license-url]: https://opensource.org/licenses/MIT
[license-image]: https://img.shields.io/npm/l/%40allreq%2Freact
