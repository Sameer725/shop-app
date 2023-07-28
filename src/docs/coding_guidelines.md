# Coding Style

## General

### No negations in ternary operators

Don't negate the condition in ternary operators as the `!` is easy to overlook.

Do

```tsx
paddingTop={title ? 0 : 5}
```

Don't

```tsx
paddingTop={!title ? 5 : 0}
```

### Keep UI state local if possible

For the UI, prefer local React state via `useState` over Redux state.

### No destructuring in function signatures

Destructure parameters at the beginning of the function body, not in the fuction signatures.

Do

```tsx
const UserProfile: React.FC<UserProfileProps> = (props) => {
  const { name } = props;
  return <>{name}</>;
};
```

Don't

```tsx
const UserProfile: React.FC<UserProfileProps> = ({ name }) => {
  return <>{name}</>;
};
```

### Use type aliases to declare Props types

Prefer type aliases to declare Props types outside the component definition. This makes it clearer which props can really be passed to a component, and together with avoiding props destructuring in the signature this makes the code more readable.

Do

```
export type MyComponentOwnProps { … };
export type MyComponentProps = MyComponentOwnProps & ViewProps;

export const MyComponent: React.FC<MyComponentProps> = …
```

Don't

```
export type MyComponentProps = { … };

export const MyConmponent = React.FC<MyComponentsOwnPros & ViewProps> = …
```

### Only pass needed properties to helpers

Helper functions tend to not need all the props that are passed into a component; use variables or separate types to pass the required data to helper functions.

Do

```tsx
const UserProfile: React.FC<UserProfileProps> = (props) => {
  const { id } = props;
  const { name } = getUserName(id);
  return <>{name}</>;
};
```

Don't

```tsx
const UserProfile: React.FC<UserProfileProps> = (props) => {
  const { name } = getUserName(props);
  return <>{name}</>;
};
```

## Naming

### Folder names

All folder names should use **`camelCase`**. There is no need to use PascalCase just because a folder might contain a React Native component.

### File names

- use **`camelCase.ts`** for all files that do not define a React Native component
- hooks should be defined in files named `use…`
- use **`PascalCase.tsx`** for files that define a React Native component

### Variable and function names

- use meaningful names
- don't shorten obvious variables like `event` to `ev`
- prefix booleans with `is` or `has` (exceptions like `should` or `can` are allowed if it improves the name; also see below)
- name booleans in a positive way
- prefix permissions with `can`, e.g. `canShop`
- avoid postfixes like `FC` on types or interfaces
- avoid postfixes like `Prop` at the end of variable names (bad example: `opacityProp`)
- handlers are prefixed with `on` → `onClick`
- only prefix custom hook functions with `use`. Hook functions include React hook functions like `useEffect`, `useState` and also custom hooks.
- avoid the `get` prefix for functions returning booleans, i.e. don't write `getIs…` or `getHas…`

Do

```ts
const isVisible = true;
const isPasswordCorrect = true;
const isYellowColorScheme = true;

const canShareWebcam = true;

// arrays
const hasFruits = ['apple', 'banana'].length > 0;

// functions
const onClick = (event) => event.target.value;

// types
type IconButtonProps = {
  opacity: number;
};

// hooks
const useUserProfile = (user: User) => {
  const [profile, userProfile] = useState();
  useEffect(() => {
    // do sth here...
  }, [user.id]);
  // ...
};
```

Don't

```ts
const visible = true;
const isWrongPassword = true;
const colorSchemeIsYellow = true;

const isWebcamSharingPossible = true;

// arrays
const containsFruits = ['apple', 'banana'].length > 0;

// functions
const click = (ev) => ev.target.value;

// types
type IconButtonPropsFC = {
  opacityProp: number;
};

// hooks
const useUserProfile = (user: User) => {
  const profile = user.profile; // <- actually no hook
  // ...
};
```

## Imports / exports

### No default exports

Avoid export defaults, prefer named exports instead. This has the following advantages:

- it helps IDEs and thus the developers with auto-imports
- you can search for the exported item by name and not only indirectly via the module name

Do

```tsx
// export
export const UserProfile = () => {};

// import
import { UserProfile } from './UserProfile';
```

Don't

```tsx
// export
const UserProfile = () => {};
export default UserProfile;

// import
import UserProfile from './UserProfile';
```

### Group exports

- exports should be located below all the imports
- exports should be grouped if necessary (e.g. in the `index.ts` file)
- don't use exports to group stuff inside a folder as this will make IDEs propose multiple import paths and can lead to importing a whole folder without the need to do so

## Comments

- express yourself with better names for variables, functions and properties
- rather simplify your code
- move the code to a function and provide a meaningful name with meaningful parameters and return types
- Add jsdoc to provide additional information to the code, when its API would be hard to understand (and further simplification isn't possible)
- sometimes a `why[did I do this]` comment makes sense (e.g. mention a related github issue)
- there never should be a `what[did I do]` comment, because that's part of your code.

## UI

### Components

- remove unused properties
- before you create a component, check if it is available; \
  if it is not, check what would be a good place:
  - common folder
  - specific to certain screens

### Colors

First of all, use themes to define colors; usually, they will have different values for dark vs. light themes.

Do not create colors only for a specific component or an element. Use colors defined in restyle as much as possible.

### Styles

Try to avoid inline styling as much as possible. If using restyle components is not possible, use StyleSheet to create new styles but make sure that
light mode or dark mode is not broken

### Sizes

- prefer theme units or design tokens over pixel values; in particular do not blindly copy pixel values from the design specs (figma etc)
- no odd or half (`"0.5px"`) pixel values (this might for example lead to blurry borders)
- 0 is always `0` and not `"0"` or `"0px"`

### Typescript

- avoid using `any` in all the cases. if you really need `any`, explore `unknown`.
- avoid ignoring the lint errors/warnings
- instead please consult with other developers if certain rules doesn't make sense to you

### Summary

Wherever you can, make use of the restyled with common design system or derived aggregated components instead of using explicit styling and hardcoded values.

Do

```ts
import { Text } from '@components/Text';

<Text variant="heading-4xl" paddingBottom="s1">
  {message}
</Text>;
```

Don't

```ts
import { Text } from 'react-native';

<Text style={{{ fontSize: 16, paddingBottom: 40 }}>{message}</Text>
```
