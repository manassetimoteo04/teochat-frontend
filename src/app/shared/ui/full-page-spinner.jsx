function FullPageSpinner() {
  return (
    <div className="flex h-screen  items-center justify-center">
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

export default FullPageSpinner;
