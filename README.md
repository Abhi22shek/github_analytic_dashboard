# 🚀 GitHub Profile Analytics

A comprehensive web application to analyze GitHub profiles, view detailed statistics, and compare multiple profiles side by side.

![React](https://img.shields.io/badge/React-18.2-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-Latest-purple?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-06B6D4?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 🔍 Profile Search & Display
- Search any GitHub username
- View detailed profile information (bio, location, email, social links)
- Display profile statistics (followers, following, repositories)
- Account creation date and last updated info

### 📊 Repository Analytics
- List all repositories with sorting options (stars, forks, updated date, name)
- Language breakdown with pie/bar charts
- Total stars and forks across all repos
- Most starred/forked repositories
- Repository filtering (source, forks, archived)
- Pagination support (9 repos per page)

### 📈 Activity & Stats
- Recent user activity timeline
- Contribution events (commits, PRs, issues)
- Activity pagination (5 events per page)
- Contribution statistics

### 🔄 Profile Comparison
- Compare up to 3 profiles side by side
- Bar chart comparison of metrics
- Radar chart showing profile strength
- Detailed metrics table
- Winner section highlighting top performers

### ⭐ Favorites System
- Save favorite profiles
- Quick access to saved profiles
- Local storage persistence
- Favorites page with grid layout

### 🌙 Dark/Light Theme
- Toggle between light and dark modes
- Persistent theme preference
- Smooth transitions
- Full dark mode support

### 👥 Followers Management
- View all followers with pagination (12 per page)
- Click followers to view their profiles
- Back navigation
- Follower count display

### 📥 Export Functionality
- Export profile data as PDF
- Export profile data as JSON
- Download statistics

### 🔎 Search History
- Recent searches stored locally
- Quick re-search functionality
- Clear history option
- Dropdown display

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router v6** - Navigation
- **Tailwind CSS** - Styling
- **React Icons** - Icon library

### State Management & Data
- **React Context API** - Global state
- **TanStack Query** - Server state management
- **React Hot Toast** - Notifications

### Charts & Visualization
- **Recharts** - Data visualization
- **Framer Motion** - Animations

### API & Services
- **Axios** - HTTP client
- **GitHub REST API v3** - Data source
- **jsPDF** - PDF export

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup Steps

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/github-profile-analytics.git
cd github-profile-analytics
```

2. **Install dependencies**
```bash
npm install
```

3. **Create GitHub Personal Access Token**
   - Go to https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Select scopes: `public_repo`, `read:user`, `user:email`
   - Copy the token

4. **Create `.env` file**
```bash
VITE_GITHUB_TOKEN=your_token_here
```

5. **Start development server**
```bash
npm run dev
```

6. **Open in browser**
```
http://localhost:5173
```

## 🚀 Usage

### Search for a Profile
1. Enter a GitHub username in the search bar
2. Press Enter or click search
3. View the profile page with all analytics

### View Repositories
- Scroll to the repositories section
- Use filters to show source repos, forks, or archived repos
- Sort by stars, forks, updated date, or name
- Navigate through pages using pagination

### View Language Distribution
- See pie chart of language distribution
- Toggle between pie and bar chart views
- Click "Show All Languages" to see complete list
- Hover for detailed percentages

### View Activity
- Scroll to activity timeline
- See recent commits, PRs, and other events
- Navigate through activity pages

### View Followers
- Click the green "Followers" card on profile
- Browse followers with pagination
- Click any follower to view their profile
- Use back button to return

### Compare Profiles
1. Click "Add to Compare" on any profile
2. Add up to 3 profiles
3. Go to Compare page
4. View side-by-side comparison with charts
5. See winner section for each metric

### Save Favorites
- Click star icon on profile card
- View all favorites on Favorites page
- Quick access to frequently viewed profiles

### Export Data
- Click "Export PDF" to download profile report
- Click "Export JSON" to download raw data

### Toggle Theme
- Click moon/sun icon in navbar
- Theme preference is saved

## 📁 Project Structure

```
src/
├── components/
│   ├── common/              # Reusable components
│   ├── profile/             # Profile components
│   ├── repository/          # Repository components
│   ├── charts/              # Chart components
│   ├── activity/            # Activity components
│   ├── analytics/           # Analytics components
│   ├── comparison/          # Comparison components
│   └── layout/              # Layout components
├── pages/                   # Page components
├── services/                # API services
├── hooks/                   # Custom hooks
├── context/                 # Context providers
├── utils/                   # Utility functions
├── styles/                  # CSS files
└── App.jsx                  # Main app component
```

## 🔑 Key Components

### ProfileStats
Displays user statistics with clickable followers card

### LanguageChart
Shows language distribution with pie/bar chart toggle

### RepoList
Lists repositories with filtering, sorting, and pagination

### ComparisonView
Displays comparison charts and metrics

### ActivityTimeline
Shows recent user activity with pagination

### FollowersList
Displays followers with pagination

## 🎯 API Rate Limits

- **Without Token**: 60 requests/hour
- **With Token**: 5,000 requests/hour

The app uses caching to minimize API calls.

## 🌐 Routes

| Route | Description |
|-------|-------------|
| `/` | Home page with search |
| `/profile/:username` | User profile page |
| `/profile/:username/followers` | User followers page |
| `/favorites` | Saved favorites page |
| `/compare` | Profile comparison page |
| `*` | 404 Not Found page |

## 🎨 Customization

### Colors
Edit `src/utils/constant.js` to change chart colors

### Items Per Page
Modify pagination limits in component props:
- Repositories: 9 per page
- Followers: 12 per page
- Activity: 5 per page

### Theme Colors
Update `tailwind.config.js` for custom colors

## 📱 Responsive Design

- **Mobile** (< 768px): Single column layouts
- **Tablet** (768px - 1024px): 2-3 columns
- **Desktop** (> 1024px): Full layouts

## ♿ Accessibility

- Semantic HTML structure
- WCAG AA compliant
- Keyboard navigation support
- Screen reader friendly
- Proper color contrast

## 🌍 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## 📊 Performance

- Lazy loading of components
- Image optimization
- Request caching
- Pagination for large datasets
- Optimized re-renders

## 🔒 Security

- GitHub token stored in environment variables
- No sensitive data in localStorage
- HTTPS recommended for production
- Input validation

## 🐛 Troubleshooting

### Token not working?
- Verify token has correct scopes
- Check token hasn't expired
- Regenerate token if needed

### API rate limit exceeded?
- Wait for rate limit reset
- Use token for higher limits
- Check cache settings

### Charts not showing?
- Ensure user has repositories
- Check browser console for errors
- Verify data is loading

### Dark mode not working?
- Clear browser cache
- Check Tailwind CSS configuration
- Verify theme context is working

## 📚 Documentation

Additional documentation files:
- `PAGINATION_GUIDE.md` - Pagination implementation
- `COMPARISON_GUIDE.md` - Comparison feature guide
- `LANGUAGE_HANDLING.md` - Language distribution handling
- `FOLLOWERS_NAVIGATION.md` - Followers feature guide
- `BACK_BUTTON_GUIDE.md` - Back button implementation

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- GitHub API for providing the data
- React community for amazing tools
- Tailwind CSS for styling
- Recharts for visualizations

## 📞 Support

For issues or questions:
1. Check the documentation files
2. Review the code comments
3. Check browser console for errors
4. Open an issue on GitHub

## 🚀 Future Enhancements

- [ ] Contribution heatmap
- [ ] Repository growth trends
- [ ] Collaboration network
- [ ] Achievement badges
- [ ] User comments and reviews
- [ ] Export as CSV
- [ ] Share comparison links
- [ ] Historical data tracking
- [ ] Advanced filtering
- [ ] Custom metrics

## 📈 Project Stats

- **Components**: 30+
- **Pages**: 5
- **Custom Hooks**: 8
- **API Endpoints**: 10+
- **Features**: 20+

---

**Made with ❤️ using React, Vite, and Tailwind CSS**

**Happy analyzing!** 🎉
