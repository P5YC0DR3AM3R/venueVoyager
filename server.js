const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

const sequelize = require('./config/connection');
// Create a new sequelize store using the express-session package
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const routes = require('./controllers');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const { User, Post, Stadium, UserStadium } = require('./models'); // Import models to sync them in order

const homeRoutes = require('./controllers/homeRoutes'); // Import Routes
const stadiumsRoutes = require('./controllers/api/stadiumsRoutes');
const userRoutes = require('./controllers/api/userRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Register Handlebars and partials directory
const hbs = exphbs.create({ 
  helpers,
  partialsDir: path.join(__dirname, 'views/partials')
});

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);
app.use('/', homeRoutes); // Use homeRoutes
app.use('/api/stadiums', stadiumsRoutes); // Mount stadiums routes under /api/stadiums
app.use('/api/users', userRoutes);         // Mount user routes under /api/users

// Synchronize the models in the correct order
sequelize.sync({ force: true })
    .then(() => {
        console.log('All models synced successfully.');
        app.listen(PORT, () => console.log(`Now listening on http://localhost:${PORT}`));
    })
    .catch(err => {
        console.error('Error starting server:', err);
    });
