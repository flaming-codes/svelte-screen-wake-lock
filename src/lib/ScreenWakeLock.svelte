<script lang="ts">
  import { browser } from "$app/env";

  import type { WakeLockSentinel } from "src/types";
  import { onDestroy, onMount, createEventDispatcher } from "svelte";

  /**
   * Disable the automatic request to lock
   * the wake screen on mount of the component.
   */
  export let lockOnMountDisabled: boolean = undefined;
  /**
   * Disable the automatic release of the lock.
   * Note: using this prop can lead to memory leaks.
   */
  export let unlockOnMountDisabled: boolean = undefined;

  /**
   * Captured reference to control and
   * lsiten to lock.
   */
  let sentinel: WakeLockSentinel = null;

  const dispatch = createEventDispatcher();

  export async function requestWakeLock() {
    if (!("wakeLock" in navigator)) {
      dispatch("error", new Error("unsupported"));
      return;
    }

    try {
      sentinel = await navigator.wakeLock.request();
      sentinel.addEventListener("release", () =>
        dispatch("change", { released: sentinel.released })
      );
      dispatch("change", { released: sentinel.released });
    } catch (error) {
      dispatch("error", error);
    }
  }

  /**
   * Manually release the lock. Can be access by
   * using `bind:this={ref}` and the calling
   * `ref.release()`.
   */
  export function release() {
    sentinel?.release();
    sentinel = null;
  }

  /**
   * React to visibiltiy changes, i.e. if the user
   * selects another tab and later returns to your
   * page that hosts the sentinel.
   */
  async function onVisibilityChange() {
    if (sentinel !== null && document.visibilityState === "visible") {
      await requestWakeLock();
    }
  }

  /**
   * Automatically use lock on mount, if not specifiied
   * otherwise in props.
   */
  onMount(async () => {
    if (!lockOnMountDisabled) await requestWakeLock();
    if (browser) document.addEventListener("visibilitychange", onVisibilityChange);
  });

  /**
   * Clean up on unmount, if not specified otherwise.
   */
  onDestroy(() => {
    if (!unlockOnMountDisabled) release();
    if (browser) document.removeEventListener("visibilitychange", onVisibilityChange);
  });
</script>
