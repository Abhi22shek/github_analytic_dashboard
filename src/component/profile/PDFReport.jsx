import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer'
import { calculateTotalStars, calculateTotalForks } from '../../utils/dataProcessing'

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: '#0969da',
    paddingBottom: 15,
  },
  avatar: {
    width: 60,
    height: 60,
    marginRight: 15,
    borderRadius: 30,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0969da',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 11,
    color: '#666',
    marginBottom: 3,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 5,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 8,
  },
  column: {
    flex: 1,
  },
  text: {
    fontSize: 10,
    color: '#666',
    marginBottom: 4,
  },
  textlink:{
    fontSize: 10,
    color: '#0969da',
    marginBottom: 4,
    textDecoration: 'underline',
  },
  stat: {
    fontSize: 11,
    color: '#333',
    marginBottom: 5,
  },
  table: {
    marginBottom: 10,
  },
  tableRow: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 5,
    marginBottom: 5,
  },
  tableHeader: {
    fontWeight: 'bold',
    backgroundColor: '#f5f5f5',
    paddingBottom: 8,
  },
  tableCell: {
    flex: 1,
    fontSize: 9,
    color: '#333',
  },
  repoItem: {
    marginBottom: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  repoName: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#0969da',
    marginBottom: 3,
  },
  repoDescription: {
    fontSize: 9,
    color: '#666',
    marginBottom: 3,
  },
  repoStats: {
    fontSize: 9,
    color: '#999',
  },
  languageItem: {
    fontSize: 10,
    color: '#333',
    marginBottom: 4,
  },
  footer: {
    marginTop: 30,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    fontSize: 9,
    color: '#999',
    textAlign: 'center',
  },
  badge: {
    display: 'inline',
    backgroundColor: '#f0f0f0',
    padding: '2px 6px',
    borderRadius: 3,
    fontSize: 8,
    marginRight: 5,
  },
})

export const ProfilePDFDocument = ({ user, repos }) => {
  const totalStars = calculateTotalStars(repos || [])
  const totalForks = calculateTotalForks(repos || [])

  return (
    <Document>
      {/* Page 1: Profile & Stats */}
      <Page size="A4" style={styles.page}>
        {/* Header with Avatar */}
        <View style={styles.header}>
          {user.avatar_url && (
            <Image src={user.avatar_url} style={styles.avatar} />
          )}
          <View style={styles.headerText}>
            <Text style={styles.title}>{user.name || user.login}</Text>
            <Text style={styles.subtitle}>@{user.login}</Text>
            {user.bio && <Text style={styles.subtitle}>{user.bio}</Text>}
            <Text style={styles.subtitle}>
              Member since {new Date(user.created_at).toLocaleDateString()}
            </Text>
          </View>
        </View>

        {/* Profile Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile Information</Text>
          <View style={styles.row}>
            <View style={styles.column}>
              {user.location && <Text style={styles.text}>Location: {user.location}</Text>}
              {user.email && <Text style={styles.textlink}>Email: {user.email}</Text>}
              {user.company && <Text style={styles.text}>Company: {user.company}</Text>}
            </View>
            <View style={styles.column}>
              {user.blog && <Text style={styles.textlink}>Website: {user.blog}</Text>}
              {user.twitter_username && (
                <Text style={styles.textlink}>Twitter: @{user.twitter_username}</Text>
              )}
              <Text style={styles.textlink}>Profile: {user.html_url}</Text>
            </View>
          </View>
        </View>

        {/* Statistics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Statistics</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={styles.tableCell}>Metric</Text>
              <Text style={styles.tableCell}>Value</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Followers</Text>
              <Text style={styles.tableCell}>{user.followers}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Following</Text>
              <Text style={styles.tableCell}>{user.following}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Public Repositories</Text>
              <Text style={styles.tableCell}>{user.public_repos}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Total Stars</Text>
              <Text style={styles.tableCell}>{totalStars}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Total Forks</Text>
              <Text style={styles.tableCell}>{totalForks}</Text>
            </View>
            {repos.length > 0 && (
              <>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>Avg Stars/Repo</Text>
                  <Text style={styles.tableCell}>{(totalStars / repos.length).toFixed(2)}</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>Avg Forks/Repo</Text>
                  <Text style={styles.tableCell}>{(totalForks / repos.length).toFixed(2)}</Text>
                </View>
              </>
            )}
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>GitHub Profile Analytics | Generated on {new Date().toLocaleDateString()}</Text>
        </View>
      </Page>
    </Document>
  )
}
