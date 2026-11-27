export function parseDate(dateString) {
    const date = new Date(dateString);
    const now = Date.now();

    const diffMs = now - date;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 60) {
        return diffMinutes + ' minutes ago';
    }
    if (diffHours < 24) {
        return diffHours + ' hours ago';
    }
    if (diffMinutes < 365) {
        return diffDays + ' days ago'
    }

    return date.toDateString();
}