

- ### task property : 
```
{
    id: nanoid(),
    title: payload.title,
    progress: "pending", 
    // "pending" ,"inprogress", "completed"
    priority: payload.priority ?? "low", 
    // "low", "medium" , "high"
    createdAt: Date.now(),
    deadline: payload.deadline ?? "No deadline",
    steps: payload.steps ?? [],
    reminder: payload.reminder ?? [], // data with time
    repeat: payload.repeat ?? "",
}
```