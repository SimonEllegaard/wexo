# WEXO Movie Explorer

A responsive movie discovery application built with Angular 12 and The Movie Database (TMDB) API.

The application allows users to explore movies, browse movies by genre, view detailed information about individual movies, watch trailers, and manage a personal wishlist.

## Features

The application implements all required features from the WEXO code challenge, including the optional features.

### Movie discovery
- Browse movies organised into genre-based sections.
- Horizontally scroll through movie collections.
- Navigate to dedicated pages displaying movies from a selected genre.
- Clickable genre tags that take users directly to the corresponding genre page.

### Movie details
Each movie has a dedicated details page displaying:
- Title and release year.
- Movie description.
- Cover poster and cinematic backdrop.
- Associated genres.
- Cast, including the 10 actors listed first by TMDB.
- Directors, producers and executive producers.
- Embedded YouTube trailer, when available.

### Wishlist
- Add and remove movies from a personal wishlist.
- Wishlist persists using browser storage.
- Confirmation before removing a movie from the wishlist page.
- Movies can be added back directly from their details page without an additional confirmation step.

### Responsive design
The application is designed to work on desktop, tablet and mobile devices, with layouts adapting to different screen sizes.

## Technology stack

- **Angular 12** – Frontend framework.
- **TypeScript** – Application logic.
- **HTML and CSS** – Structure and styling.
- **TMDB API** – Movie information, genres, cast, crew and trailers.
- **Browser localStorage** – Wishlist persistence.

## Getting started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm (included with Node.js)
- Angular CLI 12

The project was developed using Node.js 14.18.1 and Angular CLI 12.2.18.

If you do not already have Angular CLI 12 installed, you can install it with:

```bash
npm install -g @angular/cli@12
```

### 1. Clone the repository

```bash
git clone https://github.com/SimonEllegaard/wexo
cd wexo
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure TMDB authentication

The application uses a TMDB API Read Access Token to retrieve movie information.

You need to obtain your own token from [TMDB](https://www.themoviedb.org/settings/api).

The actual token is deliberately excluded from the repository. Instead, the environment files contain a placeholder.

Update both of the following files:

- `src/environments/environment.ts`
- `src/environments/environment.prod.ts`

Replace the placeholder with your own TMDB Read Access Token.

For example:

```typescript
export const environment = {
  production: false,
  tmdb: {
    accessToken: 'YOUR_TMDB_READ_ACCESS_TOKEN'
  }
};
```

Make sure to configure the production environment file as well.

**Note about API authentication:** This project intentionally does not include a backend proxy for TMDB requests. The challenge focuses on frontend functionality and does not require a backend. Since the application only uses publicly accessible movie information, I chose to communicate directly with TMDB from Angular rather than introduce an additional backend layer.

The token is not committed to the repository. However, because this is a frontend-only application, the token will be accessible to users through the browser and the compiled application. It should therefore not be considered a secret.

### 4. Run the application

Start the Angular development server:

```bash
ng serve
```

Once the compilation is complete, open:

[http://localhost:4200](http://localhost:4200)

## Additional implementation decisions

A few implementation choices are worth mentioning:

- **Cast limitation:** Only the first 10 actors returned by TMDB are displayed to keep the movie details page manageable.
- **Crew information:** In addition to directors, producers and executive producers are displayed.
- **Genre navigation:** Genre tags are interactive and provide direct navigation to genre-specific movie listings.
- **Wishlist confirmation:** Removing a movie from the wishlist page requires confirmation. Removing it from the movie details page does not, as it can easily be added again using the same button.
- **No backend:** The application communicates directly with TMDB and uses browser storage for wishlist persistence.
