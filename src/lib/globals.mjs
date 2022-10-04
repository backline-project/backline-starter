//  Not sure if ical will end up bundled on the FE, but I really don't want to write my own func for this
//  ToDo: Investigate impact on bundle size if any and find a tiny lib?
import ical from 'ical-generator';
export const previewMode = (import.meta.env ? import.meta.env : process.env).VITE_CONTENT_PREVIEW == 'true';

export const siteName = 'Backline Starter';

export const heroBanner = 'https://picsum.photos/1500/500?grayscale';

// ToDo get this from contentful?
export const navigation = [
  { title: "home", href: "/" },
  { title: "events", href: "/events" },
  { title: "reads", href: "/reads" },
  { title: "links", href: "/links" }
]

export const navigationFooter = [
  { title: "Home", href: "/" },
  { title: "Events", href: "/events" },
  { title: "Reads", href: "/reads" },
  { title: "Links", href: "/links" }
]

export const navigationFooterSecondary = [
  { title: "About & FAQ", href: "/about" },
  { title: "Contact", href: "/contact" }
]

export const formatDay = (dateOrString) => {
  const d = new Date(dateOrString);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[d.getDay()];
}

export const formatMonth = (dateOrString) => {
  const d = new Date(dateOrString);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months[d.getMonth()];
}

export const formatDate = (dateOrString) => {
  const d = new Date(dateOrString);
  return `${formatMonth(d)} '${String(d.getFullYear()).substring(2, 4)}`
}

export const formatDateLong = (dateOrString) => {
  const d = new Date(dateOrString);
  return `${String(d.getDate()).padStart(2,'0')} ${String(formatMonth(d))}`
}

export const groupBy = (items, cb) => {
  const group = items.map((i) => ({ ...i, key: cb(i) }))
    .reduce((acc, i) => {
      const { key, ...item } = i; // Don't leak the key 
      const prevItems = acc[key] ? acc[key]:[];
      return { ...acc, [key]: [...prevItems, item] };
    }, {});

  return Object.entries(group).map(([key, value]) => ({ label: key, items: value }));
}

export const createCalendarLink = (event) => {
  const start = new Date(event.date);
  const end = new Date(start);
  end.setTime(start.getTime() + (60 * 60 * 1000)*2.5); // Default to 2.5 hours

  const cal = ical();
  cal.createEvent({
    start,
    end,
    summary: event.promotedName + (event.performersList ? ' w/ ' + event.performersList.join(', ') : ''),
    url: event.ticketUrl,
    location:event.venue.venueName + (event.venue.address ? ', ' + event.venue.address : '') + (event.venue.suburb ? ', ' + event.venue.suburb : '')
  });
  return `data:text/calendar;charset=utf8,${encodeURIComponent(cal.toString())}`;
}

export const isToday = (date) => {
  const today = new Date();
  return today.toDateString() === date.toDateString()
};

export const isTomorrow = (date) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow.toDateString() === date.toDateString();
};

export const formatDayOfWeek = (date) =>  isToday(date) ? "Today" : isTomorrow(date) ? "Tomorrow" : formatDay(date);