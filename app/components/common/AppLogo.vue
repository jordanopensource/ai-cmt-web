<script setup lang="ts">
// The "mrsd" mark — a single self-contained tile (dark background + orange
// comma), so unlike the old watch-tower icon it needs no light/dark variant
// swap. Inline SVG (not <img>) so the comma can be animated via CSS; classes
// (not ids) target the tile/comma since this can appear more than once on a
// page (e.g. TopBar + an onboarding step both mounted at once).
withDefaults(defineProps<{ size?: number | string; animated?: boolean }>(), {
  size: 35,
  animated: false
})
</script>

<template>
  <svg
    class="app-logo"
    :class="{ 'app-logo-animated': animated }"
    :width="size"
    :height="size"
    viewBox="0 0 207 207"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="mrsd"
  >
    <rect class="app-logo-bg" width="207" height="207" rx="44" fill="#172240" />
    <g class="app-logo-comma" fill="#F2A93B">
      <path
        transform="translate(0 207) scale(0.01 -0.01)"
        d="M6308 11758 c-2 -2334 0 -4310 5 -4393 22 -449 113 -994 243 -1454 395 -1404 1196 -2546 2342 -3336 l107 -74 25 23 c119 108 965 912 965 917 0 3 -63 53 -141 111 -231 173 -378 301 -600 522 -221 221 -310 324 -478 546 -568 753 -918 1676 -1020 2695 -15 149 -36 477 -36 568 l0 47 3340 0 3340 0 0 4035 0 4035 -4045 0 -4044 0 -3 -4242z"
      />
    </g>
  </svg>
</template>

<style scoped>
.app-logo-comma {
  transform-box: fill-box;
  transform-origin: center;
}

.app-logo-animated .app-logo-comma {
  animation: app-logo-bounce 0.9s ease-in-out infinite;
}

@keyframes app-logo-bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-18%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .app-logo-animated .app-logo-comma {
    animation: none;
  }
}
</style>
