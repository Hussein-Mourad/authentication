export default function Logo() {
  return (
    <div>
        <img
          className="dark:hidden"
          src="/icons/devchallenges.svg"
          alt="logo"
        />
        <img
          className="hidden dark:block"
          src="/icons/devchallenges-light.svg"
          alt="logo"
        />
      </div>
  )
}
