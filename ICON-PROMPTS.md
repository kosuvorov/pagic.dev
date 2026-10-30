# Clay icon prompts

The page has a clay icon for each selling point. Until the real ones exist, simple
drawn placeholders sit in `assets/icons/`. To replace one, generate it with the
prompt below, save it as a **transparent PNG, 1024 × 1024**, and overwrite the file
with the same name. Nothing in the HTML needs to change.

Generate them in one conversation, one after another, so they come out as a family.
Paste the **shared style** first, then each icon's line.

## Shared style (paste once, before the first icon)

> I'm making a set of 3D icons for the Pagic browser extension website. Every icon
> must match this style exactly: a single handmade plasticine (modelling clay)
> object, soft rounded sculpted edges, subtle fingerprints and tiny imperfections,
> matte tactile surface, no plastic shine. Soft diffuse studio light from the upper
> left, gentle ambient shadow on the object only. Front three-quarter view, slightly
> from above. The object is centered with generous margin and fully visible.
> Palette only: coral #ef7158, lavender purple #8460bb, butter yellow #f3ce67, cream
> #f6efe3, with small touches of teal #5aa9a0 and deep plum #3e3a52 where needed.
> Truly transparent background: no floor, no backdrop, no glow, no gradient, no
> lettering, no logos, no UI. It should sit next to a clay open book (purple cover,
> yellow pages, coral bookmark) and a clay coral cursor as part of the same set.
> Square 1024 × 1024.

## The icons

| File | Selling point | Prompt |
| --- | --- | --- |
| `assets/icons/recolor.png` | Recolor any site | A chunky butter-yellow clay painter's palette with a thumb hole, holding four soft round blobs of clay paint: coral, purple, teal and deep plum. One blob has a little fingertip dent. |
| `assets/icons/hide.png` | Hide what you don't need | A plump clay eraser, half coral and half purple, tilted at 35 degrees, with a few small cream clay crumbs beside it, as if it just rubbed something out. |
| `assets/icons/notes.png` | Notes and drawings on any page | A slightly curled butter-yellow clay sticky note with three pressed grooves for handwriting, and a short chunky purple clay pencil with a coral tip leaning on its corner. |
| `assets/icons/remember.png` | Remembers every site | A soft purple clay bookmark ribbon standing upright with a notched bottom, a small butter-yellow clay star pressed onto it. |
| `assets/icons/privacy.png` | Stays in your browser | A rounded coral clay padlock with a thick lavender clay shackle and a deep plum keyhole, closed. |
| `assets/clay-book.webp` | Reader | Already done: the open clay book. |

## Optional extras

| File | Where | Prompt |
| --- | --- | --- |
| `assets/icons/sparkle.png` | Next to "Ask AI" in the FAQ, or a future AI feature tile | A chunky four-point lavender clay sparkle with a tiny butter-yellow clay sparkle beside it. |
| `assets/icons/switch.png` | The Simple / Advanced section | A clay toggle switch: a cream pill-shaped track with a coral knob slid to one side. |
| `assets/social.png` | The preview when the link is shared (1200 × 630) | Wide composition on a warm cream #faf7f2 background: the clay P wand logo on the left, the palette, sticky note and book icons arranged loosely on the right. Leave the left third calm for the words "Make the internet yours again." added later. |

If a result has a white or checkered background instead of real transparency, ask
again for "actual transparent alpha background", or remove it with
`magick in.png -fuzz 6% -transparent white out.png`.
