import Image from "next/image";

export default function NdaYLogo({
  size = 42,
}: {
  size?: number;
}) {
  return (
    <Image
      src="/assets/logo/NdaY'Logo.png"
      alt="NdaY' Logo"
      width={size}
      height={size}
      priority
      className="object-contain"
    />
  );
}