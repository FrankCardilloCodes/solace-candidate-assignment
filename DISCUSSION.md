
## General Notes

- I wasn't quite sure if I was supposed to leave my PRs open. Obviously in a real, collaborative environment I wouldn't just merge things without approval from the team. But I wanted to be able to iterate off of my previous work in subsequent PRs in a linear fashion, so I just merged stuff when I felt ready to move onto the next task. Hopefully looking at the merged PRs tab in github still tells a coherent enough story for you to assess me


## Potential Future Improvements

- Tests seem like a prudent addition to make

- Could implement pagination. Seed the DB with hundreds or thousands of advocates and then what happens to this current implementation? Would be wise to limit requests to something like 20 advocates per page. That could look like a traditional paging UI or an infinite scroll, whichever we prefer. But it would keep our DB requests from faltering as the number of records increases

- Improve the error handling. Maybe return specific information about the failure from the back end and display it in a useful way to the user on the front end. Obviously right now it is pretty trivial. If we cared about observability we could also add some logging around error states

- Maybe allow users to sort the results by a particular field, say `Last Name` for example

- I would like to reference the column name dynamically in my select statement with search term and search term type rather than setting up a cumbersome switch statement to build my drizzle query. I could not find an obvious answer to this in the docs or elsewhere and didn't want to spend too much time diving into this rabbit hole

- When searching by phone number and by years of experience I defaulted to equality. But it would be preferable to check if the search query is contained in the values for those fields. Perhaps this calls for an update to the schema such that those columns are strings. Perhaps a more clever query could be crafted to type cast on the fly

- I've had some trouble integrating with drizzle. I've never used it before today, so I guess it's to be expected. Still, I would want to iron this out if I had more time