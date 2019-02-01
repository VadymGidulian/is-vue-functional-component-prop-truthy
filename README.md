# is-vue-functional-component-prop-truthy
![npm peer dependency version](https://img.shields.io/npm/dependency-version/@vadym.gidulian/is-vue-functional-component-prop-truthy/peer/vue?style=flat-square)

Checks if a property passed to Vue functional component is truthy

## Usage

```js
const isTruthy = require(...)(options);

... = isTruthy(context, propName);
```

- `options`
    - `isPropsOmitted` (`false` by default)

        > Note: in versions before 2.3.0, the `props` option is required if you wish to accept props in a functional component. In 2.3.0+ you can omit the `props` option and all attributes found on the component node will be implicitly extracted as props.
        >
        > — [Vue.js Guide](https://vuejs.org/v2/guide/render-function.html#Functional-Components)

- `context` – the component's context
- `propName` – the property name

### Examples

```js
const isTruthy = require(...)();

module.exports = {
	functional: true,
	props: ['prop'],
	render(h, context) {
		const isProp = isTruthy(context, 'prop');
		...
	}
};
```
```js
const isTruthy = require(...)({isPropsOmitted: true});

module.exports = {
	functional: true,
	render(h, context) {
		const isProp = isTruthy(context, 'prop');
		...
	}
};
```

## Caveats

|Code                            |`isPropsOmitted`|`!isPropsOmitted`|`!isPropsOmitted`, `!props.includes('prop')`|
|--------------------------------|----------------|-----------------|--------------------------------------------|
|`<component/>`                  |`false`         |`false`          |`false`                                     |
|`<component prop/>`             |`true`          |`false`²         |`true`³                                     |
|`<component prop=""/>`          |`true`          |`false`²         |`true`³                                     |
|`<component prop="prop"/>`      |`true`          |`true`           |`true`³                                     |
|`<component prop="false"/>`     |`true`          |`true`           |`true`³                                     |
|`<component :prop="false"/>`    |`false`         |`false`          |`true`³                                     |
|`<component :prop="undefined"/>`|`false`         |`false`          |`true`³                                     |
|`<component :prop="null"/>`     |`false`         |`false`          |`true`³                                     |
|`<component :prop="0"/>`        |`false`         |`false`          |`true`³                                     |
|`<component :prop="NaN"/>`      |`false`         |`false`          |`true`³                                     |
|`<component :prop="''"/>`       |`true`¹         |`false`          |`true`³                                     |

1. `:prop="''"` considered the same as `prop=""`

2. `prop=""` considered the same as `:prop="''"`

3. Since `prop` is not declared as prop, it will be resolved to `true` as attribute, because of its presence
