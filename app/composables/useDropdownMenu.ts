/**
 * Shared "only one open at a time" state for the top bar's dropdowns (page
 * switcher, notifications, language, theme, account menu). The id itself —
 * not a per-component boolean — is the single source of truth: opening one
 * clears whichever other id was set, outside click/Escape/navigation clear
 * it to null, and `isOpen` just compares the shared id to this instance's.
 */
function useOpenDropdownId() {
  return useState<string | null>('topbar-open-menu-id', () => null)
}

export function useDropdownMenu(id: string) {
  const openId = useOpenDropdownId()
  const containerRef = ref<HTMLElement | null>(null)
  const triggerRef = ref<HTMLElement | null>(null)

  const isOpen = computed(() => openId.value === id)

  function open() {
    openId.value = id
  }

  function close() {
    if (isOpen.value) openId.value = null
  }

  function toggle() {
    openId.value = isOpen.value ? null : id
  }

  function onDocumentPointerDown(event: PointerEvent) {
    if (!isOpen.value) return
    const target = event.target as Node | null
    if (containerRef.value && target && !containerRef.value.contains(target)) {
      close()
    }
  }

  function onDocumentKeydown(event: KeyboardEvent) {
    if (event.key !== 'Escape' || !isOpen.value) return
    close()
    triggerRef.value?.focus()
  }

  const route = useRoute()
  watch(() => route.fullPath, () => close())

  onMounted(() => {
    document.addEventListener('pointerdown', onDocumentPointerDown)
    document.addEventListener('keydown', onDocumentKeydown)
  })

  onUnmounted(() => {
    document.removeEventListener('pointerdown', onDocumentPointerDown)
    document.removeEventListener('keydown', onDocumentKeydown)
  })

  return { isOpen, open, close, toggle, containerRef, triggerRef }
}
