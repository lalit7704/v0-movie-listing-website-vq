/** Small visual pieces shared by the voting pages. */

const avatarTones = [
  "bg-rose-500/15 text-rose-200 ring-rose-400/25",
  "bg-amber-500/15 text-amber-200 ring-amber-400/25",
  "bg-emerald-500/15 text-emerald-200 ring-emerald-400/25",
  "bg-sky-500/15 text-sky-200 ring-sky-400/25",
  "bg-violet-500/15 text-violet-200 ring-violet-400/25",
  "bg-fuchsia-500/15 text-fuchsia-200 ring-fuchsia-400/25",
  "bg-teal-500/15 text-teal-200 ring-teal-400/25",
  "bg-orange-500/15 text-orange-200 ring-orange-400/25",
];
const neutralTone = "bg-white/5 text-muted-foreground ring-white/15";

const avatarSizes = {
  sm: "h-7 w-7 text-[11px]",
  md: "h-9 w-9 text-xs",
  lg: "h-11 w-11 text-sm",
};

/** "Naveen Kumar" → "NK", "naveen" → "N". Works on whole characters, so Hindi names stay intact. */
function initials(label: string) {
  const words = label.trim().split(/\s+/).filter(Boolean);
  const letters = words.slice(0, 2).map((word) => Array.from(word)[0] ?? "");
  return letters.join("").toUpperCase() || "?";
}

/** "None of the above" gets a plain grey avatar, like on a real ballot. */
function isNota(label: string) {
  return /^(nota|none of the above)$/i.test(label.trim());
}

export function Avatar({
  label,
  tone,
  size = "md",
}: {
  label: string;
  tone: string;
  size?: keyof typeof avatarSizes;
}) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold ring-1 ring-inset ${avatarSizes[size]} ${tone}`}
    >
      {initials(label)}
    </span>
  );
}

/** Options in one poll get different colours by position. */
export function OptionAvatar({ label, index, size }: { label: string; index: number; size?: keyof typeof avatarSizes }) {
  return <Avatar label={label} tone={isNota(label) ? neutralTone : avatarTones[index % avatarTones.length]} size={size} />;
}

/** A person keeps the same colour everywhere. */
export function PersonAvatar({ name, size }: { name: string; size?: keyof typeof avatarSizes }) {
  let hash = 0;
  for (const char of name) hash = (hash * 31 + char.codePointAt(0)!) >>> 0;
  return <Avatar label={name} tone={avatarTones[hash % avatarTones.length]} size={size} />;
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{children}</p>;
}
