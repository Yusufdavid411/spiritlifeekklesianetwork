export const departments = [
  {
    label: "Drama",
    value: "drama",
    title: "Spiritlife Kingdom Parables",
    badge: "Drama Ministry",
    description:
      "Watch kingdom stories, stage ministrations, drama messages, and visual teachings that reveal Christ through creativity.",
    category: "Kingdom Parable",
    heroImage:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1600&q=80",
  },
  {
    label: "Evangelism",
    value: "evan",
    title: "Evangelism Programs",
    badge: "Evangelism Department",
    description:
      "Follow outreach reports, salvation stories, mission moments, and public ministry updates from the evangelism team.",
    category: "Outreach",
    heroImage:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=80",
  },
  {
    label: "Children",
    value: "child",
    title: "Children Ministry",
    badge: "Children Department",
    description:
      "Explore children ministry programs, teachings, special events, and joyful moments from the next generation.",
    category: "Children Program",
    heroImage:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1600&q=80",
  },
  {
    label: "Media",
    value: "media",
    title: "The Publishers",
    badge: "Media Department",
    description:
      "See media highlights, behind-the-scenes coverage, production updates, and creative stories from The Publishers.",
    category: "Media Feature",
    heroImage:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1600&q=80",
  },
  {
    label: "Prayer",
    value: "prayer",
    title: "Prayer Ministry",
    badge: "Prayer Department",
    description:
      "Connect with prayer watches, intercession moments, testimonies, and spiritual emphasis from the prayer team.",
    category: "Prayer Watch",
    heroImage:
      "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=1600&q=80",
  },
  {
    label: "Protocol",
    value: "protocol",
    title: "Protocol Department",
    badge: "Protocol Team",
    description:
      "View service moments, hospitality excellence, ministry support, and protocol team highlights.",
    category: "Protocol Highlight",
    heroImage:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=80",
  },
  {
    label: "Ushering",
    value: "ushering",
    title: "Ushering & Sanctuary",
    badge: "Ushering Department",
    description:
      "Follow sanctuary service moments, ushering team updates, and programs that help the house stay excellent.",
    category: "Sanctuary Service",
    heroImage:
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1600&q=80",
  },
  {
    label: "Welfare",
    value: "welfare",
    title: "Welfare Department",
    badge: "Welfare Team",
    description:
      "See care outreaches, welfare programs, giving moments, and the practical love of Christ expressed in community.",
    category: "Care Program",
    heroImage:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1600&q=80",
  },
  {
    label: "Zoe Streams",
    value: "zoestreams",
    title: "Zoe Streams",
    badge: "Music Ministry",
    description:
      "Watch worship sessions, music releases, rehearsals, and ministry moments from Zoe Streams.",
    category: "Worship Moment",
    heroImage:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1600&q=80",
  },
];

export const getDepartmentByValue = (value) =>
  departments.find((department) => department.value === value);
