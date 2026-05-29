package main

import (
	"fmt"

	"github.com/spf13/cobra"

	"github.com/tracewayapp/traceway/cli/internal/config"
	"github.com/tracewayapp/traceway/cli/internal/exitcode"
	"github.com/tracewayapp/traceway/cli/internal/output"
	"github.com/tracewayapp/traceway/cli/internal/state"
)

func newLogoutCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "logout",
		Short: "Remove a profile's stored credentials",
		RunE:  runLogout,
	}
}

func runLogout(cmd *cobra.Command, _ []string) error {
	cfg, err := config.Load()
	if err != nil {
		return err
	}
	st, err := state.Load()
	if err != nil {
		return err
	}

	name := resolveProfileName(st)

	_, inCfg := cfg.Profiles[name]
	_, inState := st.Profiles[name]
	if !inCfg && !inState {
		mode := output.ResolveMode(flagOutput, output.StdoutIsTerminal())
		_ = output.RenderError(cmd.ErrOrStderr(), mode, output.ErrorEnvelope{
			Code:     "no_profile",
			Message:  fmt.Sprintf("profile %q does not exist", name),
			ExitCode: exitcode.Auth,
		})
		return newCLIError(exitcode.Auth, "no_profile")
	}

	delete(cfg.Profiles, name)
	delete(st.Profiles, name)

	if st.CurrentProfile == name {
		// Pick any remaining profile as the new current; otherwise blank.
		st.CurrentProfile = ""
		for k := range cfg.Profiles {
			st.CurrentProfile = k
			break
		}
		// If nothing left in cfg, try state profiles.
		if st.CurrentProfile == "" {
			for k := range st.Profiles {
				st.CurrentProfile = k
				break
			}
		}
	}

	if err := cfg.Save(); err != nil {
		return err
	}
	if err := st.Save(); err != nil {
		return err
	}
	_, _ = fmt.Fprintf(cmd.OutOrStdout(), "Logged out of profile %q\n", name)
	return nil
}
