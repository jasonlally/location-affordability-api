Location Affordability API
======================
This project is a prototype of an API to expose data from HUD's database on neighborhood level housing and transportation costs, which is still in development.  This project was initially built during Denver's National Day of Civic Hacking event, Hack4Colorado.  It is a simple API to call data from this new database and return it in a basic JSON format for reuse in other applications.  It is a read-only API and currently only includes data from the Denver region.

You can access the API at http://laiapi-placematters.dotcloud.com/ (the base directory is not currently wired to anything)

You can issue the following:

http://laiapi-placematters.dotcloud.com/blockgroups  - list of all blockgroups currently in the database (only Denver, this is experimental and will evolve to return a set of data based on a regional code or some other level of geography)

http://laiapi-placematters.dotcloud.com/blockgroup/:id - return all the columns for a specific blockgroup ID

http://laiapi-placematters.dotcloud.com/blockgroup/:id/:field - return a single field for a specific blockgroup ID

And that's it for now.  This is envisioned as allowing consumers, planners, policymakers, and researchers to leverage this dataset more easily and produce analyses or applications.

Only available for Denver's data currently.  If you want to try it out, here are a couple of blockgroup IDs from the dataset
- 080010078021
- 080010093044
- 080010096032

For example:
-----------------------
- http://laiapi-placematters.dotcloud.com/blockgroup/080010078021
- http://laiapi-placematters.dotcloud.com/blockgroup/080010078021/per_capita_income
