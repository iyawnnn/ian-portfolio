// Deliberately its own tiny, non-"use client" module: `TextLoop.tsx` is a
// client component, and importing even a plain string constant from a
// "use client" file into a server component (WorkTransition) makes
// Next.js treat it as an unresolved client reference — using the value
// at server-render time throws "Attempted to call MARK_TOKEN() from the
// server but MARK_TOKEN is on the client." Keeping the constant here,
// with no client-only code in this file, lets both the client TextLoop
// and the server WorkTransition import the real value directly.
//
// A blank marker character used to anchor an Ian-mark's on-path position
// (via `getStartPositionOfChar` / `getRotationOfChar`). Deliberately a
// normal Unicode **space**-category character (Figure Space, U+2007) —
// not a zero-width "format" control character (e.g. U+2063): those are
// classified as join/shaping hints by some font-shaping engines and,
// tested here, visibly corrupted neighboring glyphs when embedded in
// bold uppercase `textLength`-fitted text-on-a-path. A real space has a
// normal, predictable advance width and never affects shaping — it's
// also distinct from the plain nbsp (U+00A0) already used for
// inter-word spacing elsewhere, so `indexOf` never confuses the two.
export const MARK_TOKEN = " ";
