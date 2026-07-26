<script lang="ts">
	import { enhance } from '$app/forms';

	let { data } = $props();

	let expandedId = $state<number | null>(null);

	function formatDate(d: Date | string) {
		return new Date(d).toLocaleString('en-GB', {
			day: 'numeric',
			month: 'short',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}
</script>

<svelte:head>
	<title>Messages — Admin</title>
</svelte:head>

<div class="flex items-center justify-between">
	<h1 class="font-display text-2xl text-navy-950">Messages</h1>
	<p class="text-sm text-navy-800/60">{data.messages.length} total</p>
</div>

{#if data.messages.length === 0}
	<p class="mt-8 text-sm text-navy-800/60">No enquiries yet.</p>
{:else}
	<ul class="mt-8 divide-y divide-navy-900/10 border border-navy-900/10 bg-white">
		{#each data.messages as msg (msg.id)}
			<li class="p-5">
				<button
					type="button"
					class="flex w-full items-start justify-between gap-4 text-left"
					onclick={() => {
						expandedId = expandedId === msg.id ? null : msg.id;
					}}
				>
					<div class="flex items-start gap-3">
						{#if !msg.readAt}
							<span class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brass-500" aria-label="Unread"
							></span>
						{:else}
							<span class="mt-1.5 h-2 w-2 shrink-0"></span>
						{/if}
						<div>
							<p class="font-medium text-navy-950">
								{msg.name} <span class="font-normal text-navy-800/60">— {msg.email}</span>
							</p>
							<p class="mt-0.5 text-sm text-navy-800/60">
								{formatDate(msg.createdAt)}
							</p>
							{#if expandedId !== msg.id}
								<p class="mt-1 line-clamp-1 text-sm text-navy-800/70">{msg.message}</p>
							{/if}
						</div>
					</div>
				</button>

				{#if expandedId === msg.id}
					<p class="mt-3 ml-5 max-w-2xl text-sm whitespace-pre-wrap text-navy-800/80">
						{msg.message}
					</p>
					<div class="mt-4 ml-5 flex flex-wrap gap-3 text-xs">
						<form
							method="POST"
							action={msg.readAt ? '?/markUnread' : '?/markRead'}
							use:enhance
						>
							<input type="hidden" name="id" value={msg.id} />
							<button
								type="submit"
								class="border border-navy-900/20 px-3 py-1.5 tracking-wide text-navy-800 hover:border-brass-500 hover:text-brass-600"
							>
								Mark as {msg.readAt ? 'unread' : 'read'}
							</button>
						</form>
						<form
							method="POST"
							action="?/delete"
							use:enhance={() => {
								if (!confirm('Delete this message? This cannot be undone.')) {
									return async () => {};
								}
							}}
						>
							<input type="hidden" name="id" value={msg.id} />
							<button
								type="submit"
								class="border border-red-300 px-3 py-1.5 tracking-wide text-red-700 hover:bg-red-50"
							>
								Delete
							</button>
						</form>
					</div>
				{/if}
			</li>
		{/each}
	</ul>
{/if}
