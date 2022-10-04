<script lang="ts">
  import auth from '$lib/stores/authStore';

</script>
<h1>Hi { $auth.user?.displayName }: Welcome to Vendable</h1>
<p>Start your vending machine adventure!!</p>
