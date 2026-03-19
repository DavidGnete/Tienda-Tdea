import { DotLottieReact } from '@lottiefiles/dotlottie-react';



export default function EmptyPage() {

  return (
    <div className="text-center py-16 px-4 flex flex-col items-center gap-6 bg-linear-to-b bg-purple-500 to-black">
        <DotLottieReact
        src="https://lottie.host/6f44fc2d-9900-4251-bb75-94b8630dc53b/vnqVULrqnZ.lottie"
        loop
        autoplay
        style={{ height: "220px", width: "220px" }}
      />
      <p className="mb-4 text-white">Aún no tienes productos publicados</p>
    </div>
  )
}