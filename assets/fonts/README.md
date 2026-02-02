# Google Sans Fonts

This directory should contain the Google Sans font files:

- `GoogleSans-Regular.ttf`
- `GoogleSans-Medium.ttf`
- `GoogleSans-Bold.ttf`

## How to obtain

Google Sans (Product Sans) is Google's proprietary font. For personal/portfolio use, you can:

1. **Use Google Fonts alternative**: Download "Inter" or "Outfit" from [Google Fonts](https://fonts.google.com/) and rename/update the imports
2. **Extract from Google products**: Some developers extract these from Google apps (use at your own discretion)

## Alternative: Use Inter font

If you prefer to use a freely available alternative, update `_layout.tsx` to use Inter:

```tsx
const [fontsLoaded] = useFonts({
  "GoogleSans-Regular": require("../assets/fonts/Inter-Regular.ttf"),
  "GoogleSans-Medium": require("../assets/fonts/Inter-Medium.ttf"),
  "GoogleSans-Bold": require("../assets/fonts/Inter-Bold.ttf"),
});
```
