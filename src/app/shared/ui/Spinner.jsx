export default function Spinner() {
  return (
    <div className="flex items-center justify-center h-full p-[2rem] ">
      <div
        className="w-[60px] aspect-square  rounded-full animate-spin"
        style={{
          background: `
          radial-gradient(farthest-side, #16a34a 94%, #0000) top/8px 8px no-repeat,
          conic-gradient(#0000 30%, #16a34a)
        `,
          WebkitMask: `radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0)`,
        }}
      />
    </div>
  );
}
