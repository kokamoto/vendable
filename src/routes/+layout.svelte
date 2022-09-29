<script lang="ts">
  import { auth } from '$lib/stores';
</script>

<header>
  <nav class="container d-flex flex-wrap justify-content-center align-items-center py-3 mb-4">
    <a class="me-md-auto" href="/">Vendable</a>
    <ul class="nav nav-pills d-flex align-items-center">
      <li class="nav-item"><a href="/about">About</a></li>
      { #if $auth.loggedIn }
      <li class="nav-item"><button type="button" class="btn btn-primary ms-3">Log Out</button></li>
      { :else }
      <li class="nav-item"><button type="button" class="btn btn-primary ms-3">Log In</button></li>
      { /if }
    </ul>
  </nav>
</header>
<main>
  <div class="container"><slot></slot></div>
</main>
<footer></footer>