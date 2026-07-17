import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative flex h-[80vh] min-h-[500px] w-full items-center justify-center overflow-hidden bg-gray-900 text-white">
            <video
                autoPlay
                muted
                playsInline
                loop
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none">
                <source src="/vids/ecomm.mp4" type="video/mp4"/>
            </video>

            <div className="absolute inset-0 bg-black/50"/>

            <div className="relative z-10 mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center ">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                    Lorem, ipsum <span className="text-gray-900">dolor.</span>
                </h1>

                <p className="mx-auto mt-6 max-w-2xl text-gray-200 text-lg sm:text-xl">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis nihil, atque amet sapiente ullam fugit.
                </p>

                <div className="mt-10 flex justify-center gap-4">
                    <Link
                        href="/get-started"
                        className="rounded-3xl bg-gray-800 px-6 py-3 text-sm font-semibold shadow-md transition-colors hover:bg-gray-900"
                    >
                        Lorem, ipsum.
                    </Link>
                    <Link
                        href="/docs"
                        className="rounded-3xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold backdrop-blur-sm transition-colors hover:bg-white/20"
                    >
                        Lorem, ipsum dolor.
                    </Link>
                </div>
            </div>
        </section>
    )
}