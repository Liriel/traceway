<script lang="ts">
    import * as Sheet from "$lib/components/ui/sheet";
    import * as AlertDialog from "$lib/components/ui/alert-dialog";
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { projectsState, type Project, type Framework } from '$lib/state/projects.svelte';
    import { Check, Trash2, Copy, CircleAlert } from 'lucide-svelte';
    import FrameworkCombobox from './framework-combobox.svelte';
    import { toast } from 'svelte-sonner';
    import { goto } from '$app/navigation';

    interface Props {
        open: boolean;
        onOpenChange: (open: boolean) => void;
        project: Project | null;
    }

    let { open, onOpenChange, project }: Props = $props();

    let projectName = $state('');
    let selectedFramework = $state<Framework>('gin');
    let loading = $state(false);
    let error = $state('');
    let showDeleteConfirm = $state(false);
    let deleting = $state(false);
    let deleteConfirmName = $state('');
    let nameCopied = $state(false);

    $effect(() => {
        if (open && project) {
            projectName = project.name;
            selectedFramework = project.framework;
            error = '';
        }
    });

    $effect(() => {
        if (!showDeleteConfirm) {
            deleteConfirmName = '';
            nameCopied = false;
        }
    });

    async function copyProjectName() {
        if (!project) return;
        await navigator.clipboard.writeText(project.name);
        nameCopied = true;
        setTimeout(() => nameCopied = false, 2000);
    }

    let deleteConfirmMatches = $derived(
        !!project && deleteConfirmName === project.name
    );

    async function handleSubmit(e: Event) {
        e.preventDefault();
        if (!projectName.trim()) {
            error = 'Project name is required';
            return;
        }
        if (!project) return;

        loading = true;
        error = '';

        try {
            await projectsState.updateProject(project.id, projectName.trim(), selectedFramework);
            toast.success('Successfully updated the project', { position: 'top-center' });
            onOpenChange(false);
        } catch (err: any) {
            error = err instanceof Error ? err.message : 'Failed to update project';
        } finally {
            loading = false;
        }
    }

    async function handleDelete() {
        if (!project || !deleteConfirmMatches) return;

        deleting = true;
        try {
            await projectsState.deleteProject(project.id, project.name);
            toast.success('Successfully deleted the project', { position: 'top-center' });
            showDeleteConfirm = false;
            onOpenChange(false);
            goto('/');
        } catch (err: any) {
            toast.error(err instanceof Error ? err.message : 'Failed to delete project', { position: 'top-center' });
        } finally {
            deleting = false;
        }
    }

    function handleClose() {
        error = '';
        showDeleteConfirm = false;
        onOpenChange(false);
    }
</script>

<Sheet.Root {open} onOpenChange={handleClose}>
    <Sheet.Content side="right" class="w-[400px] sm:w-[540px]">
        <Sheet.Header>
            <Sheet.Title>Edit Project</Sheet.Title>
            <Sheet.Description>
                Update your project name or framework.
            </Sheet.Description>
        </Sheet.Header>

        <form onsubmit={handleSubmit} class="px-6 py-6 space-y-5">
            <div class="space-y-2">
                <Label for="edit-project-name">Project Name</Label>
                <Input
                    id="edit-project-name"
                    type="text"
                    placeholder="My Application"
                    bind:value={projectName}
                    disabled={loading}
                />
                <p class="text-xs text-muted-foreground">
                    A unique name for your project (letters, numbers, spaces, hyphens)
                </p>
            </div>

            <div class="space-y-2">
                <Label for="edit-framework">Framework</Label>
                <FrameworkCombobox bind:value={selectedFramework} disabled={loading} />
                <p class="text-xs text-muted-foreground">
                    Select your framework for tailored integration code
                </p>
            </div>

            {#if error}
                <div class="rounded-md bg-destructive/10 border border-destructive/20 p-3">
                    <p class="text-sm text-destructive">{error}</p>
                </div>
            {/if}

            <div class="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onclick={handleClose} disabled={loading}>
                    Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                    {#if loading}
                        Updating...
                    {:else}
                        <Check class="mr-2 h-4 w-4" />
                        Update Project
                    {/if}
                </Button>
            </div>
        </form>

        <div class="px-6 pb-6">
            <div class="border-t pt-6">
                <p class="text-sm text-muted-foreground mb-3">Danger zone</p>
                <Button
                    type="button"
                    variant="destructiveOutline"
                    onclick={() => showDeleteConfirm = true}
                >
                    <Trash2 class="mr-2 h-4 w-4" />
                    Delete Project
                </Button>
            </div>
        </div>
    </Sheet.Content>
</Sheet.Root>

<AlertDialog.Root bind:open={showDeleteConfirm}>
    <AlertDialog.Content interactOutsideBehavior="close">
        <AlertDialog.Header>
            <AlertDialog.Title>Delete Project</AlertDialog.Title>
            <AlertDialog.Description>
                This project will be permanently deleted along with all of its data, including transactions, exceptions, logs, metrics, and dashboards.
            </AlertDialog.Description>
        </AlertDialog.Header>

        <div class="rounded-md bg-destructive/10 border border-destructive/30 px-3 py-2">
            <p class="text-sm">
                <span class="font-semibold text-destructive">Warning:</span>
                <span class="text-destructive/90">This action is not reversible. Please be certain.</span>
            </p>
        </div>

        <div class="space-y-2">
            <Label for="delete-confirm-name" class="text-sm font-normal text-muted-foreground leading-relaxed">
                Enter the project name <span class="font-semibold text-foreground">{project?.name}</span><button
                    type="button"
                    onclick={copyProjectName}
                    class="inline-flex items-center align-middle ml-1 rounded p-0.5 text-muted-foreground hover:bg-accent hover:text-foreground"
                    title="Copy project name"
                    aria-label="Copy project name"
                >
                    {#if nameCopied}
                        <Check class="h-3.5 w-3.5" />
                    {:else}
                        <Copy class="h-3.5 w-3.5" />
                    {/if}
                </button> to continue:
            </Label>
            <Input
                id="delete-confirm-name"
                type="text"
                autocomplete="off"
                bind:value={deleteConfirmName}
                disabled={deleting}
            />
            {#if deleteConfirmName.length > 0 && !deleteConfirmMatches}
                <p class="text-xs text-destructive flex items-center gap-1">
                    <CircleAlert class="h-3.5 w-3.5" />
                    The project name does not match
                </p>
            {/if}
        </div>

        <AlertDialog.Footer class="sm:justify-between">
            <Button variant="outline" onclick={() => showDeleteConfirm = false} disabled={deleting}>
                Cancel
            </Button>
            <Button variant="destructive" onclick={handleDelete} disabled={deleting || !deleteConfirmMatches}>
                {deleting ? 'Deleting...' : 'Delete Project'}
            </Button>
        </AlertDialog.Footer>
    </AlertDialog.Content>
</AlertDialog.Root>
