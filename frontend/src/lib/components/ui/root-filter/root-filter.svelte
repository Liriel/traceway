<script lang="ts">
	import * as Select from '$lib/components/ui/select';

	type Props = {
		value?: string;
	};

	let { value = $bindable('all') }: Props = $props();

	const options = [
		{ value: 'all', label: 'All' },
		{ value: 'root', label: 'Root' },
		{ value: 'non_root', label: 'Non-root' }
	];

	const label = $derived(options.find((o) => o.value === value)?.label ?? 'All');
</script>

<Select.Root type="single" bind:value>
	<Select.Trigger class="h-9 w-[120px] rounded-none border-r-0 shadow-none">
		{label}
	</Select.Trigger>
	<Select.Content>
		{#each options as option}
			<Select.Item value={option.value} label={option.label}>
				{option.label}
			</Select.Item>
		{/each}
	</Select.Content>
</Select.Root>
