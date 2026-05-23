{
  description = "traceway-cli — command-line client for Traceway observability";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    { nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs { inherit system; };
      in
      {
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            go
            gopls
            gotools
            delve
            golangci-lint
            gofumpt
            govulncheck
            gomodifytags
            impl
            gotestsum

            gh
            git
            jq
            just
          ];

          shellHook = ''
            export GOPATH="$PWD/.go"
            export GOCACHE="$PWD/.go/cache"
            export GOBIN="$PWD/.go/bin"
            export PATH="$GOBIN:$PATH"

            echo "traceway-cli dev shell"
            echo "  go         $(go version | cut -d' ' -f3)"
            echo "  golangci-lint $(golangci-lint version --short 2>/dev/null || echo unknown)"
            echo "  dlv        $(dlv version 2>/dev/null | grep Version | awk '{print $2}')"
            echo "  gh         $(gh --version | head -1 | cut -d' ' -f3)"
          '';
        };

        formatter = pkgs.nixfmt;
      }
    );
}
