<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="flex min-h-screen items-center justify-center p-4">
	<div class="w-full max-w-md text-center">
		<div class="card bg-base-200 shadow-xl">
			<div class="card-body items-center gap-4">
				<h1 class="text-5xl font-bold text-error">{$page.status}</h1>
				<p class="text-lg text-base-content">{$page.error?.message || 'Something went wrong'}</p>
				<div class="mt-4 card-actions">
					<a href="/" class="btn btn-primary">Try Again</a>
				</div>
			</div>
		</div>
	</div>
</div>
