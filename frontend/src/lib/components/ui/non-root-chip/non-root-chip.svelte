<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import * as Tooltip from '$lib/components/ui/tooltip';

	type Props = {
		mixed?: boolean;
	};

	let { mixed = false }: Props = $props();

	const label = $derived(mixed ? 'Mixed' : 'Non-root');
	const tooltip = $derived(
		mixed
			? 'Some runs were triggered by another trace — see the distributed trace view.'
			: 'Triggered by another trace — see the distributed trace view.'
	);
</script>

<Tooltip.Provider>
	<Tooltip.Root>
		<Tooltip.Trigger>
			<Badge variant="secondary" class="ml-2 text-[10px]">
				{label}
			</Badge>
		</Tooltip.Trigger>
		<Tooltip.Content>
			{tooltip}
		</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>
