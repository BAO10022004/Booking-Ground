
interface StatItem {
  label: string;
  value: string;
  icon: any;
  color: string;
}

interface StatsProps {
  stats: StatItem[];
}

function Stats({stats}: StatsProps)
{
    return (
      <div className="profile-stats">
          {stats.map((stat, index) => (
            <div key={index} className={`stat-card stat-${stat.color}`}>
              <div className="stat-icon-wrapper">
                {typeof stat.icon === 'string' ? (
                  <span className="stat-emoji">{stat.icon}</span>
                ) : (
                  <stat.icon className="stat-icon" />
                )}
              </div>
              <div className="stat-info">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>  
    )
}
export default Stats;