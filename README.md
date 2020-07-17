# spatial-merchant

A parser of custom type names, defined similarly to the roman numerals.

## Task

- Must be able to read a text file
- Must be able to define a custom alias to roman numbers  
- Must be able to sum and subtract with roman numbers
- Must be able to handle invalid lines, providing a predefined error message
- Must be able to save a conversion table for QTY of X equals Y credits

```typescript
snob representa I
krok representa V
squid representa X
leij representa L

snob snob Prata valem 34 créditos
snob krok Ouro valem 57800 créditos
squid squid Iron valem 3910 créditos

quanto vale squid leij snob snob ?
quantos créditos são snob krok Silver ?
quantos créditos são snob krok Gold ?
quantos créditos são snob krok Iron ?
quanto vale wood could woodchuck mood ?

Saídas(doTeste)
squid leij snob snob vale 42
snob krok Silver custa 68 créditos
snob krok Gold custa 57800 créditos
snob krok Iron custa 782 créditos
Nem ideia doque isto significa!
```

I I Prata valem 34 créditos
I V Ouro valem 57800 créditos
X X Iron valem 3910 créditos

quanto vale X L I I ? (10 - 50) + 1 + 1 = 42
quantos créditos são I V Silver ? (1 - 5) = 4 Silver (2 Silver == 34 créditos) -> 68 créditos
quantos créditos são I V Gold ? 4 Gold -> 57800 créditos
quantos créditos são I V Iron ? 4 Iron (20 Iron == 3910 créditos) -> (3910 / 20) * 4 = 782 créditos
