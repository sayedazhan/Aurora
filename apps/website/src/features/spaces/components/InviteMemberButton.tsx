type InviteMemberButtonProps = {
  onClick?: () => void;
};

export default function InviteMemberButton({
  onClick,
}: InviteMemberButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
    >
      Invite Member
    </button>
  );
}