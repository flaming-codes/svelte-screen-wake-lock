# Svelte Screen Wake Lock API

This headless component allows you to use the [Screen Wake Lock API](https://web.dev/wake-lock/) to progressively enhance your PWA. Using the **Screen Wake Lock API** allows you to keep the display from dimming and shutting down, if both the browser supprots it as well as the OS allows it (e.g. user not in battery-save-mode).

## Install

```text
npm i svelte-screen-wake-lock
```

## Usage

### Basic

Simply important the component and mount it. Without any further configuration, the component will request to keep the screen on.

```svelte
<script lang="ts">
import { ScreenWakeLock } from "@fcx/screen-wake-lock";
</script>

<ScreenWakeLock />
```

### Un-/Mount effects

You can disble both the automatic request on mount as well as release of the lock on unmount.

```svelte
<script lang="ts">
import { ScreenWakeLock } from "@fcx/screen-wake-lock";
</script>

<ScreenWakeLock lockOnMountDisabled unlockOnMountDisabled />
```

### Events

You can also listen to dispatched events for the following use cases:
- release event
- error event

| Event | Value | Description |
| --- | --- | --- |
| on:released | `Boolean` | Flag if the lock is released. `false` means it's not released (i.e. active).
| on:error | `Error` | Error event if somehting didn't work or the API isn't supported.

```svelte
<script lang="ts">
import { ScreenWakeLock } from "@fcx/screen-wake-lock";

const onRelease = (event) => {
    console.log("SRL change", event.detail);
}

const onError = (event) => {
    console.log("SRL error", event.detail);
}
</script>

<ScreenWakeLock on:released={onReleased} on:error={onError} />
```

### Instance access

Finally, you can also directly access the instance and use the components variables directly.

```svelte
<script lang="ts">
import { ScreenWakeLock } from "@fcx/screen-wake-lock";

let ref;

// Access the component's props.
// ref. ...
</script>

<ScreenWakeLock bind:this={ref} />
```
