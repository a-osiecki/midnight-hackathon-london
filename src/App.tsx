
export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <a href="<%= authUrl %>"
        class="px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition">
        Connect with Strava
      </a>
    </div>
  )
}
