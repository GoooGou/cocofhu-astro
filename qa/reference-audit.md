# cocofhu.com reference audit

Reviewed 2026-10-26 against the captured `reference/index.html`, `reference/style.css`, and `reference/main.js`. This is a source inspection and test plan, not a claim that the rebuilt page passed browser tests. The separate Chrome session could not start because the shared Chrome profile was already in use.

## Locked visual system

- Cream `#fff8ef` ground, pink `#f2d8e4` dots every 26px, ink `#3b2f4a`, 3px outlines, 6px offset ink shadows.
- Fredoka for Latin; platform CJK stack for Chinese. Preserve the downloaded variable font rather than substituting a generic rounded typeface.
- Hero: max width 1200px, columns 1.05fr / .95fr, minimum height `max(560px, 100vh - 130px)`, padding 110px / fluid 18–48px / 40px. H1 uses seven separate pastel tiles, alternating −4° / +3° rotation.
- Recent: five illustrated cards, 2-column desktop grid, fifth card spans both columns. About: quote/peek-cat panel plus two actual external links. Avoid replacing these with a conventional marketing hero or features section.
- Tape pair angles −2.4° and +2°; 30s forward and 36s reverse. Deterministic ransom-note tile variation is intentional.

## Interaction acceptance checklist

- [ ] Intro opens after 1750ms, starts the page 380ms later, and removes its overlay 1300ms after opening. Any click or key skips it. It must never trap the page if initialization fails.
- [ ] Pointer hover on each title tile retriggers a 550ms jiggle.
- [ ] Cat eyes follow pointer (maximum 6px horizontally / 5px vertically). Float period 2.6s; blink period 4.2s; tail wiggle 1.3s.
- [ ] Cat forms cycle `yume → kaito → kurumi → hanli → yozora → sakura → soda → nemu → yume`, with corresponding translated speech. Pointer activation occurs on `pointerdown`; keyboard activation occurs on `click` with detail 0. A single input must advance only once.
- [ ] Cat squash uses spring K=1100, damping C=30, 4 integration substeps, dt capped at 32ms; swap at squash >= .78. Rapid inputs retarget from the current state without a lockout. Pointerup/cancel/leave/blur clears the pressed state.
- [ ] Intro/card annotation buttons open on hover, focus, or tap; only one tap-open bubble stays open; outside tap closes. Bubble placement clamps to 10px from the viewport edge and remains correct after language switching.
- [ ] Language selection respects `?lang=zh|en`, then saved `cocofhu-lang`, then browser language. Toggle updates HTML lang, title, description, labels, hero, all cards, about, footer, tape, chapter tiles, cat speech and calling card; persistence survives reload.
- [ ] Recent/about anchor jumps use a circular wipe (520ms cover, 600ms uncover). Reduced motion jumps directly. Back-to-top reaches scrollY 0.
- [ ] Scroll reveals run once with IntersectionObserver threshold .18 and bottom root margin −6%; all content remains readable if IO is unavailable. Card illustration timelines remain active after reveal.
- [ ] Header hides when scrolling down by >6px after y=240, returns on upwards movement >6px or y<120. A hidden header must not hide a keyboard-focused control.
- [ ] Buddy appears when hero bottom is above .35 viewport height; changes section speech, tilts with scroll velocity, settles after 140ms; click returns to top. About cat peeks when its panel top passes .7 viewport height.
- [ ] Thief hover/focus stops its 11s dash and reveals mini card. First pointer click toggles mini card; mini-card click opens full dialog; keyboard activation opens dialog directly.
- [ ] Calling-card dialog locks background scrolling, moves focus to close, traps Tab (only one control), closes on Escape, backdrop, or close button, restores focus to opener. Body and title match the selected language.
- [ ] GitHub/profile and Grasp links resolve to the original destinations; blog card links to cocofhu.com. All target=_blank links retain noopener.

## Responsive checkpoints

| Width | Original layout contract | Specific check |
| --- | --- | --- |
| 1440 / 1280 / 1024 | Two-column hero and recent cards | Tile H1 and cat card must not overlap; original vertical rhythm |
| 900 / 768 | Hero changes to one column, cat moves before copy; stage max 400px / 88%; cards and About collapse | Check immediately around 900px, including 901px |
| 560 / 414 / 375 | Text navigation links disappear; hero top 84px; stage max 340px; card illustrations 200px high; buddy 64px | Header logo/language/GitHub all remain reachable; no tooltip clipping |
| 320 | Same phone rules | Header collision and footer cat row clipping are plausible from intrinsic widths; verify actual element bounds, not just scrollWidth |

At 320px the footer has only 280px content width but its six cats have 48px minimum widths plus gaps (~320px total). The original `overflow-x:hidden` can conceal clipping. This is a calculated source-level concern, awaiting browser measurement; it is not a verified screenshot failure.

## Accessibility / resilience gaps to repair without restyling

1. **No-JS blocker, confirmed in source:** `.intro` is fixed over the entire screen and is not gated by `.js`; with JS disabled it never disappears. Add a no-JS rule. Cat SVGs, tapes and raster are JS-generated; SSR their initial state so the page remains visually complete.
2. **Runtime reduced-motion change:** the script samples the media query only on startup. CSS disables animation immediately, but the `.js:not(.rm)` initial opacity/scale rules remain if the preference changes later. Synchronize a MediaQueryList change listener, reveal all content, clear active inline spring transforms, and remove intro-on/overlays. Test reducing motion both before load and after initial reveal.
3. **RM semantics:** keep cat cycling, language switching, tooltips and dialog usable; disable float, blinking, tape, reveal travel, pointer-follow and spring/scroll tilt. Original reduced-motion CSS leaves a dialog opacity transition of .3s; this is not essential to retain.
4. **Keyboard focus:** ensure header returns on focusin; original hide behavior is scroll-only. Decorative SVGs stay aria-hidden; controls have labels. Hero text remains an H1 and sections remain H2s.
5. **Small text contrast:** original hot pink `#ff6f91` on cream/paper is unsuitable for small textual labels. Measure kicker-pill/LIVE/logo accent and focus indicator contrast; preserve large decorative pink while using ink or a darker pink for actual small text. Record any slight accessibility-driven difference.
6. **Annotation semantics:** original tooltip text is nested inside the button, which makes its text part of the accessible name. A cleaner implementation gives each tooltip an ID and uses aria-describedby while maintaining the visible treatment. Escape should close tap-open annotations.
7. **Browser error resilience:** do not add `.js` hiding classes until initialization is ready, or provide a fail-safe that removes hiding after an initialization exception. Original inline script sets `.js` before the main bundle loads.

## Recommended evidence

Capture desktop hero/recent/about, mobile full-page, and open calling card in both languages. Run at least 320/375/414/560/768/900/1024/1440 widths; check visible elements against the viewport instead of accepting hidden overflow. Run with JavaScript disabled, reduced motion at startup, reduced motion toggled after load, keyboard-only navigation, and rapid cat clicks. Keep `Hallmark` gate waivers tied to documented original design choices, never to broken functionality.
