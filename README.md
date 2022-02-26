# Svelte Screen Wake Lock API

This headless component allows you to use the [Screen Wake Lock API](https://web.dev/wake-lock/) to progressively enhance your PWA. Using the **Screen Wake Lock API** allows you to keep the display from dimming and shutting down, if both the browser as well as the OS allow it (e.g. user not in battery-save-mode).

## Install

```text
npm i -D svelte-screen-wake-lock
```

## Usage

### Basic

Simply import the component and mount it. Without any further configuration, the component will request to keep the screen on.

```svelte
<script lang="ts">
  import { ScreenWakeLock } from "svelte-screen-wake-lock";
</script>

<ScreenWakeLock />
```

### Un-/Mount effects

You can disable both the automatic request on mount as well as release of the lock on unmount.

```svelte
<script lang="ts">
  import { ScreenWakeLock } from "svelte-screen-wake-lock";
</script>

<ScreenWakeLock lockOnMountDisabled unlockOnMountDisabled />
```

### Events

You can also listen to dispatched events for the following use cases:

| Event | Value | Description |
| --- | --- | --- |
| on:change | `{ released: boolean }` | Object w/ flag if the lock is released. `false` means it's not released, i.e. active. |
| on:error | `Error` | Error event if somehting didn't work or the API isn't supported. |

```svelte
<script lang="ts">
  import { ScreenWakeLock } from "svelte-screen-wake-lock";

  const onChange = (event) => {
    console.log("SWL change", event.detail);
  }

  const onError = (event) => {
    console.log("SWL error", event.detail);
  }
</script>

<ScreenWakeLock on:change={onChange} on:error={onError} />
```

### Instance access

Finally, you can also directly access the instance and use the component's variables directly.

```svelte
<script lang="ts">
  import { ScreenWakeLock } from "svelte-screen-wake-lock";

  let ref;

  // Access the component's props.
  // ref. ...
</script>

<ScreenWakeLock bind:this={ref} />
```
