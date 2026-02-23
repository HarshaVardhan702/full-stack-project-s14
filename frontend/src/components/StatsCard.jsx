const StatsCard = ({ icon, value, label, color = 'blue' }) => (
    <div className={`stats-card ${color} fade-up`}>
        <div className={`stats-icon ${color}`}>{icon}</div>
        <div>
            <div className="stats-value">{value}</div>
            <div className="stats-label">{label}</div>
        </div>
    </div>
);

export default StatsCard;
