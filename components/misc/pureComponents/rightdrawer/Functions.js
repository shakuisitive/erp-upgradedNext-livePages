export function getCurrentDateTime() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}



export function timeAgo(timestamp) {
    const current = new Date();
    const previous = new Date(timestamp);

    const seconds = Math.floor((current - previous) / 1000);
    let interval = Math.floor(seconds / 60);

    if (interval < 60) {
        if (interval > 1) {
            return `${interval} minutes ago`;
        } else if (interval === 1) {
            return '1 minute ago';
        } else {
            return 'Just now';
        }
    } else if (interval < 1440) { // Less than 24 hours (60 minutes * 24 hours)
        interval = Math.floor(interval / 60);
        if (interval > 1) {
            return `${interval} hours ago`;
        } else {
            return '1 hour ago';
        }
    } else {
        interval = Math.floor(interval / 1440); // Convert minutes to days
        if (interval > 1) {
            return `${interval} days ago`;
        } else {
            return '1 day ago';
        }
    }
}