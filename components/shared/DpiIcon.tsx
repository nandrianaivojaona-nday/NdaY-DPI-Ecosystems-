type Props = {
  dpi: { name: string; icon: string; image?: string };
  className?: string;
  emojiClassName?: string;
};

export default function DpiIcon({ dpi, className = "h-12 w-12", emojiClassName = "text-3xl" }: Props) {
  if (dpi.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={encodeURI(dpi.image)}
        alt=""
        loading="lazy"
        decoding="async"
        className={`${className} shrink-0 rounded-lg object-contain`}
      />
    );
  }
  return (
    <span aria-hidden="true" className={emojiClassName}>
      {dpi.icon}
    </span>
  );
}
