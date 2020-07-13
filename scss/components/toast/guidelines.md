The toast component appears floating on the screen whose content usually is not directly relevant to the temporary information that is being displayed.  

**Examples:** 

- A toast informing of a new message when the user is not on the messages page.  

- A danger toast about a task failure while a user is browsing some other page.  

- It is important to use the correct flavour of toasts, don’t use warning format for positive information, don’t use success format for a general alert, etc. 

- Don’t use toast for permanent information. Toasts are always dismissible, even if not dismissed, they should be timed to go away, it is recommended to have a log of them somewhere accessible so that the user can recall the data if they accidentally closed or missed it. 