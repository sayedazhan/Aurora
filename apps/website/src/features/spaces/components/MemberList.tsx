import MemberCard from "./MemberCard";

const members = [
  {
    name: "Azhan Hassan",
    role: "Owner",
    status: "Active",
  },
];

export default function MemberList() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">
          Members
        </h2>

        <span className="text-sm text-slate-500">
          1 Member
        </span>
      </div>

      <div className="mt-6 space-y-4">
        {members.map((member) => (
          <MemberCard
            key={member.name}
            {...member}
          />
        ))}
      </div>
    </section>
  );
}