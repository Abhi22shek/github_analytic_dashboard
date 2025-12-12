import jsPDF from 'jspdf';

export const exportService = {
  exportAsJSON: (data, filename = 'profile-data.json') => {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  },

  exportAsCSV: (data, filename = 'profile-data.csv') => {
    if (!Array.isArray(data) || data.length === 0) return;

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row =>
        headers.map(header => {
          const value = row[header];
          return typeof value === 'string' && value.includes(',')
            ? `"${value}"`
            : value;
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  },

  exportAsPDF: (user, repos, filename = 'profile-report.pdf') => {
    const doc = new jsPDF();
    let yPosition = 20;

    // Title
    doc.setFontSize(20);
    doc.text(`GitHub Profile: ${user.name || user.login}`, 20, yPosition);
    yPosition += 15;

    // User Info
    doc.setFontSize(12);
    doc.text(`Username: @${user.login}`, 20, yPosition);
    yPosition += 7;
    doc.text(`Followers: ${user.followers}`, 20, yPosition);
    yPosition += 7;
    doc.text(`Following: ${user.following}`, 20, yPosition);
    yPosition += 7;
    doc.text(`Public Repos: ${user.public_repos}`, 20, yPosition);
    yPosition += 15;

    // Repositories
    doc.setFontSize(14);
    doc.text('Top Repositories', 20, yPosition);
    yPosition += 10;

    doc.setFontSize(10);
    repos.slice(0, 10).forEach((repo, index) => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
      doc.text(`${index + 1}. ${repo.name}`, 20, yPosition);
      yPosition += 5;
      doc.text(`   Stars: ${repo.stargazers_count} | Forks: ${repo.forks_count}`, 20, yPosition);
      yPosition += 7;
    });

    doc.save(filename);
  }
};
