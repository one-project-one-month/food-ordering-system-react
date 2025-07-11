import DashboardCards from "../../components/DashboardCards"

const Dashboard = () => {
  return (
    <div>
        <div>
            <h2 className="text-3xl font-bold text-gray-700">Dashboard</h2>
            <p className="text-sm pt-1">Hi, John. Welcome back to SarMl dashboard.</p>
        </div>
        <DashboardCards />
    </div>
  )
}

export default Dashboard
