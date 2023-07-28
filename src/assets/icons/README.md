# Custom Icons

## Adding new icons

1. Add the SVG file in the corresponding folder in `src/assets-internal/svg-icons`.
   If you are adding a whole new type of icons, create a new folder with the name as the type.

2. After that run `yarn run icons`.

3. Rebuild the app after the assets have been successfully linked.

If an error occurs, check that the folders and icons are named correctly and do not contain invalid characters like spaces.

## Usage examples

#### Basic

- using the KS_ICON enum is recommended
- default icon style is used (Outline)

```tsx
<KsIcon name={KS_ICON.ADD} />
<KsIcon name={'add'} />
<KsIcon name="activity" />
```

#### Different icon style

- if an icon is not present in the specified style, the icon will be searched in the other styles
- the default style does not have to be specified (like the three examples below)

```tsx
<KsIcon name={KS_ICON.ADD} bold />
<KsIcon name={'add'} bold />
<KsIcon name="activity" bold />

<KsIcon name={KS_ICON.ADD} bold={true} />
<KsIcon name={'add'} bold={true} />
<KsIcon name="activity" bold={true} />

<KsIcon name={KS_ICON.ADD} outline />
<KsIcon name={'add'} outline />
<KsIcon name="activity" outline />
```

#### Advanced icon

- `isBold` could be a boolean state or prop to toggle between outline and bold style
- size and color can be set

```tsx
<KsIcon name={KS_ICON.ADD} bold={isBold} size={50} color={theme.colors.primary500} />
<KsIcon name={KS_ICON.ADD} size={50} color={theme.colors.primary500} />
```
