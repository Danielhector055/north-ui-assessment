# North Test Assessment

A modern web application built with SvelteKit, featuring real-time data visualization and secure API integration.

## 🎨 Design

The application design can be viewed in Figma:
[View Figma Design](https://www.figma.com/design/QJrC89qBw9jQ04C1Zz7oRk/North-UI-assessment?node-id=1-16032&t=ONepl6wMVUXwf1PB-0)

## 🚀 Features

- Real-time data visualization using Chart.js and D3.js
- Responsive and modern UI with Tailwind CSS
- Secure API key management
- Type-safe development with TypeScript
- Comprehensive test coverage
- Automated code formatting and linting

## 🛠️ Tech Stack

- SvelteKit
- TypeScript
- Tailwind CSS
- Chart.js
- D3.js
- Vitest for testing
- ESLint & Prettier for code quality

## 📦 Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- Git

## 🔧 Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/north-test-assessment.git
cd north-test-assessment
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

4. Add your API credentials to the `.env` file:

```env
VITE_API_KEY=your_api_key_here
VITE_API_URL=your_api_url_here
```

## 🔐 API Key Security

The application implements several security measures for API key management:

1. Environment Variables: API keys are stored in `.env` files (not committed to version control)
2. Client-side Security: API keys are only exposed to the client when necessary
3. Server-side Validation: All API requests are validated before processing

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
# or
yarn build
yarn preview
```

## 🧪 Testing

Run the test suite:

```bash
npm run test
# or
yarn test
```

For development with watch mode:

```bash
npm run test:unit
# or
yarn test:unit
```

## 📝 Code Quality

The project uses ESLint and Prettier for code quality:

```bash
# Format code
npm run format
# or
yarn format

# Lint code
npm run lint
# or
yarn lint
```

## 📦 Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

