# Neatly

### Main Features. 
This project is a cooking recipe app. Its main feature is that it takes a link for a recipe website, searches the site and parses the ingredient list, and builds a shopping list for you. 

A user is able to enter in several links at once or one link at a time, and have the application retreive the ingredients from the site. 

Then the app builds a single shopping list from all of the ingredients, grouped together according to ingredient type, in order to optimize shopping time at the store. 

The ingredient list should easily be exportable via copy and paste into the desired notes app of the user, or you can select to text or email the list to yourself or someone else. 

The app requires signing up with a phone number or email. 

### Future features
Other features to be added in future releases:

#### Cooking Assistant
An AI voice assistant that will have a cooking session with you. The AI can read you the instructions, answer cooking questions, provide tips, etc.

The main utility is to allow the user to cook without having to wash their hands to read the recipe.

The Voice assitant can be connected to smart home devices such as Alexa or google nest. 

#### Recipe Clean view
Extract the recipe steps into a clean interface.

Users can save recipes with links to their account. 

Provide a link back the the original recipe. 

### Technical Stack
The app will be a PWA built in next.js. The app will be built with supabase backend. The app will use Vercel edge functions.