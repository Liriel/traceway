<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { api } from '$lib/api';
	import { projectsState } from '$lib/state/projects.svelte';
	import { LoadingCircle } from '$lib/components/ui/loading-circle';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { PaginationFooter } from '$lib/components/ui/pagination-footer';
	import { toast } from 'svelte-sonner';
	import * as Table from '$lib/components/ui/table';
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Alert from '$lib/components/ui/alert';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Plus, Pencil, Trash2, Zap, ZapOff, Clock, Send, Info } from '@lucide/svelte';
	import { SearchBar } from '$lib/components/ui/search-bar';
	import { TableEmptyState } from '$lib/components/ui/table-empty-state';

	import ChannelDialog from './channel-dialog.svelte';
	import RuleDialog from './rule-dialog.svelte';
	import SnoozeDialog from './snooze-dialog.svelte';

	interface NotificationChannel {
		id: number;
		projectId: string;
		name: string;
		channelType: string;
		config: any;
		enabled: boolean;
		createdAt: string;
	}

	interface NotificationRule {
		id: number;
		projectId: string;
		channelId: number;
		name: string;
		ruleType: string;
		config: any;
		enabled: boolean;
		cooldownMinutes: number;
		snoozedUntil: string | null;
		channelName: string;
		channelType: string;
		createdAt: string;
	}

	interface NotificationHistory {
		id: number;
		ruleType: string;
		ruleName: string;
		channelName: string;
		severity: string;
		subject: string;
		body: string;
		status: string;
		errorMessage: string | null;
		createdAt: string;
	}

	const ruleTypeLabels: Record<string, string> = {
		error_rate_threshold: 'Error Rate',
		endpoint_p95_threshold: 'Endpoint P95',
		endpoint_p99_threshold: 'Endpoint P99',
		apdex_drop: 'Apdex Drop',
		metric_threshold: 'Metric Threshold',
		no_data: 'No Data',
		error_count_threshold: 'Error Count',
		task_duration_threshold: 'Task Duration',
		task_failure_rate: 'Task Failure Rate',
		throughput_drop: 'Throughput Drop',
		endpoint_error_rate: 'Endpoint Error Rate',
		new_error: 'New Issue',
		error_regression: 'Error Regression',
		impact_score_critical: 'Impact Score Critical',
		impact_score_high: 'Impact Score High',
		impact_score_medium: 'Impact Score Medium'
	};

	const channelTypeLabels: Record<string, string> = {
		email: 'Email',
		webhook: 'Webhook',
		slack: 'Slack',
		github: 'GitHub'
	};

	const tabDescriptions: Record<string, string> = {
		channels:
			'Channels define where your notifications are delivered — such as Email, Slack, Webhooks, or GitHub Issues. Create a channel first, then attach it to a rule.',
		rules: 'Rules define when notifications are triggered. Each rule monitors a specific condition and sends an alert through the attached channel when that condition is met.',
		history:
			'A log of all notifications that have been sent, including their status and the rule that triggered them.'
	};

	const activeTab = $derived(page.url.searchParams.get('tab') || 'channels');

	function setTab(tab: string) {
		const url = new URL(window.location.href);
		url.searchParams.set('tab', tab);
		goto(url.toString(), { replaceState: true, noScroll: true });
	}

	let channels = $state<NotificationChannel[]>([]);
	let channelsLoading = $state(true);

	let rules = $state<NotificationRule[]>([]);
	let rulesLoading = $state(true);

	let history = $state<NotificationHistory[]>([]);
	let historyLoading = $state(true);
	let historyPage = $state(1);
	let historyPageSize = $state(25);
	let historyTotal = $state(0);
	let historyTotalPages = $state(0);
	let searchQuery = $state('');

	let channelDialogOpen = $state(false);
	let editingChannel = $state<NotificationChannel | null>(null);
	let ruleDialogOpen = $state(false);
	let editingRule = $state<NotificationRule | null>(null);
	let snoozeDialogOpen = $state(false);
	let snoozeRuleId = $state<number | null>(null);

	let showDeleteChannelDialog = $state(false);
	let deletingChannel = $state<NotificationChannel | null>(null);

	let showDeleteRuleDialog = $state(false);
	let deletingRule = $state<NotificationRule | null>(null);

	async function loadChannels() {
		channelsLoading = true;
		try {
			const res = await api.get('/notification-channels', {
				projectId: projectsState.currentProjectId ?? undefined
			});
			channels = res.channels || [];
		} catch {
			channels = [];
		} finally {
			channelsLoading = false;
		}
	}

	async function loadRules() {
		rulesLoading = true;
		try {
			const res = await api.get('/notification-rules', {
				projectId: projectsState.currentProjectId ?? undefined
			});
			rules = res.rules || [];
		} catch {
			rules = [];
		} finally {
			rulesLoading = false;
		}
	}

	async function loadHistory() {
		historyLoading = true;
		try {
			const res = await api.post(
				'/notification-history',
				{
					pagination: { page: historyPage, pageSize: historyPageSize },
					search: searchQuery.trim()
				},
				{ projectId: projectsState.currentProjectId ?? undefined }
			);
			history = res.data || [];
			historyTotal = res.pagination?.total || 0;
			historyTotalPages = res.pagination?.totalPages || 0;
		} catch {
			history = [];
		} finally {
			historyLoading = false;
		}
	}

	function handleHistorySearch() {
		historyPage = 1;
		loadHistory();
	}

	function openDeleteChannel(channel: NotificationChannel) {
		deletingChannel = channel;
		showDeleteChannelDialog = true;
	}

	async function deleteChannel() {
		if (!deletingChannel) return;
		try {
			await api.delete(`/notification-channels/${deletingChannel.id}`, {
				projectId: projectsState.currentProjectId ?? undefined
			});
			toast.success('Successfully deleted the Channel', { position: 'top-center' });
			showDeleteChannelDialog = false;
			deletingChannel = null;
			loadChannels();
			loadRules();
		} catch {
			toast.error('Failed to delete channel', { position: 'top-center' });
		}
	}

	async function testChannel(id: number) {
		try {
			await api.post(
				`/notification-channels/${id}/test`,
				{},
				{
					projectId: projectsState.currentProjectId ?? undefined
				}
			);
			toast.success('Test notification sent', { position: 'top-center' });
		} catch (e: any) {
			toast.error(e.message || 'Test failed', { position: 'top-center' });
		}
	}

	function openDeleteRule(rule: NotificationRule) {
		deletingRule = rule;
		showDeleteRuleDialog = true;
	}

	async function deleteRule() {
		if (!deletingRule) return;
		try {
			await api.delete(`/notification-rules/${deletingRule.id}`, {
				projectId: projectsState.currentProjectId ?? undefined
			});
			toast.success('Successfully deleted the Rule', { position: 'top-center' });
			showDeleteRuleDialog = false;
			deletingRule = null;
			loadRules();
		} catch {
			toast.error('Failed to delete rule', { position: 'top-center' });
		}
	}

	async function toggleRule(id: number) {
		try {
			await api.post(
				`/notification-rules/${id}/toggle`,
				{},
				{
					projectId: projectsState.currentProjectId ?? undefined
				}
			);
			loadRules();
		} catch {
			toast.error('Failed to toggle rule', { position: 'top-center' });
		}
	}

	function openSnooze(id: number) {
		snoozeRuleId = id;
		snoozeDialogOpen = true;
	}

	function openEditChannel(channel: NotificationChannel) {
		editingChannel = channel;
		channelDialogOpen = true;
	}

	function openNewChannel() {
		editingChannel = null;
		channelDialogOpen = true;
	}

	function openEditRule(rule: NotificationRule) {
		editingRule = rule;
		ruleDialogOpen = true;
	}

	function openNewRule() {
		editingRule = null;
		ruleDialogOpen = true;
	}

	function formatDate(dateStr: string) {
		const date = new Date(dateStr);
		const now = new Date();
		const diff = now.getTime() - date.getTime();
		const minutes = Math.floor(diff / 60000);
		if (minutes < 1) return 'just now';
		if (minutes < 60) return `${minutes}m ago`;
		const hours = Math.floor(minutes / 60);
		if (hours < 24) return `${hours}h ago`;
		const days = Math.floor(hours / 24);
		return `${days}d ago`;
	}

	function isSnoozed(rule: NotificationRule) {
		return rule.snoozedUntil && new Date(rule.snoozedUntil) > new Date();
	}

	function handleHistoryPageChange(newPage: number) {
		historyPage = newPage;
		loadHistory();
	}

	function handleHistoryPageSizeChange(newSize: number) {
		historyPageSize = newSize;
		historyPage = 1;
		loadHistory();
	}

	onMount(() => {
		loadChannels();
		loadRules();
		loadHistory();
	});
</script>

<div class="space-y-2">
	<div>
		<h1 class="text-2xl font-semibold tracking-tight">Alerts</h1>
	</div>

	<div class="flex items-center justify-between">
		<Tabs.Root value={activeTab} onValueChange={(v) => { if (v) setTab(v); }}>
			<Tabs.List>
				<Tabs.Trigger value="channels">Channels</Tabs.Trigger>
				<Tabs.Trigger value="rules">Rules</Tabs.Trigger>
				<Tabs.Trigger value="history">History</Tabs.Trigger>
			</Tabs.List>
		</Tabs.Root>
		{#if activeTab === 'channels'}
			<Button size="sm" onclick={openNewChannel}>
				<Plus class="mr-1 h-4 w-4" /> New Channel
			</Button>
		{:else if activeTab === 'rules'}
			<Button size="sm" onclick={openNewRule}>
				<Plus class="mr-1 h-4 w-4" /> New Rule
			</Button>
		{/if}
	</div>

	<Alert.Root class="bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-950/50 dark:border-blue-800 dark:text-blue-200">
		<Info class="text-blue-600 dark:text-blue-400" />
		<Alert.Description class="text-blue-800 dark:text-blue-300">{tabDescriptions[activeTab]}</Alert.Description>
	</Alert.Root>

	{#if activeTab === 'channels'}
		{#if channelsLoading}
			<div class="flex justify-center py-12"><LoadingCircle size="xlg" /></div>
		{:else if channels.length === 0}
			<div
				class="flex flex-col items-center justify-center rounded-md bg-muted py-20 text-center text-muted-foreground"
			>
				<p class="mb-4">No channels yet. Create one to get started.</p>
				<Button onclick={openNewChannel}>
					<Plus class="mr-1 h-4 w-4" />
					Create your first Channel
				</Button>
			</div>
		{:else}
			<div class="overflow-hidden rounded-md border">
				<Table.Root>
					<Table.Header>
						<Table.Row>
							<Table.Head>Name</Table.Head>
							<Table.Head>Type</Table.Head>
							<Table.Head>Enabled</Table.Head>
							<Table.Head>Created</Table.Head>
							<Table.Head class="text-right">Actions</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#each channels as channel}
							<Table.Row>
								<Table.Cell class="font-medium">{channel.name}</Table.Cell>
								<Table.Cell>
									<Badge variant="outline"
										>{channelTypeLabels[channel.channelType] ||
											channel.channelType}</Badge
									>
								</Table.Cell>
								<Table.Cell>
									{#if channel.enabled}
										<Badge variant="default" class="bg-green-600">On</Badge>
									{:else}
										<Badge variant="secondary">Off</Badge>
									{/if}
								</Table.Cell>
								<Table.Cell class="text-muted-foreground"
									>{formatDate(channel.createdAt)}</Table.Cell
								>
								<Table.Cell class="text-right">
									<div class="flex justify-end gap-1">
										<Button
											variant="ghost"
											size="icon"
											onclick={() => testChannel(channel.id)}
											title="Test"
										>
											<Send class="h-4 w-4" />
										</Button>
										<Button
											variant="ghost"
											size="icon"
											onclick={() => openEditChannel(channel)}
											title="Edit"
										>
											<Pencil class="h-4 w-4" />
										</Button>
										<Button
											variant="ghost"
											size="icon"
											onclick={() => openDeleteChannel(channel)}
											title="Delete"
										>
											<Trash2 class="h-4 w-4" />
										</Button>
									</div>
								</Table.Cell>
							</Table.Row>
						{/each}
					</Table.Body>
				</Table.Root>
			</div>
		{/if}
	{:else if activeTab === 'rules'}
		{#if rulesLoading}
			<div class="flex justify-center py-12"><LoadingCircle size="xlg" /></div>
		{:else if rules.length === 0}
			<div
				class="flex flex-col items-center justify-center rounded-md bg-muted py-20 text-center text-muted-foreground"
			>
				<p class="mb-4">No rules yet. Create one to get started.</p>
				<Button onclick={openNewRule}>
					<Plus class="mr-1 h-4 w-4" />
					Create your first Rule
				</Button>
			</div>
		{:else}
			<div class="overflow-hidden rounded-md border">
				<Table.Root>
					<Table.Header>
						<Table.Row>
							<Table.Head>Name</Table.Head>
							<Table.Head>Type</Table.Head>
							<Table.Head>Channel</Table.Head>
							<Table.Head>Status</Table.Head>
							<Table.Head class="text-right">Actions</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#each rules as rule}
							<Table.Row>
								<Table.Cell class="font-medium">{rule.name}</Table.Cell>
								<Table.Cell
									>{ruleTypeLabels[rule.ruleType] || rule.ruleType}</Table.Cell
								>
								<Table.Cell>
									<Badge variant="outline">{rule.channelName}</Badge>
								</Table.Cell>
								<Table.Cell>
									{#if isSnoozed(rule)}
										<Badge variant="secondary">Snoozed</Badge>
									{:else if rule.enabled}
										<Badge variant="default" class="bg-green-600">On</Badge>
									{:else}
										<Badge variant="secondary">Off</Badge>
									{/if}
								</Table.Cell>
								<Table.Cell class="text-right">
									<div class="flex justify-end gap-1">
										<Button
											variant="ghost"
											size="icon"
											onclick={() => openSnooze(rule.id)}
											title="Snooze"
										>
											<Clock class="h-4 w-4" />
										</Button>
										<Button
											variant="ghost"
											size="icon"
											onclick={() => toggleRule(rule.id)}
											title={rule.enabled ? 'Disable' : 'Enable'}
										>
											{#if rule.enabled}
												<ZapOff class="h-4 w-4" />
											{:else}
												<Zap class="h-4 w-4" />
											{/if}
										</Button>
										<Button
											variant="ghost"
											size="icon"
											onclick={() => openEditRule(rule)}
											title="Edit"
										>
											<Pencil class="h-4 w-4" />
										</Button>
										<Button
											variant="ghost"
											size="icon"
											onclick={() => openDeleteRule(rule)}
											title="Delete"
										>
											<Trash2 class="h-4 w-4" />
										</Button>
									</div>
								</Table.Cell>
							</Table.Row>
						{/each}
					</Table.Body>
				</Table.Root>
			</div>
		{/if}
	{:else if activeTab === 'history'}
		<div class="pt-2">
			<SearchBar
				placeholder="Search Historic Alerts..."
				bind:value={searchQuery}
				onSearch={handleHistorySearch}
				disabled={historyLoading}
			/>
		</div>

		<div class="overflow-hidden rounded-md border">
			<Table.Root>
				{#if historyLoading}
					<Table.Body>
						<Table.Row>
							<Table.Cell colspan={6} class="h-48">
								<div class="flex h-full items-center justify-center">
									<LoadingCircle size="xlg" />
								</div>
							</Table.Cell>
						</Table.Row>
					</Table.Body>
				{:else if history.length === 0}
					<Table.Body>
						<TableEmptyState colspan={6} message="No Historic Alerts found." />
					</Table.Body>
				{:else}
					<Table.Header>
						<Table.Row>
							<Table.Head>Severity</Table.Head>
							<Table.Head>Rule</Table.Head>
							<Table.Head>Subject</Table.Head>
							<Table.Head>Channel</Table.Head>
							<Table.Head>Status</Table.Head>
							<Table.Head>Sent At</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#each history as item}
							<Table.Row>
								<Table.Cell>
									{#if item.severity === 'critical'}
										<Badge variant="destructive">Critical</Badge>
									{:else if item.severity === 'warning'}
										<Badge class="bg-amber-500 text-white">Warning</Badge>
									{:else}
										<Badge variant="secondary">Info</Badge>
									{/if}
								</Table.Cell>
								<Table.Cell class="font-medium">{item.ruleName}</Table.Cell>
								<Table.Cell class="max-w-xs truncate">{item.subject}</Table.Cell>
								<Table.Cell>{item.channelName}</Table.Cell>
								<Table.Cell>
									{#if item.status === 'sent'}
										<Badge class="bg-green-600 text-white">Sent</Badge>
									{:else if item.status === 'failed'}
										<Badge variant="destructive">Failed</Badge>
									{:else}
										<Badge variant="secondary">Skipped</Badge>
									{/if}
								</Table.Cell>
								<Table.Cell class="text-muted-foreground"
									>{formatDate(item.createdAt)}</Table.Cell
								>
							</Table.Row>
						{/each}
					</Table.Body>
				{/if}
			</Table.Root>
		</div>

		<PaginationFooter
			currentPage={historyPage}
			totalPages={historyTotalPages}
			pageSize={historyPageSize}
			totalItems={historyTotal}
			onPageChange={handleHistoryPageChange}
			onPageSizeChange={handleHistoryPageSizeChange}
			itemLabel="notification"
		/>
	{/if}
</div>

<ChannelDialog
	bind:open={channelDialogOpen}
	channel={editingChannel}
	onSaved={() => {
		loadChannels();
		channelDialogOpen = false;
	}}
/>

<RuleDialog
	bind:open={ruleDialogOpen}
	rule={editingRule}
	{channels}
	onSaved={() => {
		loadRules();
		ruleDialogOpen = false;
	}}
/>

<SnoozeDialog
	bind:open={snoozeDialogOpen}
	ruleId={snoozeRuleId}
	onSaved={() => {
		loadRules();
		snoozeDialogOpen = false;
	}}
/>

<AlertDialog.Root bind:open={showDeleteChannelDialog}>
	<AlertDialog.Content interactOutsideBehavior="close">
		<AlertDialog.Header>
			<AlertDialog.Title>Delete Channel</AlertDialog.Title>
			<AlertDialog.Description>
				Are you sure you want to delete "{deletingChannel?.name}"? This action cannot be undone.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<Button variant="outline" onclick={() => (showDeleteChannelDialog = false)}>Cancel</Button>
			<Button variant="destructive" onclick={deleteChannel}>Delete</Button>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>

<AlertDialog.Root bind:open={showDeleteRuleDialog}>
	<AlertDialog.Content interactOutsideBehavior="close">
		<AlertDialog.Header>
			<AlertDialog.Title>Delete Rule</AlertDialog.Title>
			<AlertDialog.Description>
				Are you sure you want to delete "{deletingRule?.name}"? This action cannot be undone.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<Button variant="outline" onclick={() => (showDeleteRuleDialog = false)}>Cancel</Button>
			<Button variant="destructive" onclick={deleteRule}>Delete</Button>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
