
## General Notes

- I wasn't quite sure if I was supposed to leave my PRs open. Obviously in a real, collaborative environment I wouldn't just merge things without approval from the team. But I wanted to be able to iterate off of my previous work in subsequent PRs in a linear fashion, so I just merged stuff when I felt ready to move onto the next task. Hopefully looking at the merged PRs tab in github still tells a coherent enough story for you to assess me


## Potential Future Improvements

- Could implement pagination. Seed the DB with hundreds or thousands of advocates and then what happens to this current implementation? Would be wise to limit requests to something like 20 advocates per page. That could look like a traditional paging UI or an infinite scroll, whichever we prefer. But it would keep our DB requests from faltering as the number of records increases