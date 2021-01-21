Depending upon the estimated time to complete the process, we should use different ways to indicate progress. 

- less than 1 second: Use a simple animation to pass the time, use skeleton screens to load, no need to show a progress indicator. 

- 1 to 5 seconds: It is okay to use a progress indicator without any other information, determinate if possible, or else indeterminate. 

- 5 to 10 seconds: Use a determinate progress indicator with progress percentage (20%) or value (2 of 5 items). If not possible, show an indeterminate indicator with a general estimate (“please wait up to ten seconds for X to happen”) 

- More than 10 seconds: Try to break up the process into smaller stages. Provide extra content (more information about the process, tips or trivia) to pass time. Definitely provide an estimated time. Try to allow the user to perform other tasks while progress happens. 

##### Types of Progress Bars:

**Determinate progress indicators:** They show the ratio or percentage of progress of a process, the amount and rate of completion gives the user an estimate of how much is done and how soon it might finish. Always use determinate progress indicators wherever the amount of progress is known. 

**Indeterminate progress indicators:** They only show a repeating animation that can engage the user for a short time (1-5 seconds) by itself. 

**Linear progress indicators:** Linear indicators are generally used to show loading of content inside cards and modals by applying on top of them. They can also be stacked to show progress of multiple parallel processes, like multiple files being uploaded. 

 
**Circular progress indicators:** Circular indicators come in 3 sizes:  

- Inline or small ones are to be used inside buttons, tags, text, etc.  

- Component or medium ones can be used to show loading of small to medium content areas. 

- Page or large ones are used to show the loading of a full page area. 

**Note:** Avoid filling the page with too many loading indicators, use skeleton states or loading states for that. 