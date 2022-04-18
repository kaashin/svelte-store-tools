<script>
	import '../app.css';
	import '../prism-theme.css';
</script>

<style>
	:global(body) {
		background-color: rgb(35,35,35);
		color: rgb(230,230,230);
	}

	.container {
		display: flex;
		flex-direction: column;
		max-width: 900px;
		margin-left: auto;
		margin-right: auto;
	}
</style>

<div class="container">
	<slot />
</div>
