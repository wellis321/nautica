<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';

	let { data, form } = $props();

	let showAdd = $state(false);
	let resettingId = $state<number | null>(null);

	function formatDate(d: Date | string) {
		return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
	}
</script>

<svelte:head>
	<title>Staff — Admin</title>
</svelte:head>

<div class="flex items-center justify-between">
	<h1 class="font-display text-2xl text-navy-950">Staff</h1>
	<button
		type="button"
		onclick={() => (showAdd = !showAdd)}
		class="bg-navy-950 px-4 py-2 text-sm text-white hover:bg-navy-800"
	>
		{showAdd ? 'Cancel' : '+ Add Staff'}
	</button>
</div>

{#if form?.error}
	<p class="mt-4 border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">{form.error}</p>
{/if}

{#if showAdd}
	<form
		method="POST"
		action="?/create"
		use:enhance={() => async ({ update }) => {
			showAdd = false;
			await update();
		}}
		class="mt-4 grid gap-4 border border-navy-900/10 bg-white p-6 sm:grid-cols-3"
	>
		<div>
			<label class="block text-sm font-medium text-navy-950" for="new-name">Name</label>
			<input id="new-name" name="name" required class="mt-1 block w-full border-navy-900/20" />
		</div>
		<div>
			<label class="block text-sm font-medium text-navy-950" for="new-email">Email</label>
			<input id="new-email" name="email" type="email" required class="mt-1 block w-full border-navy-900/20" />
		</div>
		<div>
			<label class="block text-sm font-medium text-navy-950" for="new-password">Password</label>
			<input
				id="new-password"
				name="password"
				type="password"
				required
				minlength="8"
				class="mt-1 block w-full border-navy-900/20"
			/>
		</div>
		<div class="sm:col-span-3">
			<button type="submit" class="bg-brass-500 px-6 py-2 text-sm text-navy-950 hover:bg-brass-400">
				Create Account
			</button>
		</div>
	</form>
{/if}

<div class="mt-8 divide-y divide-navy-900/10 border border-navy-900/10 bg-white">
	{#each data.staff as member (member.id)}
		<div class="p-5">
			<div class="flex flex-wrap items-center justify-between gap-4">
				<div>
					<p class="font-medium text-navy-950">
						{member.name}
						{#if member.id === page.data.user?.id}
							<span class="text-xs text-navy-800/40">(you)</span>
						{/if}
					</p>
					<p class="text-sm text-navy-800/60">{member.email}</p>
					<p class="mt-1 text-xs text-navy-800/40">
						Joined {formatDate(member.createdAt)} ·
						{member.isActive ? 'Active' : 'Deactivated'}
					</p>
				</div>
				<div class="flex flex-wrap gap-2">
					<button
						type="button"
						onclick={() => (resettingId = resettingId === member.id ? null : member.id)}
						class="border border-navy-900/20 px-3 py-1.5 text-xs text-navy-800 hover:border-brass-500 hover:text-brass-600"
					>
						{resettingId === member.id ? 'Cancel' : 'Reset Password'}
					</button>
					{#if member.id !== page.data.user?.id}
						<form method="POST" action="?/toggleActive" use:enhance>
							<input type="hidden" name="id" value={member.id} />
							<input type="hidden" name="isActive" value={(!member.isActive).toString()} />
							<button
								type="submit"
								class="border border-navy-900/20 px-3 py-1.5 text-xs text-navy-800 hover:border-brass-500 hover:text-brass-600"
							>
								{member.isActive ? 'Deactivate' : 'Activate'}
							</button>
						</form>
						<form
							method="POST"
							action="?/delete"
							use:enhance={() => {
								if (!confirm(`Delete ${member.name}'s account?`)) return async () => {};
							}}
						>
							<input type="hidden" name="id" value={member.id} />
							<button
								type="submit"
								class="border border-red-300 px-3 py-1.5 text-xs text-red-700 hover:bg-red-50"
							>
								Delete
							</button>
						</form>
					{/if}
				</div>
			</div>

			{#if resettingId === member.id}
				<form
					method="POST"
					action="?/resetPassword"
					use:enhance={() => async ({ update }) => {
						resettingId = null;
						await update();
					}}
					class="mt-4 flex flex-wrap items-end gap-3 border-t border-navy-900/10 pt-4"
				>
					<input type="hidden" name="id" value={member.id} />
					<div>
						<label class="block text-xs font-medium text-navy-950" for="pw-{member.id}">
							New password
						</label>
						<input
							id="pw-{member.id}"
							name="password"
							type="password"
							required
							minlength="8"
							class="mt-1 block border-navy-900/20 text-sm"
						/>
					</div>
					<button type="submit" class="bg-brass-500 px-4 py-2 text-xs text-navy-950 hover:bg-brass-400">
						Set Password
					</button>
				</form>
			{/if}
		</div>
	{/each}
</div>
