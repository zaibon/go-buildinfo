go-buildinfo
============

This is a sibling to https://github.com/daaku/buildinfo. When used along with
that, it makes it easy to embed build information into a Go binary that is
built using GitHub Actions.

First `uses` the action, the pass the `BI_LDFLAGS` env variable as your
`-ldflags` argument to `go build`.

```yaml
- uses: daaku/go-buildinfo@v1.0.2
- name: Build
  run: go build -trimpath -ldflags="$BI_LDFLAGS" ./...
```

Optionally set `release_version` for greater control. By default it will use
the tag if present, or action run number.
