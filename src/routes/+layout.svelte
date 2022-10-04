<script lang="ts">
  import auth from '$lib/stores/authStore';
	import { onMount } from 'svelte';

  onMount(() => {
    // Initialize Firebase
    auth.init();
    console.log('Initializing App with Firebase!')
  });
</script>

<header>
  <nav class="container d-flex flex-wrap justify-content-center align-items-center py-3 mb-4">
    <a class="me-md-auto" href="/">Vendable</a>
    <ul class="nav nav-pills d-flex align-items-center">
      <li class="nav-item"><a href="/about">About</a></li>
      { #if $auth.isLoggedIn }
      <li class="nav-item"><button type="button" class="btn btn-primary ms-3" on:click="{auth.logout}">Log Out</button></li>
      { :else }
      <li class="nav-item"><button type="button" class="btn btn-primary ms-3" on:click="{auth.login}">Log In</button></li>
      { /if }
    </ul>
  </nav>
</header>
<main>
  <div class="container"><slot></slot></div>
</main>
<footer></footer>