import Image from 'next/image'

export default function BackgroundImage() {
    return (
        <div>
            <Image
          src="/images/navHero/Background.png"
          alt="Hero background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
            </div>
    )
}