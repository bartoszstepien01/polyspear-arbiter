<script lang="ts">
    import { page } from "$app/stores";
    import { pageTitle } from "$lib/stores";

    pageTitle.set("Błąd");
</script>

{$page.status}
<br/>
{$page.error?.message}