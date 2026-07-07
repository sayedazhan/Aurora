type WorkspaceHeroProps = {
  firstName?: string | null;
  spaceCount?: number;
};

export default function WorkspaceHero({
  firstName,
  spaceCount = 0,
}: WorkspaceHeroProps) {
  return (
    <section className="rounded-[2rem] bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-8 ring-1 ring-slate-200">
      <p className="text-sm font-medium text-slate-500">
        Aurora Workspace
      </p>

      <h1 className="mt-3 text-4xl font-semibold tracking-tight">
        Good morning{firstName ? `, ${firstName}` : ""} 👋
      </h1>

      <p className="mt-3 text-slate-600">
        Here's what's happening with your finances today.
      </p>

      <div className="mt-8 flex flex-wrap gap-6">

        <div>
          <p className="text-3xl font-semibold">
            {spaceCount}
          </p>
          <p className="text-sm text-slate-500">
            Spaces
          </p>
        </div>

        <div>
          <p className="text-3xl font-semibold">
            1
          </p>
          <p className="text-sm text-slate-500">
            Outstanding
          </p>
        </div>

        <div>
          <p className="text-3xl font-semibold">
            2
          </p>
          <p className="text-sm text-slate-500">
            Updates
          </p>
        </div>

      </div>
    </section>
  );
}