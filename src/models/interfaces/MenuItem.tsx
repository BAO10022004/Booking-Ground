class MenuItem {
  title: string;
  icon: any;
  color: string;
  badge?: string;
  action: () => void;

  constructor({
    title,
    icon,
    color,
    badge,
    action
  }: {
    title: string;
    icon: any;
    color: string;
    badge?: string;
    action: () => void;
  }) {
    this.title = title;
    this.icon = icon;
    this.color = color;
    this.badge = badge;
    this.action = action;
  }
}
export default MenuItem;