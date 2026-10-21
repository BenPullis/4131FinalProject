# Original design (pre-makeover backup)

Snapshot of `templates/` and `resources/` taken before the October 2026 redesign.

To fully revert, run from the project root:

    rm -rf templates resources
    cp -R design-backup/templates design-backup/resources .

`server.js.bak` is server.js at backup time. The only redesign change to server.js was
`res.locals.path = req.path;` in the middleware, which is harmless to leave in.
