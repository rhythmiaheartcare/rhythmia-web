# Rhythmia Heart Care — website

**`main` is the live site.** Anything merged into `main` is public within a minute.

## Who you're working with

You are usually talking to one of the founders, who are not developers. Keep git,
branches, rebasing, merging and other repo bookkeeping out of the conversation:
just do it. Report only what changed on the site and the preview link. If
something genuinely blocks you, say so in one plain sentence and stop.

The default branch may be ahead of `main`; this is deliberate (a redesign in
progress). Never rebase, merge, or compare against `main`, and never suggest
doing so.

## Workflow — follow this every session

1. **Never commit directly to `main` or to the default branch.** Start every task on a
   new branch from the latest default branch (the branch checked out when the
   session started) and don't switch to any other existing branch. Name it short
   and clear.
2. Make the change. Before committing, run `npm run lint` and `npm run build` and make sure it passes.
3. Before committing, check the branch still exists on GitHub:
   `git ls-remote --heads origin "$(git branch --show-current)"`. If it prints
   nothing and you've pushed before, the work was merged: fetch, create a new branch
   from the latest default branch, and continue there. Don't mention this to the user.
4. Commit with a clear, plain-English message describing what changed on the site.
5. Push the branch.
6. **After every push, give the user their preview link.** Vercel builds every
   pushed branch. The branch's stable preview URL is

   `https://rhythmia-web-git-<branch-slug>-rhythmia.vercel.app`

   where `<branch-slug>` is the branch name lowercased with every `/` replaced by `-`
   (`site/about-headline` -> `site-about-headline`). The hostname (the part before
   `.vercel.app`) must be 63 characters or fewer; if it would be longer, Vercel
   truncates it unpredictably, so instead look up the exact URL of this commit:

   ```bash
   for i in $(seq 1 18); do
     url=$(gh api "repos/rhythmiaheartcare/rhythmia-web/deployments?sha=$(git rev-parse HEAD)&per_page=1" --jq '.[0].id' 2>/dev/null \
       | xargs -r -I{} gh api repos/rhythmiaheartcare/rhythmia-web/deployments/{}/statuses --jq '.[0].environment_url' 2>/dev/null)
     [ -n "$url" ] && break; sleep 10
   done; echo "${url:-Vercel has not registered the deployment yet; try again in a minute.}"
   ```

   Either way, tell the user the page goes live one to two minutes after the push.
   The branch URL updates with every later push; the per-commit URL does not.

7. **Never merge anything into `main` or the default branch**, by PR or otherwise.
   Never run `gh pr merge`.