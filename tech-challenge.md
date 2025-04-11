# Tech challenge

Please use the TVmaze API to fetch TV show data.
TVmaze is an open API. URL: http://api.tvmaze.com/search/shows?q=banana

## Client (React/Angular/Vue):

The client needs to support the following features:

1. **Search Field** - Allows the user to search by typing part of the movie name or the complete movie name. (You can use an input field with a search button.)
2. **Results** - Displays all the movies returned by the API in the format: name: (genres separated by commas).
3. Implement infinite scroll functionality with 10 records per page, fetching new data whenever the client scrolls to the end of the list.
4. A loader should appear whenever data is being fetched.

Focus more on logic and less on UI (CSS).

## Backend (NodeJS):

1. All requests should be made only to the backend API.
2. The backend will expose an API to fetch data from the TVmaze API. Implement the pagination API yourself in the backend service.
3. Feel free to add anything that can contribute.

## Bonus:

You can implement the search input without a button, fetching data automatically when the client finishes typing.
Please use best practices for implementation.
