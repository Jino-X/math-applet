# Math Visualizer

An interactive educational platform featuring math concept visualization applets built with Next.js, React, Tailwind CSS, and Framer Motion.

![Math Visualizer Preview](https://via.placeholder.com/800x400?text=Math+Visualizer+Preview)

## Features

### Polygon Interior Angles Applet

This interactive visualization demonstrates how the sum of interior angles in any polygon equals (n-2) × 180°, where n is the number of sides:

- Interactive polygon rendering with adjustable number of sides (3-10)
- Step-by-step animation showing triangulation from a single vertex
- Visual proof of the (n-2) × 180° formula
- Display of individual interior angle measurements
- Progressive triangle addition with angle sum calculation

## Getting Started

First, clone the repository and install dependencies:

```bash
git clone https://github.com/yourusername/math-applet.git
cd math-applet
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

1. Navigate to the home page to see available math applets
2. Click on "Explore Applet" for the Polygon Interior Angles visualization
3. Use the slider to adjust the number of sides of the polygon
4. Click "Show Triangulation" to see how the polygon breaks down into triangles
5. Observe how the formula (n-2) × 180° is visually demonstrated

## Project Structure

```
math-applet/
├── public/             # Static assets
├── src/
│   ├── app/
│   │   ├── page.js     # Home page with applet cards
│   │   ├── layout.js   # Root layout component
│   │   ├── globals.css # Global styles
│   │   └── polygon-angles/
│   │       └── page.js # Polygon angles applet page
│   ├── components/
│   │   └── polygon-visualizer.js  # SVG polygon visualization component
│   └── constants/      # Application constants
└── ...configuration files
```

## Technologies Used

- **Next.js**: React framework for server-rendered applications
- **React**: JavaScript library for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library for React
- **SVG**: For mathematical visualizations

## Future Enhancements

- Additional math visualization applets
- Interactive exercises and quizzes
- User accounts to save progress and preferences
- Downloadable worksheets and resources

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)