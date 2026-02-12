export default function ProfileSnapshotCard() {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h3 className="text-gray-800 font-semibold tracking-tight mb-4">

        Profile Snapshot
      </h3>

      <div className="space-y-2 text-sm">
        <p><b>Name:</b> Gyaneshwar</p>
        <p><b>Focus:</b> Data Engineering / SQL</p>
        <p><b>Experience:</b> SQL Support</p>
        <p><b>Education:</b> B.Tech CSE</p>
        <p><b>Location:</b> India</p>
      </div>

      <button className="mt-5 w-full bg-blue-600 text-white py-2 rounded-lg">
        Download Resume
      </button>

    </div>
  );
}
