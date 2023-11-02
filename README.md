# FlavorDash

## Overview

FlavorDash: Where Food Meets Convenience! Connect with nearby restaurants effortlessly, track your orders in real-time, and enjoy hassle-free menu management for restaurant owners.
With a focus on quality, convenience, and variety, FlavorDash is the ultimate destination for food lovers and local eateries, delivering delicious flavors right to your doorstep.
As a restaurant owner, streamline incoming orders and enhance your business on our user-friendly DASHboard.


## Data Model

The application will store Users, Restaurants and Food. Users can be create orders. A logged in user can also be the owner of a restaurant.
A restaurant can have a list of Food which will be used to create a menu. This can be managed by the owner of a restaurant.

* A user can be a costumer making an order or the owner of a restaurant which will grant them the privellege of managing their restaurant.
* A restaurant can have only one owner
* A restaurant can have a list of Food items


An Example User:

```javascript
{
  username: "betterthandoordash",
  hash: // a password hash,
  owner: //boolean, set true for restaurant owners
  restaurant: //if owner true, will reference Restaurant 
}
```

An Example Restaurant with Embedded Food Items:

```javascript
{
  name: "Halal Cart 202",
  food: [
    { name: "Chicken Over Rice", price: "9.99", ingredients: ["chicken","rice","salad"], description:"Best halal chicken over rice in the city"},
  ],
}
```


## [Link to Commented First Draft Schema](db.mjs) 


## Wireframes

(__TODO__: wireframes for all of the pages on your site; they can be as simple as photos of drawings or you can use a tool like Balsamiq, Omnigraffle, etc.)

/list/create - page for creating a new shopping list

![list create](documentation/list-create.png)

/list - page for showing all shopping lists

![list](documentation/list.png)

/list/slug - page for showing specific shopping list

![list](documentation/list-slug.png)

## Site map

(__TODO__: draw out a site map that shows how pages are related to each other)

Here's a [complex example from wikipedia](https://upload.wikimedia.org/wikipedia/commons/2/20/Sitemap_google.jpg), but you can create one without the screenshots, drop shadows, etc. ... just names of pages and where they flow to.

## User Stories or Use Cases

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can browse through all the available restaurants
4. as a user, I can place an order
5. as an owner, I can manage my restaurant
6. as an owner, I can add/remove food

## Research Topics
Research topics are currently very tentative and most of these will probably change by the next milestone
* (4-6 points) React 
    * I'm going to research further on React to use it as a front-end library
    * Unsure about how much I would research further into it so the points are tentative between 4-6
*  (3 points) Configuration management
    *dotenv
*  (2 points) CSS Preprocessor
    * Sass
*  (2 points) Front-end Libraries
    * Will include many small utilitiy libraries:
        * Google Maps
        * Bootstrap
        * (maybe) P5js for animation
=


## [Link to Initial Main Project File](app.mjs) 


(unchaged for now, will add references and resources as I use them for my project)
## Annotations / References Used

(__TODO__: list any tutorials/references/etc. that you've based your code off of)

1. [passport.js authentication docs](http://passportjs.org/docs) - (add link to source code that was based on this)
2. [tutorial on vue.js](https://vuejs.org/v2/guide/) - (add link to source code that was based on this)

